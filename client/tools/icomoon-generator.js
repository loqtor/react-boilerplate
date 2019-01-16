const fs = require('fs');
const path = require('path');

const REPLACE_ME = 'STRING_TO_REPLACE';
// eslint-disable-next-line
const ICOMOON_OBJ = require(path.resolve('public/assets/icons/selection.json'));

const FILE_TEMPLATE = `// NOTE: This is a generated file, nothing you do here matters
// The source is the icomoon file located at 'public/assets/icons/selection.json'
// The script that generates this file is located at tools/icomoon-generator.js
// To update this file, selection.json must be changed and
// the script run 'yarn run generate-icons'
import React from 'react';

export default {
${REPLACE_ME}};
`;

/**
 * Creates the markup for an icon with the name and pathCount
 * @param {string} name Name of the icon
 * @param {number} pathCount Number of inner spans created with corresponding className path1, path2, ..., pathN
 */
function createIcon(name, pathCount) {
  const innerSpans = [];
  // If paths count is 0 or 1 then don't create additional spans
  if (pathCount && pathCount >= 2) {
    for (let index = 1; index <= pathCount; index += 1) {
      innerSpans.push(`<span className='path${index}' key='${index}'></span>`);
    }
  }

  return `<span className='icon icon-${name}'>${innerSpans.join('')}</span>`;
}

/**
 * Generates icon elements based on the selection.json produced by icomoon
 * @param {string} destinationFile name for the output of the icons generated
 */
function generateIcomoonIcons(destinationFile) {
  const iconsCode = ICOMOON_OBJ.icons.reduce((codeString, icon) => {
    const { name } = icon.properties;

    const spanCount = icon.icon.paths.length;
    const newIcon = createIcon(name, spanCount);

    // eslint-disable-next-line
    codeString += `  '${name}': ${newIcon},\n`;
    return codeString;
  }, '');

  const fileContent = FILE_TEMPLATE.replace(REPLACE_ME, iconsCode);
  fs.writeFileSync(destinationFile, fileContent);
}

generateIcomoonIcons(path.resolve('src/tools/utilities/icomoon-content.js'));
