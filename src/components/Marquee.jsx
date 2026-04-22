import React from 'react';

const MARQUEE_ITEMS = [
  'Website Development', 'Mobile Apps', 'Brand Identity', 'Digital Marketing', 'UI/UX Design', 'SaaS Solutions',
  'Website Development', 'Mobile Apps', 'Brand Identity', 'Digital Marketing', 'UI/UX Design', 'SaaS Solutions',
  'Website Development', 'Mobile Apps', 'Brand Identity', 'Digital Marketing', 'UI/UX Design', 'SaaS Solutions',
]

export default function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((item, i) => (
          <div className="marquee-item" key={i}>
            <span className="m-sep" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
