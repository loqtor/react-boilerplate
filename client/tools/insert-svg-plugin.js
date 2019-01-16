var fs = require('fs');
var path = require('path');

class InsertSVGPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    var fileName = this.options.fileName;
    if (path.resolve(fileName) === path.normalize(fileName)) {
      this.options.fileName = path.relative(compiler.options.output.path, fileName);
    }
    fileName = this.options.fileName;
  
    var createFileList = function (compilation, callback) {
  
      // Grab the htmlFile (index.html)
      var htmlFile = compilation.assets[fileName];
  
      // Grab the source
      var htmlSource = htmlFile.source();
  
      // Read the file from this.options.svgFile
      var svgFileName = this.options.svgFileName;
  
      // Grab the contents of the svgFile
      var contents = fs.readFileSync(svgFileName, 'utf8');
  
      // Replace the target comment with the contents of the svg file.
      var newHtmlSource = htmlSource.replace('<!-- INSERT_SVG_TARGET -->', contents);
  
      // Replace the old index.html with the new index.html
      compilation.assets[fileName] = {
        source: function () {
          return newHtmlSource;
        },
        size: function () {
          return newHtmlSource.length;
        }
      };
  
      callback();
    };
  
    createFileList = createFileList.bind(this);
  
    compiler.hooks.emit.tapAsync('InsertSVGPlugin', createFileList);
    
    compiler.hooks.done.tap('InsertSVGPlugin', function () {
      console.log('InsertSVGPlugin is complete!');
    });
  }
}

module.exports = InsertSVGPlugin;