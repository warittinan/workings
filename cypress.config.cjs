const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
   specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
   baseUrl:"https://intproj22.sit.kmutt.ac.th/ssa1",
  //  baseUrl:"http://localhost:5173/",
   experimentalSessionAndOrigin: true,
   experimentalRunAllSpecs:true,
  },
});
