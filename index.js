// Imports
var fs = require('fs');
var exec  = require('child_process').exec;

// Fast variables
var none = '';

// Reading the JSON file
fs.readFile('bjsconfig.json', 'utf8', function(err, json) {

    // Removing the comments
    var json = json.replace('// The suffix of the coding language.', none);
    var json = json.replace('// How many loop is there going to be maximum. If you have more than 10 000 loops change it for a higher amount.', none);
    var json = json.replace('// This is the type of variable you want to use in the loops.', none);
    var json = json.replace('// This is that variable that will be used in every loop that you make.', none);
    var json = json.replace('// The folder where you will code all your BubbleJS.', none);

    // Parsing the JSON
    var mC = JSON.parse(json);
    
    // Reading the directory
    fs.readdir(__dirname + mC.ScriptsDirectory, 'utf8', function(err, dir) {
    
        // Reading each file 1 by 1
        dir.forEach(function(files) {
    
            // Reading every file
            fs.readFile(__dirname + '/Scripts/' + files, 'utf8', function(err, data) {
    
                // Removing the strings
                /*
                var numberOfLoops = 1000;
                for (var i = 0; i < 1000; i++) {
                    var str = data.substring(data.indexOf("'") + 1, data.lastIndexOf("'"));
                }
                */
    
                // Making the changes
                var p = mC.Suffix;

                // Function
                var data2 = data.replaceAll('func' + p, 'function');
                var data2 = data2.replaceAll('def' + p, 'function');

                var s = data.substring(data.indexOf('&') + 1, data.indexOf('$$'));
                var data2 = data2.replaceAll(s + '$$' + p, );

                // Console.log
                var data2 = data2.replaceAll('cl' + p, 'console.log');
                var data2 = data2.replaceAll('println' + p, 'console.log');
                var data2 = data2.replaceAll('print' + p, 'console.log');
                var data2 = data2.replaceAll('sout' + p, 'console.log');
                var data2 = data2.replaceAll('co.', 'console.');

                // Document
                var data2 = data2.replaceAll('doc' + p, 'document');

                // Javascript shortcuts
                var data2 = data2.replaceAll('gebi' + p, 'getElementById');
                var data2 = data2.replaceAll('gebtn' + p, 'getElementsByTagName');
                var data2 = data2.replaceAll('gebcn' + p, 'getElementsByClassName');

                // Variables
                var data2 = data2.replaceAll('v' + p, 'var');
                var data2 = data2.replaceAll('c' + p, 'const');
                var data2 = data2.replaceAll('l' + p, 'let');
                var data2 = data2.replaceAll('set' + p, 'var');

                // Eval
                var data2 = data2.replaceAll('execute' + p, 'eval');
                var data2 = data2.replaceAll('exec' + p, 'eval');
                var data2 = data2.replaceAll('exe' + p, 'eval');
                var data2 = data2.replaceAll('script' + p, 'eval');

                // Imports
                var data2 = data2.replaceAll('rq' + p, 'require');
                var data2 = data2.replaceAll('import' + p, 'require');
                var data2 = data2.replaceAll('imp' + p, 'require');

                // Infinity
                var data2 = data2.replaceAll('infinite' + p, 'Infinity');
                var data2 = data2.replaceAll('noend' + p, 'Infinity');
                var data2 = data2.replaceAll('∞' + p, 'Infinity');

                // BubbleJS comments
                var data2 = data2.replaceAll(/^.*##.*$/mg, "");

                // Loops
                for (var i = 0; i < mC.MaxLoops; i++) {
                    var loopString = data2.substring(data2.indexOf('loop <') + 6, data2.indexOf('>'));
                    var data2 = data2.replace('loop <' + loopString + '>', 'for (' + mC.VariableTypeLoop + ' ' + mC.VariableLoop + ' = 0; ' + mC.VariableLoop + ' < ' + loopString + '; ' + mC.VariableLoop + '++)');
                }
                var data2 = data2.replaceAll('infiniteloop' + p, 'for (' + mC.VariableTypeLoop + ' ' + mC.VariableLoop + ' = 0; ' + mC.VariableLoop + ' < Infinity; ' + mC.VariableLoop + '++)');

                // Importings
                for (var i = 0; i < mC.MaxLoops; i++) {
                    var importString = data2.substring(data2.indexOf('import ') + 7, data2.indexOf(';'));
                    var data2 = data2.replace('import ' + importString + ';', 'var ' + importString + ' = require("' + importString + '")');
                }

                // Requires ;
                /*
                data.split(/\r?\n/).forEach((line) => {
                    var lastChar = line.substr(line.length - 1);
                    console.log(lastChar)
                });
                */
    
                // Removing the strings
                /*
                for (var i = 0; i < 1000; i++) {
                    var str2 = data2.substring(data2.indexOf("'") + 1, data2.lastIndexOf("'"));
                    var data2 = data2.replace("'" + str2 + "'", "'" + str + "'");
                }
                */
                
                // Replacing the .asc for .js
                var file = files.split('.')[0] + '.js';
    
                // Generating the Javascript
                fs.writeFile(__dirname + '/Generation/' + file, data2, function(err) {
    
                    // Run the code
                    var runnableScript = exec('node ./Generation/' + file,
                    (error, stdout, stderr) => {
                        console.log(stdout.replace('\n', ''));
                    });
                });
            });
        });
    });
});