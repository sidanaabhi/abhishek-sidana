import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── GLSL Shaders ──────────────────────────────────────────────

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uReducedMotion;

  varying vec2 vUv;

  //  ── Simplex 3D noise (Ashima Arts / Stefan Gustavson) ──
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // ── FBM (fractal Brownian motion) ──
  float fbm(vec3 p) {
    float value = 0.0;
    float amp   = 0.5;
    float freq  = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amp * snoise(p * freq);
      freq  *= 2.0;
      amp   *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float speed = mix(uTime * 0.15, uTime * 0.02, uReducedMotion);

    // Mouse influence — subtle warp
    vec2 mouse = (uMouse - 0.5) * vec2(aspect, 1.0);
    float mouseDist = length(p - mouse);
    float mouseInfluence = smoothstep(0.8, 0.0, mouseDist) * 0.15;
    p += (mouse - p) * mouseInfluence;

    // Layered noise
    float n1 = fbm(vec3(p * 1.8, speed));
    float n2 = fbm(vec3(p * 2.5 + 3.0, speed * 0.8));
    float n3 = snoise(vec3(p * 3.0 + n1 * 0.5, speed * 0.6));

    // Warped coordinates
    vec2 warp = p + vec2(n1, n2) * 0.4;
    float n4 = fbm(vec3(warp * 2.0, speed * 0.5));

    // Color palette — deep blues, purples, black
    vec3 col1 = vec3(0.02, 0.03, 0.08);  // near black
    vec3 col2 = vec3(0.05, 0.04, 0.15);  // deep purple
    vec3 col3 = vec3(0.02, 0.08, 0.18);  // deep blue
    vec3 col4 = vec3(0.00, 0.12, 0.22);  // dark cyan tint (matches primary)

    float t = n4 * 0.5 + 0.5;
    vec3 color = mix(col1, col2, smoothstep(0.0, 0.35, t));
    color = mix(color, col3, smoothstep(0.3, 0.6, t));
    color = mix(color, col4, smoothstep(0.55, 0.85, t));

    // Soft glow near center + mouse
    float glow = exp(-length(p) * 1.8) * 0.12;
    float mouseGlow = exp(-mouseDist * 3.0) * mouseInfluence * 0.6;
    color += vec3(0.04, 0.12, 0.18) * (glow + mouseGlow);

    // Subtle vignette
    float vig = 1.0 - smoothstep(0.4, 1.4, length(p));
    color *= mix(0.7, 1.0, vig);

    // Film grain
    float grain = (fract(sin(dot(uv * uTime * 0.01, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.03;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ── Shader Mesh ───────────────────────────────────────────────

function ShaderPlane({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uReducedMotion: { value: reducedMotion ? 1.0 : 0.0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useEffect(() => {
    uniforms.uReducedMotion.value = reducedMotion ? 1.0 : 0.0;
  }, [reducedMotion, uniforms]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetMouse.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouse.current.set(
          e.touches[0].clientX / window.innerWidth,
          1.0 - e.touches[0].clientY / window.innerHeight
        );
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value += delta;

    // Smooth mouse lerp
    mouseRef.current.lerp(targetMouse.current, 0.05);
    mat.uniforms.uMouse.value.copy(mouseRef.current);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Main component ────────────────────────────────────────────

export default function BackgroundAnimation() {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    >
      <Canvas
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#0e1322"));
        }}
      >
        <ShaderPlane reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
