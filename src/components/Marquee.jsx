import React from 'react';

const MARQUEE_ITEMS = [
  'Poster Making', 'Branding', 'Ads Video Making',
  'Poster Making', 'Branding', 'Ads Video Making',
  'Poster Making', 'Branding', 'Ads Video Making',
  'Poster Making', 'Branding', 'Ads Video Making',
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
