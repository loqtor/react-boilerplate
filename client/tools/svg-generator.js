const fs = require('fs');
const path = require('path');

const REPLACE_ME = 'STRING_TO_REPLACE';
const SVG_OBJ = fs.readFileSync(path.resolve('public/assets/svg-icons/all.svg'), 'utf8');
const FILE_TEMPLATE = `// NOTE: This is a generated file, nothing you do here matters
// The source is the all.svg file located at 'public/assets/svg-icons/all.svg'
// The script that generates this file is located at tools/svg-generator.js
// To rebuild this file run 'yarn run generate-svgs'
import React from 'react';

export default {
${REPLACE_ME}};
`;

function createSVG(name, viewBox) {
  // Can either use href or xlinkHref (xlinkHref is not supported by React TS yet)
  const use = `<use xlinkHref='#${name}' />`;

  return `
    <svg xmlns='http://www.w3.org/2000/svg' ${viewBox}>
      ${use}
    </svg>
  `;
}

/**
 * Generates svg elements based on the all.svg produced by generate-svg command
 * @param {string} destinationFile name for the output of the svgs generated
 */
function generateSVGs(destinationFile) {
  const svgArray = SVG_OBJ.split('\n');

  const svgCode = svgArray.reduce((codeString, line) => {
    if (line.match(/<symbol id="(\w+?|-)*" viewBox="(\d+| )*">/)) {
      const id = line.match(/"(\w+?|-)*"/);
      const viewBox = line.match(/viewBox="(\d+| )*"/);

      const svgName = id[0];
      const svg = createSVG(svgName.replace(/"/g, ''), viewBox[0]);

      // eslint-disable-next-line
      codeString += `  ${svgName}: (${svg}),\n`;
    }

    return codeString;
  }, '');

  const fileContent = FILE_TEMPLATE.replace(REPLACE_ME, svgCode);
  fs.writeFileSync(destinationFile, fileContent);
}

generateSVGs(path.resolve('src/tools/utilities/svg-content.js'));
