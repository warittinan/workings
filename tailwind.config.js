/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        xb: 'url(/pt/x/xblack.png) 32 32 , default',
        xr: 'url(/pt/x/xred.png) 32 32, default',
        xy: 'url(/pt/x/xyellow.png) 32 32, default',
        xg: 'url(/pt/x/xgreen.png) 32 32, default',
        xbu: 'url(/pt/x/xblue.png) 32 32, default',
        ob:"url(/pt/o/oblack.png) 32 32, default",
        or:"url(/pt/o/ored.png) 32 32, default",
        oy:"url(/pt/o/oyellow.png)32 32, default",
        og:"url(/pt/o/ogreen.png) 32 32, default",
        obu:"url(/pt/o/oblue.png) 32 32, default",
        pb:"url(/pt/p/pblack.png) 32 32, default",
        pr:"url(/pt/p/pred.png) 32 32, default",
        py:"url(/pt/p/pyellow.png) 32 32, default",
        pg:"url(/pt/p/pgreen.png) 32 32, default",
        pbu:"url(/pt/p/pblue.png) 32 32, default",
        tb:"url(/pt/t/Tblack.png) 32 32, default",
        tr:"url(/pt/t/Tred.png) 32 32, default",
        ty:"url(/pt/t/Tyellow.png) 32 32, default",
        tg:"url(/pt/t/Tgreen.png) 32 32, default",
        tbu:"url(/pt/t/Tblue.png) 32 32, default",
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1386px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1387px',
        // => @media (min-width: 1280px) { ... }
        'd': '1500px',
      },
    },
  },
  safelist: ['cursor-pb',
    'cursor-pr',
    'cursor-py',
    'cursor-pg',
    'cursor-pbu',
    'cursor-xb',
    'cursor-xr',
    'cursor-xy',
    'cursor-xg',
    'cursor-xbu',
    'cursor-ob',
    'cursor-or',
    'cursor-oy',
    'cursor-og',
    'cursor-obu',
    'cursor-tb',
    'cursor-tr',
    'cursor-ty',
    'cursor-tg',
    'cursor-tbu'
  ],
  
  plugins: [require('daisyui')],
}
