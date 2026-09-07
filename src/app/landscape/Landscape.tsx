"use client"

import '@/app/landscape.css'

import React, { useMemo, useState } from "react";
const VB_W = 1440;
const VB_H = 900;

// deterministic PRNG so SSR and client build the same scene
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
let rng: () => number = Math.random; // reseeded before each scene build

const rand = (min: number, max: number) => min + rng() * (max - min);
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));
const FLOWER_COLORS = ["#ff6f6f", "#ffab5e", "#ffe15a", "#7fdc86", "#6cc4f2", "#9a8cf0", "#f18ad0"];
const RAINBOW = ["#ff7a7a", "#ffb46b", "#ffe374", "#8fe07a", "#6fc9f0", "#8f9ff2", "#c58cf0"];
const round = (n: number) => Math.round(n * 1000) / 1000;
function bladePath(x:number, baseY:number, height :number, bend :number, width :number) {
  const halfW = width / 2, tipX = x + bend, tipY = baseY - height, midY = baseY - height * 0.5;
  return `M ${x - halfW} ${baseY} Q ${x - halfW * 0.4 + bend * 0.3} ${midY} ${tipX} ${tipY} Q ${x + halfW * 0.4 + bend * 0.3} ${midY} ${x + halfW} ${baseY} Z`;
}
function buildRidge(count :number, baseY :number, minH :number, maxH :number) {
  const pts = [];
  for (let i = 0; i <= count; i++) {
    const x = (VB_W / count) * i + (i > 0 && i < count ? rand(-46, 46) : 0);
    pts.push([x, baseY - rand(minH, maxH)]);
  }
  const ridge = pts.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ");
  const fill = `M 0 ${baseY} ` + pts.map((p) => `L ${p[0]} ${p[1]}`).join(" ") + ` L ${VB_W} ${baseY} Z`;
  return { ridge, fill };
}

const Pine = ({ x, baseY, h, w, fill, lit } : {x:number, baseY: number, h: number, w: number, fill :string, lit: string}) => {
  const tierH = h / 3, trunkW = w * 0.13;
  return (
    <g>
      <rect x={x - trunkW / 2} y={baseY - tierH * 0.28} width={trunkW} height={tierH * 0.4} fill="#4a3220" />
      {[0, 1, 2].map((i) => {
        const ty = baseY - tierH * 0.28 - i * (tierH * 0.6), tw = w * (1 - i * 0.22);
        return (
          <g key={i}>
            <polygon points={`${x},${ty - tierH} ${x - tw / 2},${ty} ${x + tw / 2},${ty}`} fill={fill} />
            {lit && <polygon points={`${x},${ty - tierH} ${x - tw / 2},${ty} ${x},${ty}`} fill={lit} opacity="0.6" />}
          </g>
        );
      })}
    </g>
  );
};

const Flower = (f :any) => {
  const petals = [0, 1, 2, 3, 4].map((k) => {
    const a = (k * 72 * Math.PI) / 180;
    return (
      <circle
        key={k}
        cx={round(Math.cos(a) * f.petalR)}
        cy={round(Math.sin(a) * f.petalR)}
        r={round(f.petalR * 0.62)}
        fill={f.color}
      />
    );
  });
  return (
    <g key={f.id} transform={`translate(${f.x} ${f.baseY})`}>
      <g className="flower-enter" style={{ animationDelay: `${f.popDelay}s` }}>
        <g className="flower-bob" style={{ animationDuration: `${f.bobDur}s`, animationDelay: `${f.bobDelay}s` }}>
          <rect x="-1.6" y={-f.stemH} width="3.2" height={f.stemH} rx="1.6" fill="#3f9a4e" />
          <ellipse cx="6" cy={-f.stemH * 0.55} rx="7" ry="3.2" fill="#43a552" transform={`rotate(28 6 ${-f.stemH * 0.55})`} />
          <g transform={`translate(0 ${-f.stemH})`}>
            {petals}
            <circle r={f.petalR * 0.5} fill="#ffe36b" />
          </g>
        </g>
      </g>
    </g>
  );
};

