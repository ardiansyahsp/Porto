import React, { useEffect, useRef } from 'react';

export const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const inkShapeRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const penRef = useRef<HTMLDivElement>(null);
  
  const milestones = [
    { at: 0.10, year: '2024 — Sekarang', role: 'Mahasiswa <b>Informatika</b>, Universitas Muhammadiyah Semarang', left: '28%' },
    { at: 0.32, year: '2026', role: 'Magang, <b>Dinas Arsip dan Perpustakaan Kota Semarang</b>', left: '50%' },
    { at: 0.75, year: '2026 — Sekarang', role: 'Freelance <b>Web Developer</b>', left: '40%' }
  ];

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!timelineRef.current || !pathRef.current || !maskPathRef.current || !inkShapeRef.current || !dotRef.current || !penRef.current) return;

    const timeline = timelineRef.current;
    const path = pathRef.current;
    const maskPath = maskPathRef.current;
    const inkShape = inkShapeRef.current;
    const dot = dotRef.current;
    const pen = penRef.current;

    const len = path.getTotalLength();
    const milestonesAt = milestones.map(m => m.at);

    maskPath.style.strokeDasharray = len.toString();

    function buildInkShape() {
      const step = 4;
      const n = Math.max(80, Math.floor(len / step));
      const eps = Math.max(len * 0.0008, 0.6);
      const baseW = 7.5, minW = 1.2, bumpMul = 1.6, sigma = 55;
      const taperLen = Math.min(len * 0.02, 45);
      const curveSample = Math.max(len * 0.004, 3);

      function widthAt(s: number, t: number) {
        const noise = 0.5 * Math.sin(t * 37.1 + 1.7) + 0.3 * Math.sin(t * 91.7 + 4.2) + 0.2 * Math.sin(t * 13.3 + 0.5);
        let w = baseW * (0.6 + 0.5 * noise);
        milestonesAt.forEach(at => {
          const dd = (t - at) * len;
          w += baseW * bumpMul * Math.exp(-(dd * dd) / (2 * sigma * sigma));
        });
        if (s < taperLen) w *= s / taperLen;
        if (s > len - taperLen) w *= (len - s) / taperLen;
        return w;
      }

      function curvatureRadiusAt(s: number) {
        const s0 = Math.max(0, s - curveSample);
        const s2 = Math.min(len, s + curveSample);
        const A = path.getPointAtLength(s0);
        const B = path.getPointAtLength(s);
        const C = path.getPointAtLength(s2);
        const ab = Math.hypot(B.x - A.x, B.y - A.y);
        const bc = Math.hypot(C.x - B.x, C.y - B.y);
        const ca = Math.hypot(A.x - C.x, A.y - C.y);
        const cross = Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y));
        if (cross < 1e-6 || ab * bc * ca < 1e-6) return Infinity;
        return (ab * bc * ca) / (2 * cross);
      }

      function smoothCommands(points: number[][]) {
        const m = points.length;
        const get = (i: number) => points[Math.max(0, Math.min(m - 1, i))];
        let s = '';
        for (let i = 0; i < m - 1; i++) {
          const q0 = get(i - 1), q1 = get(i), q2 = get(i + 1), q3 = get(i + 2);
          const c1x = q1[0] + (q2[0] - q0[0]) / 6, c1y = q1[1] + (q2[1] - q0[1]) / 6;
          const c2x = q2[0] - (q3[0] - q1[0]) / 6, c2y = q2[1] - (q3[1] - q1[1]) / 6;
          s += ` C ${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${q2[0].toFixed(2)},${q2[1].toFixed(2)}`;
        }
        return s;
      }

      const fwd: number[][] = [], bwd: number[][] = [];
      for (let i = 0; i <= n; i++) {
        const s = (i / n) * len;
        const t = s / len;
        const p0 = path.getPointAtLength(Math.max(0, s - eps));
        const p1 = path.getPointAtLength(Math.min(len, s + eps));
        let dx = p1.x - p0.x, dy = p1.y - p0.y;
        const mag = Math.hypot(dx, dy) || 1;
        dx /= mag; dy /= mag;
        const nx = -dy, ny = dx;
        const p = path.getPointAtLength(s);

        let w = widthAt(s, t);
        const radius = curvatureRadiusAt(s);
        const maxHalf = radius * 0.82;
        if (w / 2 > maxHalf) w = Math.max(minW, maxHalf * 2);

        const jf = Math.sin(t * 260 + 1.3) * 0.5 + Math.sin(t * 470 + 2.7) * 0.25;
        const jb = Math.sin(t * 245 + 4.1) * 0.5 + Math.sin(t * 505 + 0.6) * 0.25;
        fwd.push([p.x + nx * (w / 2 + jf), p.y + ny * (w / 2 + jf)]);
        bwd.push([p.x - nx * (w / 2 + jb), p.y - ny * (w / 2 + jb)]);
      }

      let d = `M ${fwd[0][0].toFixed(2)},${fwd[0][1].toFixed(2)}`;
      d += smoothCommands(fwd);
      d += ` L ${bwd[bwd.length - 1][0].toFixed(2)},${bwd[bwd.length - 1][1].toFixed(2)}`;
      d += smoothCommands(bwd.slice().reverse());
      d += ' Z';
      inkShape.setAttribute('d', d);
    }
    
    buildInkShape();

    const viewBoxWidth = 900;
    const viewBoxHeight = 1900;

    function toPercent(pt: DOMPoint | SVGPoint) {
      return { xPct: (pt.x / viewBoxWidth) * 100, yPct: (pt.y / viewBoxHeight) * 100 };
    }

    const msData = milestones.map((m, idx) => {
      const at = m.at;
      const pt = path.getPointAtLength(len * at);
      const { xPct, yPct } = toPercent(pt);

      const marker = markerRefs.current[idx];
      const el = itemRefs.current[idx];
      
      if (marker && el) {
        marker.style.left = xPct + '%';
        marker.style.top = yPct + '%';
        el.style.top = yPct + '%';
      }

      return { at, marker, el, xPct, yPct };
    });

    const LOOKUP_N = 2000;
    const ySamples: number[] = [];
    for (let i = 0; i <= LOOKUP_N; i++) {
      const s = (i / LOOKUP_N) * len;
      ySamples.push(path.getPointAtLength(s).y);
    }
    let lastLookupIndex = 0;

    function findProgressForY(targetY: number) {
      const windowSize = Math.max(40, Math.floor(LOOKUP_N * 0.12));
      let lo = Math.max(0, lastLookupIndex - windowSize);
      let hi = Math.min(LOOKUP_N, lastLookupIndex + windowSize);
      let bestIdx = lastLookupIndex;
      let bestDiff = Math.abs(ySamples[bestIdx] - targetY);
      for (let i = lo; i <= hi; i++) {
        const diff = Math.abs(ySamples[i] - targetY);
        if (diff < bestDiff) { bestDiff = diff; bestIdx = i; }
      }
      if (bestDiff > 60) {
        for (let i = 0; i <= LOOKUP_N; i++) {
          const diff = Math.abs(ySamples[i] - targetY);
          if (diff < bestDiff) { bestDiff = diff; bestIdx = i; }
        }
      }
      lastLookupIndex = bestIdx;
      return bestIdx / LOOKUP_N;
    }

    let targetProgress = 0;
    let currentProgress = 0;
    let lastTime: number | null = null;
    let animFrame: number;

    function computeTargetProgress() {
      const rect = timeline.getBoundingClientRect();
      const total = timeline.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      const ratio = total > 0 ? scrolled / total : (rect.top < 0 ? 1 : 0);
      const targetY = ratio * viewBoxHeight;
      targetProgress = findProgressForY(targetY);
    }

    function getAngleAt(t: number) {
      const delta = 0.0015;
      const t1 = Math.max(0, t - delta);
      const t2 = Math.min(1, t + delta);
      const p1 = path.getPointAtLength(len * t1);
      const p2 = path.getPointAtLength(len * t2);
      const rect = timeline.getBoundingClientRect();
      const dx = ((p2.x - p1.x) / viewBoxWidth) * rect.width;
      const dy = ((p2.y - p1.y) / viewBoxHeight) * rect.height;
      return Math.atan2(dy, dx) * (180 / Math.PI);
    }

    const CATCH_UP_SPEED = 22;

    function render(now: number) {
      if (lastTime === null) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      computeTargetProgress();

      const ease = 1 - Math.exp(-CATCH_UP_SPEED * dt);
      currentProgress += (targetProgress - currentProgress) * ease;
      if (Math.abs(targetProgress - currentProgress) < 0.0004) currentProgress = targetProgress;

      maskPath.style.strokeDashoffset = (len * (1 - currentProgress)).toString();

      const pt = path.getPointAtLength(len * currentProgress);
      const { xPct, yPct } = toPercent(pt);
      dot.style.left = xPct + '%';
      dot.style.top = yPct + '%';

      const angle = getAngleAt(currentProgress);
      pen.style.left = xPct + '%';
      pen.style.top = yPct + '%';
      pen.style.transform = `translate(-50%, -85%) rotate(${angle - 120}deg)`;

      msData.forEach((m, i) => {
        if (!m.marker || !m.el) return;
        const nextAt = msData[i + 1] ? msData[i + 1].at : Infinity;
        const passed = currentProgress >= m.at;
        const active = passed && currentProgress < nextAt;

        if (passed !== m.marker.classList.contains('is-reached')) {
          m.marker.classList.toggle('is-reached', passed);
        }
        m.el.classList.toggle('is-visible', active);
      });

      animFrame = requestAnimationFrame(render);
    }

    const onResize = () => {
      computeTargetProgress();
      msData.forEach(m => {
        const pt = path.getPointAtLength(len * m.at);
        const { xPct, yPct } = toPercent(pt);
        if (m.marker) {
          m.marker.style.left = xPct + '%';
          m.marker.style.top = yPct + '%';
        }
        if (m.el) m.el.style.top = yPct + '%';
      });
    };

    window.addEventListener('resize', onResize);
    animFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section id="timeline" className="w-full relative bg-white border-y border-border-light">
      <div className="tl-intro">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-body mb-4">Timeline & Journey</h2>
          <p className="text-muted text-center max-w-lg mx-auto">Scroll ke bawah untuk melihat perjalanan karir dan pendidikan.</p>
        </div>
      </div>

      <div className="timeline-container" ref={timelineRef}>
        <svg className="tl-svg" viewBox="0 0 900 1900" preserveAspectRatio="xMidYMin slice">
          <defs>
            <path id="tlPath" ref={pathRef} fill="none"
              d="M 400 0
                 C 200 150, 100 350, 150 550
                 C 200 700, 350 750, 500 750
                 C 750 750, 850 500, 550 500
                 C 250 500, 150 750, 250 1150
                 C 350 1550, 100 1700, 150 1950" />
            
            <mask id="tlRevealMask">
              <path ref={maskPathRef} fill="none" stroke="#fff" strokeWidth="46"
                strokeLinecap="round" strokeLinejoin="round"
                d="M 400 0
                   C 200 150, 100 350, 150 550
                   C 200 700, 350 750, 500 750
                   C 750 750, 850 500, 550 500
                   C 250 500, 150 750, 250 1150
                   C 350 1550, 100 1700, 150 1950" />
            </mask>
            <filter id="inkShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1.6" stdDeviation="1.2" floodColor="#000" floodOpacity=".2"/>
            </filter>
          </defs>
          <path id="tlInk" ref={inkShapeRef} filter="url(#inkShadow)" mask="url(#tlRevealMask)" />
        </svg>
        
        {milestones.map((_, i) => (
          <div key={`marker-${i}`} ref={el => { markerRefs.current[i] = el; }} className="tl-marker"></div>
        ))}

        <div className="tl-dot" ref={dotRef}></div>
        <div className="tl-pen" ref={penRef}>
          <svg viewBox="-10 -10 52 66">
            <rect x="12" y="0" width="8" height="13" rx="2.5" fill="#3a3a40"/>
            <rect x="12" y="0" width="8" height="4" rx="2" fill="#57575f"/>
            <path d="M16 11 L25 23 C25 33 21 41 16 46 C11 41 7 33 7 23 Z"
              fill="#eae8df" stroke="#17171c" strokeWidth="1.5"/>
            <line x1="16" y1="15" x2="16" y2="43" stroke="#17171c" strokeWidth="1.5"/>
            <circle cx="16" cy="20" r="1.5" fill="#17171c"/>
            <circle cx="2" cy="38" r="1.5" fill="#17171c"/>
            <circle cx="32" cy="42" r="2.5" fill="#17171c"/>
            <circle cx="27" cy="53" r="1" fill="#17171c"/>
            <circle cx="4" cy="50" r="1.2" fill="#17171c"/>
            <circle cx="30" cy="30" r="1" fill="#17171c"/>
            <circle cx="8" cy="28" r="0.8" fill="#17171c"/>
          </svg>
        </div>

        {milestones.map((m, i) => (
          <div 
            key={`item-${i}`} 
            ref={el => { itemRefs.current[i] = el; }} 
            className="tl-item" 
            style={{ left: m.left }}
          >
            <p className="year">{m.year}</p>
            <p className="role" dangerouslySetInnerHTML={{ __html: m.role }}></p>
          </div>
        ))}
      </div>
      
      <div className="outro" style={{ height: '20vh' }}></div>
    </section>
  );
};

