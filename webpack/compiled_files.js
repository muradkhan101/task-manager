const name = 'CompiledFileList';
class CompiledFileList {
    constructor() {
        this.assets = [];
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(
            name, (compilation) => {
                // Gives info about each file that is added to compilation
                // compilation.hooks.recordModules.tap(name, (thing) => console.log(thing));

                // Doesn't give useful info, just template files for html and scss
                // compilation.hooks.record.tap(name, (comp, rec) => (this.callCount++, console.log(this.callCount, rec)))

                // Didnt give anything
                // compilation.hooks.assetPath.tap(name, (filename, data) => console.log(filename));

                // This gave compiled assets with names!
                // Returned multiple objects with key as filename
                // {index.html: ...}
                // {main.sdf45345jkf.js: ...}
                compilation.hooks.afterOptimizeAssets.tap(name, (assets) => this.assets = [...this.assets, ...Object.keys(assets)])

                // Need to find compiling done hook to write files
            }
        )
        compiler.hooks.done.tap(name, (stats) => {
            console.log('DONE!!!!!!!', this.assets.filter(item => item.includes('')));
        })
        // Doesnt emit after this for some reason
        compiler.hooks.emit.tapAsync(name, (compilation, cb) => {
                // compilation.hooks.additionalAssets.tapAsync(name, (cbInner) => {
                 
                // })
            let info = 'let itemList = ' + JSON.stringify(this.assets.filter(item => /(js|css)$/.test(item)).map(item => '/app/' + item) );
            compilation.assets['../listOfFiles.js'] = {
                source: () => info,
                size: () => info.length,
            }
            cb();
        })
    }
}

module.exports = CompiledFileList;