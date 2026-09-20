import React, { useEffect, useRef, useId } from 'react';

export const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const inkShapeRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const penRef = useRef<HTMLDivElement>(null);
  
  // Membuat ID unik untuk mask (mencegah bug SVG menghilang saat Hot Reload di Vite/React)
  const rawId = useId();
  const maskId = `tlRevealMask-${rawId.replace(/:/g, "")}`;
  
  const milestones = [
    { at: 0.10, year: '2024 — Sekarang', role: 'Mahasiswa <b>Informatika</b>, Universitas Muhammadiyah Semarang', left: '25%' },
    { at: 0.35, year: '2026', role: 'Magang, <b>Dinas Arsip dan Perpustakaan Kota Semarang</b>', left: '55%' },
    { at: 0.70, year: '2026 — Sekarang', role: 'Freelance <b>Web Developer</b>', left: '20%' }
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
    maskPath.style.strokeDasharray = len.toString();

    function buildInkShape() {
      const step = 4;
      const n = Math.max(80, Math.floor(len / step));
      const eps = Math.max(len * 0.0008, 0.6);
      const baseW = 7.5, minW = 1.2, bumpMul = 1.6, sigma = 55;
      const taperLen = Math.min(len * 0.02, 45);

      function widthAt(s: number, t: number) {
        let w = baseW * (0.6 + 0.5 * Math.sin(t * 37.1));
        milestones.forEach(m => {
          const dd = (t - m.at) * len;
          w += baseW * bumpMul * Math.exp(-(dd * dd) / (2 * sigma * sigma));
        });
        if (s < taperLen) w *= s / taperLen;
        if (s > len - taperLen) w *= (len - s) / taperLen;
        return Math.max(minW, w);
      }

      const fwd: number[][] = [], bwd: number[][] = [];
      for (let i = 0; i <= n; i++) {
        const s = (i / n) * len;
        const t = s / len;
        const p0 = path.getPointAtLength(Math.max(0, s - eps));
        const p1 = path.getPointAtLength(Math.min(len, s + eps));
        let dx = p1.x - p0.x, dy = p1.y - p0.y;
        const mag = Math.hypot(dx, dy) || 1;
        const nx = -(dy / mag), ny = dx / mag;
        const p = path.getPointAtLength(s);
        let w = widthAt(s, t);
        
        fwd.push([p.x + nx * (w / 2), p.y + ny * (w / 2)]);
        bwd.push([p.x - nx * (w / 2), p.y - ny * (w / 2)]);
      }

      let d = `M ${fwd[0][0].toFixed(2)},${fwd[0][1].toFixed(2)} `;
      fwd.forEach(p => d += `L ${p[0].toFixed(2)},${p[1].toFixed(2)} `);
      bwd.reverse().forEach(p => d += `L ${p[0].toFixed(2)},${p[1].toFixed(2)} `);
      d += 'Z';
      inkShape.setAttribute('d', d);
    }
    
    buildInkShape();

    const viewBoxWidth = 900;
    const viewBoxHeight = 1900;

    function toPercent(pt: DOMPoint | SVGPoint) {
      return { xPct: (pt.x / viewBoxWidth) * 100, yPct: (pt.y / viewBoxHeight) * 100 };
    }

    const msData = milestones.map((m, idx) => {
      const pt = path.getPointAtLength(len * m.at);
      const { xPct, yPct } = toPercent(pt);
      const marker = markerRefs.current[idx];
      const el = itemRefs.current[idx];
      
      if (marker && el) {
        marker.style.left = `${xPct}%`;
        marker.style.top = `${yPct}%`;
        el.style.top = `${yPct}%`;
      }
      return { at: m.at, marker, el, xPct, yPct };
    });

    let targetProgress = 0;
    let currentProgress = 0;
    let isInitialized = false; // Flag untuk mencegah delay di awal
    let animFrame: number;

    function computeTargetProgress() {
      const rect = timeline.getBoundingClientRect();
      
      // PERBAIKAN: Offset diatur ke 80% layar agar garis mulai menggambar lebih awal saat discroll
      const offset = window.innerHeight * 0.8; 
      const distanceScrolled = offset - rect.top;
      const ratio = distanceScrolled / rect.height;
      
      targetProgress = Math.max(0, Math.min(1, ratio));
    }

    function getAngleAt(t: number) {
      const delta = 0.002;
      const p1 = path.getPointAtLength(len * Math.max(0, t - delta));
      const p2 = path.getPointAtLength(len * Math.min(1, t + delta));
      return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    }

    function render() {
      computeTargetProgress();
      
      // PERBAIKAN: Jika ini render pertama, posisi pena langsung "snap" ke titik scroll saat ini (tidak ada delay animasi)
      if (!isInitialized) {
        currentProgress = targetProgress;
        isInitialized = true;
      } else {
        // PERBAIKAN: Kecepatan mengejar pena dinaikkan (0.15 dari sebelumnya 0.10) agar lebih responsif terhadap scroll
        currentProgress += (targetProgress - currentProgress) * 0.15;
      }
      
      maskPath.style.strokeDashoffset = (len * (1 - currentProgress)).toString();

      const pt = path.getPointAtLength(len * currentProgress);
      const { xPct, yPct } = toPercent(pt);
      
      dot.style.left = `${xPct}%`;
      dot.style.top = `${yPct}%`;

      const angle = getAngleAt(currentProgress);
      pen.style.left = `${xPct}%`;
      pen.style.top = `${yPct}%`;
      pen.style.transform = `translate(-50%, -85%) rotate(${angle - 120}deg)`;

      msData.forEach((m) => {
        if (!m.marker || !m.el) return;
        const passed = currentProgress >= m.at;
        
        if (passed) {
          m.marker.style.transform = 'translate(-50%, -50%) scale(1.5)';
          m.marker.style.backgroundColor = '#ef4444'; // Tailwind red-500
          m.el.style.opacity = '1';
          m.el.style.transform = 'translateY(-50%) translateX(0)';
        } else {
          m.marker.style.transform = 'translate(-50%, -50%) scale(1)';
          m.marker.style.backgroundColor = '#f3f4f6'; // Tailwind gray-100
          m.el.style.opacity = '0';
          m.el.style.transform = 'translateY(-40%) translateX(0)';
        }
      });

      animFrame = requestAnimationFrame(render);
    }

    animFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrame);
  }, [maskId]); // Efek dire-render dengan aman jika ID berubah

  return (
    <section id="timeline" className="w-full relative bg-white py-20 border-y border-border-light overflow-hidden">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-body mb-4">Timeline & Journey</h2>
        <p className="text-muted text-center max-w-lg mx-auto">Scroll ke bawah untuk melihat perjalanan karir dan pendidikan.</p>
      </div>

      <div className="relative w-full max-w-3xl mx-auto mt-10" ref={timelineRef}>
        
        <svg className="w-full h-auto drop-shadow-sm" viewBox="0 0 900 1900" preserveAspectRatio="xMidYMid meet">
          <defs>
            <path id="tlPath" ref={pathRef} fill="none"
              d="M 400 0 C 200 150, 100 350, 150 550 C 200 700, 350 750, 500 750 C 750 750, 850 500, 550 500 C 250 500, 150 750, 250 1150 C 350 1550, 100 1700, 150 1950" />
            
            {/* ID Dinamis agar garis tidak hilang saat file disimpan (Hot Reload) */}
            <mask id={maskId}>
              <path ref={maskPathRef} fill="none" stroke="#fff" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round"
                d="M 400 0 C 200 150, 100 350, 150 550 C 200 700, 350 750, 500 750 C 750 750, 850 500, 550 500 C 250 500, 150 750, 250 1150 C 350 1550, 100 1700, 150 1950" />
            </mask>
          </defs>
          <path id="tlInk" ref={inkShapeRef} fill="#1f2937" mask={`url(#${maskId})`} />
        </svg>
        
        {milestones.map((_, i) => (
          <div 
            key={`marker-${i}`} 
            ref={el => { markerRefs.current[i] = el; }} 
            className="absolute w-4 h-4 rounded-full border-[3px] border-white transition-all duration-300 z-10 -translate-x-1/2 -translate-y-1/2 shadow-sm bg-gray-100"
          ></div>
        ))}

        <div ref={dotRef} className="absolute w-3 h-3 bg-red-600 rounded-full z-20 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
        
        <div ref={penRef} className="absolute w-12 h-12 z-30 pointer-events-none origin-bottom">
          <svg viewBox="-10 -10 52 66" className="w-full h-full drop-shadow-md">
            <rect x="12" y="0" width="8" height="13" rx="2.5" fill="#3a3a40"/>
            <rect x="12" y="0" width="8" height="4" rx="2" fill="#57575f"/>
            <path d="M16 11 L25 23 C25 33 21 41 16 46 C11 41 7 33 7 23 Z" fill="#eae8df" stroke="#17171c" strokeWidth="1.5"/>
            <line x1="16" y1="15" x2="16" y2="43" stroke="#17171c" strokeWidth="1.5"/>
            <circle cx="16" cy="20" r="1.5" fill="#17171c"/>
            <circle cx="2" cy="38" r="1.5" fill="#17171c"/>
            <circle cx="32" cy="42" r="2.5" fill="#17171c"/>
            <circle cx="27" cy="53" r="1" fill="#17171c"/>
          </svg>
        </div>

        {milestones.map((m, i) => (
          <div 
            key={`item-${i}`} 
            ref={el => { itemRefs.current[i] = el; }} 
            className="absolute w-[45%] md:w-[35%] transition-all duration-700 z-20 px-4" 
            style={{ left: m.left }}
          >
            <p className="text-sm md:text-base font-bold text-red-600 mb-1">{m.year}</p>
            <div 
              className="text-sm md:text-base text-gray-800 bg-white p-4 rounded-xl border border-gray-100 shadow-sm" 
              dangerouslySetInnerHTML={{ __html: m.role }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};