export default function Landscape() {
  const scene = useMemo(() => {
    rng = mulberry32(0x9e3779b9);
    const pine = (x: number, baseY: number, h :number, w :number, fill :string, lit :string) => ({ kind: "pine", x, baseY, h, w, fill, lit });
    const framingTrees : any[] = [];
    [0, 1, 2].forEach(() => framingTrees.push(pine(rand(40, 180), 840, rand(240, 320), rand(90, 120), "#1f4a30", "#2f6f46")));
    [0, 1, 2].forEach(() => framingTrees.push(pine(rand(1280, 1420), 840, rand(230, 310), rand(85, 115), "#1f4a30", "#2f6f46")));
    const farTrees = [];
    for (let x = 30; x < VB_W + 20; x += rand(15, 26)) farTrees.push(pine(x, 560 + rand(-3, 4), rand(22, 38), rand(15, 24), "#39805a", "#54a06f"));
    for (let x = 45; x < VB_W + 20; x += rand(20, 34)) farTrees.push(pine(x, 570 + rand(-3, 6), rand(28, 48), rand(20, 30), "#3e8a5a", "#5aa877"));

    const tufts = [];
    let gx = -30;
    while (gx < VB_W + 30) {
      const baseY = rand(808, 828), blades = [], n = randInt(6, 13);
      for (let i = 0; i < n; i++) blades.push({ id: i, dx: rand(-26, 26), height: rand(46, 120), bend: rand(-16, 16), width: rand(3.5, 7), shade: rand(0, 1) });
      tufts.push({ id: `t-${gx.toFixed(1)}`, x: gx, baseY, blades, swayDur: rand(5.5, 9.5), swayDelay: rand(-6, 0), swayAmp: rand(1.6, 3.4) });
      gx += rand(46, 74);
    }

    const flowers = [];
    let fx = 16;
    while (fx < VB_W - 8) {
      flowers.push({
        id: `f-${fx.toFixed(1)}`, x: fx + rand(-12, 12), baseY: rand(806, 830),
        stemH: rand(52, 104), petalR: rand(11, 17), color: FLOWER_COLORS[randInt(0, FLOWER_COLORS.length - 1)],
        popDelay: rand(0, 2.2), bobDur: rand(3, 5), bobDelay: rand(-4, 0),
      });
      fx += rand(30, 54);
    }

    const clouds = Array.from({ length: 4 }, (_, i) => ({ id: i, y: rand(70, 230), scale: rand(0.7, 1.5), opacity: rand(0.85, 1), dur: rand(90, 160), delay: rand(-120, 0) }));
    const birds = Array.from({ length: 7 }, (_, i) => ({ id: i, x: rand(880, 1260), y: rand(150, 300), scale: rand(0.5, 1), dur: rand(6, 10), delay: rand(-8, 0) }));
    const motes = Array.from({ length: 22 }, (_, i) => ({ id: i, x: rand(0, VB_W), y: rand(560, 880), r: rand(1.2, 3), dur: rand(9, 18), delay: rand(-18, 0), drift: rand(-30, 30), opacity: rand(0.3, 0.7) }));
    const flyers = [
      { id: "b1", kind: "butterfly", x: 300, y: 760, scale: 1, color: "#ff8a5e", dur: 14, delay: -2 },
      { id: "b2", kind: "butterfly", x: 1120, y: 790, scale: 0.85, color: "#ff6f9c", dur: 17, delay: -6 },
      { id: "b3", kind: "butterfly", x: 640, y: 720, scale: 0.9, color: "#ffd93d", dur: 15, delay: -9 },
      { id: "b4", kind: "butterfly", x: 900, y: 780, scale: 0.8, color: "#8f6bff", dur: 13, delay: -3 },
      { id: "d1", kind: "dragonfly", x: 470, y: 700, scale: 1, color: "#4dd4ff", dur: 12, delay: -4 },
    ];

    const BEAM = { cx: 560, topY: 588, botY: 806, hwTop: 90, hwBot: 152 };
    const bT = (y :number) => (y - BEAM.topY) / (BEAM.botY - BEAM.topY);
    const bHalf = (y :number) => BEAM.hwTop + (BEAM.hwBot - BEAM.hwTop) * bT(y);
    const bWave = (y :number) => Math.sin(bT(y) * Math.PI * 3) * (5 + bT(y) * 12);
    const bCenter = (y :number) => BEAM.cx + bWave(y);
    const bLp = [], bRp = [];
    for (let i = 0; i <= 9; i++) { const y = BEAM.topY + (BEAM.botY - BEAM.topY) * (i / 9); bLp.push([bCenter(y) - bHalf(y), y]); bRp.push([bCenter(y) + bHalf(y), y]); }
    const reflectionPath = `M ${bLp[0][0]} ${bLp[0][1]} ` + bLp.slice(1).map((p) => `L ${p[0]} ${p[1]}`).join(" ") + " " + [...bRp].reverse().map((p) => `L ${p[0]} ${p[1]}`).join(" ") + " Z";
    const ripples = [];
    for (let li = 0; li < 9; li++) {
      const y = 600 + li * 22 + rand(-5, 5), hw = bHalf(y), c = bCenter(y), depthOp = Math.max(0.2, 0.92 - bT(y) * 0.66), dashes = [];
      let dx = c - hw;
      while (dx < c + hw) { const w = rand(9, 26), dist = Math.min(1, Math.abs(dx + w / 2 - c) / hw), edge = Math.max(0, 1 - Math.pow(dist, 1.6)); dashes.push({ x: dx, w, op: depthOp * (0.3 + 0.7 * edge) }); dx += w + rand(8, 22); }
      ripples.push({ id: li, y, dashes, dur: rand(4, 8), delay: rand(-6, 0) });
    }
    const fish = { x: 880, y: 726 };
    const mtnFar = buildRidge(9, 488, 44, 112), mtnNear = buildRidge(8, 512, 32, 84);
    const sun = { x: 560, y: 250, r: 62 };
    const spokes = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
    const rainbow = RAINBOW.map((color, i) => { const r = 560 - i * 12, dx = Math.sqrt(Math.max(0, r * r - 137 * 137)); return { color, path: `M ${720 - dx} 560 A ${r} ${r} 0 0 1 ${720 + dx} 560` }; });
    return { framingTrees, farTrees, tufts, flowers, clouds, birds, motes, flyers, reflectionPath, ripples, fish, mtnFar, mtnNear, sun, spokes, rainbow };
  }, []);

  return (
    <svg className="land-svg" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMax slice" style={{position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', 
    // zIndex: '-1000', 
    // opacity: 0
    }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3d9be0" /><stop offset="55%" stopColor="#7cc6ee" /><stop offset="100%" stopColor="#cbecfb" /></linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fffdf0" /><stop offset="18%" stopColor="#fff2b0" stopOpacity=".95" /><stop offset="46%" stopColor="#ffe680" stopOpacity=".5" /><stop offset="100%" stopColor="#ffe680" stopOpacity="0" /></radialGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#cfeefe" /><stop offset="14%" stopColor="#9fd6f2" /><stop offset="46%" stopColor="#6fb8e4" /><stop offset="100%" stopColor="#3f8fc8" /></linearGradient>
        <linearGradient id="reflection" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff7d8" stopOpacity=".9" /><stop offset="100%" stopColor="#fff2b0" stopOpacity="0" /></linearGradient>
        <linearGradient id="mtnFar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b3d2ea" /><stop offset="100%" stopColor="#96bfdf" /></linearGradient>
        <linearGradient id="mtnNear" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#94c1dd" /><stop offset="100%" stopColor="#77aacb" /></linearGradient>
        <linearGradient id="hillA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#88d67f" /><stop offset="100%" stopColor="#5cb85f" /></linearGradient>
        <linearGradient id="hillB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#62c26a" /><stop offset="100%" stopColor="#43a556" /></linearGradient>
        <linearGradient id="bank" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4f9152" /><stop offset="55%" stopColor="#2a5c33" /><stop offset="100%" stopColor="#14331d" /></linearGradient>
        <linearGradient id="blade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#48ab57" /><stop offset="100%" stopColor="#1e6630" /></linearGradient>
        <clipPath id="waterClip"><rect x="0" y="586" width={VB_W} height={VB_H - 586} /></clipPath>
      </defs>

      <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#sky)" />
      <g className="rainbow">{scene.rainbow.map((b, i) => <path key={i} d={b.path} fill="none" stroke={b.color} strokeWidth="11" strokeLinecap="round" />)}</g>

      <g transform={`translate(${scene.sun.x} ${scene.sun.y})`}>
        <g className="sunburst">{scene.spokes.map((a, i) => <polygon key={i} points="0,-96 -13,-150 13,-150" fill="#fff0a8" opacity="0.28" transform={`rotate(${a})`} />)}</g>
      </g>
      <g className="sun-glow"><circle cx={scene.sun.x} cy={scene.sun.y} r="215" fill="url(#sunGlow)" /><circle cx={scene.sun.x} cy={scene.sun.y} r={scene.sun.r} fill="#fffdf2" /></g>

      {scene.clouds.map((c) => (
        <g key={`c-${c.id}`} className="cloud" opacity={c.opacity} style={{ animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}>
          <g transform={`translate(0 ${c.y}) scale(${c.scale})`}>
            <ellipse cx="60" cy="20" rx="80" ry="22" fill="#ffffff" /><ellipse cx="130" cy="14" rx="60" ry="26" fill="#ffffff" /><ellipse cx="0" cy="24" rx="56" ry="18" fill="#eef8ff" />
          </g>
        </g>
      ))}
      {scene.birds.map((b) => (
        <path key={`b-${b.id}`} className="bird" style={{ animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
          d={`M ${b.x} ${b.y} q ${7 * b.scale} ${-6 * b.scale} ${14 * b.scale} 0 q ${7 * b.scale} ${-6 * b.scale} ${14 * b.scale} 0`}
          fill="none" stroke="#3a4a58" strokeWidth={2} strokeLinecap="round" opacity="0.55" />
      ))}

      <path d={scene.mtnFar.fill} fill="url(#mtnFar)" opacity="0.95" />
      <path d={scene.mtnFar.ridge} fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.5" />
      <path d={scene.mtnNear.fill} fill="url(#mtnNear)" />
      <path d={scene.mtnNear.ridge} fill="none" stroke="#f4ffff" strokeWidth="2.5" opacity="0.5" />

      <path fill="url(#hillA)" d="M0 512 C 300 452, 560 512, 820 494 C 1080 476, 1260 520, 1440 498 L1440 620 L0 620 Z" />
      <path fill="none" stroke="#eaffd0" strokeWidth="2.5" opacity="0.5" d="M0 512 C 300 452, 560 512, 820 494 C 1080 476, 1260 520, 1440 498" />
      <path fill="url(#hillB)" d="M0 566 C 320 518, 600 572, 900 556 C 1160 542, 1300 574, 1440 560 L1440 640 L0 640 Z" />

      {scene.farTrees.map((t, i) => <Pine key={`ft-${i}`} {...t} />)}

      <g clipPath="url(#waterClip)">
        <rect x="0" y="586" width={VB_W} height={VB_H - 586} fill="url(#water)" />
        <path d={scene.reflectionPath} fill="url(#reflection)" opacity="0.85" />
        {scene.ripples.map((r) => (
          <g key={`r-${r.id}`} className="ripple" style={{ animationDuration: `${r.dur}s`, animationDelay: `${r.delay}s` }}>
            {r.dashes.map((d, di) => <rect key={di} x={d.x} y={r.y} width={d.w} height="2.4" rx="1.2" fill="#ffffff" opacity={d.op} />)}
          </g>
        ))}
        <g transform={`translate(${scene.fish.x} ${scene.fish.y})`}>
          <g className="fish-ripple"><ellipse cx="0" cy="6" rx="20" ry="6" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.5" /></g>
          <g className="fish"><path d="M0 0 Q 10 -8 22 0 Q 10 8 0 0 Z" fill="#d9e6ee" /><polygon points="22,0 30,-6 30,6" fill="#d9e6ee" /></g>
        </g>
      </g>

      <path d="M0 800 C 240 786, 470 808, 720 794 C 970 780, 1200 806, 1440 788 L1440 900 L0 900 Z" fill="url(#bank)" />
<path d="M0 800 C 240 786, 470 808, 720 794 C 970 780, 1200 806, 1440 788" fill="none" stroke="#eaffd0" strokeWidth="2.5" opacity="0.35" />

      {scene.motes.map((m) => (
        <circle key={`m-${m.id}`} className="mote" style={{ animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s`, }} cx={m.x} cy={m.y} r={m.r} fill="#ffffff" opacity={m.opacity} />
      ))}
      {scene.flyers.map((f) => (
        <g key={f.id} className="flyer" style={{ animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}>
          <g transform={`translate(${f.x} ${f.y}) scale(${f.scale})`}>
            {f.kind === "butterfly" ? (
              <>
                <g className="wing wing-l" style={{ animationDuration: "0.4s" }}><ellipse cx="-6" cy="0" rx="7" ry="10" fill={f.color} opacity="0.95" /></g>
                <g className="wing wing-r" style={{ animationDuration: "0.4s" }}><ellipse cx="6" cy="0" rx="7" ry="10" fill={f.color} opacity="0.95" /></g>
                <rect x="-0.8" y="-8" width="1.6" height="16" rx="0.8" fill="#3a2b1a" />
              </>
            ) : (
              <>
                <g className="wing wing-l" style={{ animationDuration: "0.18s" }}><ellipse cx="-9" cy="-2" rx="11" ry="4" fill={f.color} opacity="0.6" /></g>
                <g className="wing wing-r" style={{ animationDuration: "0.18s" }}><ellipse cx="9" cy="-2" rx="11" ry="4" fill={f.color} opacity="0.6" /></g>
                <rect x="-1" y="-6" width="2" height="20" rx="1" fill="#2f7b82" />
              </>
            )}
          </g>
        </g>
      ))}

      {scene.tufts.map((tuft) => (
        <g key={tuft.id} className="tuft" style={{ animationDuration: `${tuft.swayDur}s`, animationDelay: `${tuft.swayDelay}s` }}>
          {tuft.blades.map((blade) => <path key={`${tuft.id}-${blade.id}`} d={bladePath(tuft.x + blade.dx, tuft.baseY, blade.height, blade.bend, blade.width)} fill="url(#blade)" opacity={0.82 + blade.shade * 0.18} />)}
        </g>
      ))}
      {scene.flowers.map((f) => Flower(f))}
      {scene.framingTrees.map((t, i) => <Pine key={`fr-${i}`} {...t} />)}
    </svg>
  );
}
