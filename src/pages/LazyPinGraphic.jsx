import React from "react";

export default function LazyPinGraphic() {
  return (
    <div className="w-full max-w-[19rem] sm:max-w-[22rem] md:max-w-[30rem] relative">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-full">

        {/* BOX */}
        <g stroke="#CFCFCF" strokeWidth="4" fill="none" transform="translate(0,20)">
          <path d="M85 150 L200 100 L315 150 L200 200 Z" />
          <path d="M85 150 L85 250 L200 300 L200 200 Z" />
          <path d="M315 150 L315 250 L200 300" />
        </g>

        {/* 🔥 PIN (Same design as before) */}
        <g transform="translate(200,50)">

          {/* Pulse Animation */}
          <circle cx="0" cy="0" r="26" stroke="#E9AB1D" strokeWidth="3" fill="none">
            <animate attributeName="r" from="22" to="52" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="indefinite" />
          </circle>

          {/* Pin Outer Shape */}
          <path
            d="
              M 0 -45
              C 28 -45 48 -25 48 4
              C 48 36 0 90 0 90
              C 0 90 -48 36 -48 4
              C -48 -25 -28 -45 0 -45
              Z
            "
            fill="white"
            stroke="#E9AB1D"
            strokeWidth="4"
          />

          {/* Circle inside pin */}
          <circle cx="0" cy="0" r="26" fill="white" stroke="#E9AB1D" strokeWidth="3" />

          {/* Logo inside circle */}
          <image
            href="favicon.png"
            x="-22"
            y="-22"
            width="44"
            height="44"
          />
        </g>

      </svg>
    </div>
  );
}
