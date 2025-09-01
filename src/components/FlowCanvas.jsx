import { useEffect, useState } from 'react';

export default function FlowCanvas({ pairs = [] }) {
  const [paths, setPaths] = useState([]);

  const compute = () => {
    const out = [];
    pairs.forEach(({ from, to }) => {
      const a = document.querySelector(from);
      const b = document.querySelector(to);
      if (!a || !b) return;

      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const sx = window.scrollX;
      const sy = window.scrollY;

      const x1 = ar.left + ar.width / 2 + sx;
      const y1 = ar.bottom + sy;
      const x2 = br.left + br.width / 2 + sx;
      const y2 = br.top + sy;
      const dx = (x2 - x1) * 0.25;
      const d = `M ${x1},${y1} C ${x1 + dx},${y1 + 60} ${x2 - dx},${y2 - 60} ${x2},${y2}`;
      out.push(d);
    });
    setPaths(out);
  };

  useEffect(() => {
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(document.body);
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [pairs.join('|')]);

  return (
    <svg className="pointer-events-none fixed inset-0 z-0" width="100%" height="100%">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(94,234,212,.7)"
          strokeWidth="2"
          strokeDasharray="2 8"
        />
      ))}
    </svg>
  );
}