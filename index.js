// Imports
var fs = require('fs');
var exec  = require('child_process').exec;

// Fast variables
var none = '';
var bubbleError = '\nBubbleJS error: ';

// Reading the JSON file
fs.readFile('bjsconfig.json', 'utf8', function(err, json) {

    // If config file is empty
    if (json === '') {
        console.log(bubbleError + 'Please reinstall BubbleJs. bjsconfig.json is empty.\n');
        if (mC.ForceRun === false) {
            process.exit(1);
        }
    }

    // Removing the comments
    var json = json.replace('// The suffix of the coding language.', none);
    var json = json.replace('// How many loop is there going to be maximum. If you have more than 10 000 loops change it for a higher amount.', none);
    var json = json.replace('// This is the type of variable you want to use in the loops.', none);
    var json = json.replace('// This is that variable that will be used in every loop that you make.', none);
    var json = json.replace('// The folder where you will code all your BubbleJS.', none);
    var json = json.replace('// If you want to use the language or just the generator.', none);
    var json = json.replace('// You can run the generator without creating a Javascript file.', none);
    var json = json.replace('// The folder where every Javascript file is generated.', none);
    var json = json.replace('// Should it be an error if there is nothing in a BubbleJS file.', none);
    var json = json.replace('// Force the code to run even if there is an error.', none);
    var json = json.replace('// If you can use the loops.', none);
    var json = json.replace('// If you can use imports.', none);
    var json = json.replace("// Unlocks the fast coding for BubbleJS developers (Please do not use if you don't know what it is.).", none);
    var json = json.replace("// The prefix of the coding language.", none);

    // Parsing the JSON
    var mC = JSON.parse(json);

    // Fast variables 2
    var pr = mC.Prefix;
    
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
                var data2 = data;

                if (mC.UseBubbleJS === true) {

                    // Fast devlopement
                    if (mC.BubbleJSDeveloper === true) {
                        if (data2.includes('get #fast;')) {
                            var data2 = data2.replace('get #fast;', '');
                            var data2 = data2.replaceAll('data2', 'var data2 = data2');
                            var data2 = data2.replaceAll('changeAll', 'var data2 = data2.replaceAll');
                            var data2 = data2.replaceAll('change', 'var data2 = data2.replace');
                        }
                    }

                    // Function
                    var data2 = data2.replaceAll(pr + 'func', 'function');
                    var data2 = data2.replaceAll(pr + 'def', 'function');
    
                    // Console.log
                    var data2 = data2.replaceAll('sys.println', 'console.log');
                    var data2 = data2.replaceAll('sys.print', 'console.log');
                    var data2 = data2.replaceAll('console.println', 'console.log');
                    var data2 = data2.replaceAll('console.print', 'console.log');
    
                    // Variables
                    var data2 = data2.replaceAll('v' + p, 'var');
                    var data2 = data2.replaceAll('c' + p, 'const');
                    var data2 = data2.replaceAll('l' + p, 'let');
                    for (var i = 0; i < mC.MaxLoops; i++) {
                        var data5 = data2.substring(data2.indexOf('set') + 3, data2.indexOf('='));
                        var data2 = data2.replace('set' + data5 + '=', 'var' + data5 + '=');
                    }

                    // Json
                    var data2 = data2.replaceAll('json.p', 'JSON.parse');
                    var data2 = data2.replaceAll('json.s', 'JSON.stringify');

                    // Json file getting
                    /*
                    var getJson = data2.substring(data2.indexOf('getjson ') + 8, data2.indexOf('!'));
                    var data2 = data2.replace('getJson ' + getJson + '!', 'fs.readFile("' + getJson + '", "utf8", function(err, json))');
                    */

                    /*
                    for (var i = 0; i < mC.MaxLoops; i++) {

                        // Getting variable
                        var setVar = data2.substring(data2.indexOf('var') + 3, data2.indexOf('='));
                        setVar.forEach(function(variable) {
                            // Getting the variable without :number in it
                            if (setVar.includes(':number')) {
                                var setVarNoNumber = variable.replace(':number', '');
                                console.log(setVarNoNumber);
                            }
                            
                            // Getting the variable without :string in it
                            if (setVar.includes(':string')) {
                                var setVarNoString = variable.replace(':string', '');
                                console.log(setVarNoString);
                            }
    
                            // :number
                            if (setVar.includes(':number')) {
                                for (var i = 0; i < mC.MaxLoops; i++) {
                                    var data2 = data2.replace(':number', '');
                                }
                            }
    
                            // :string
                            if (setVar.includes(':string')) {
                                for (var i = 0; i < mC.MaxLoops; i++) {
                                    var data2 = data2.replace(':number', '');
                                }
                            }
                        });
                    }
                    */

                    // Eval
                    var data2 = data2.replaceAll('sys.exe(', 'eval(');
                    var data2 = data2.replaceAll('sys.eval(', 'eval(');
    
                    // Imports
                    var data2 = data2.replaceAll('rq(', 'require(');
                    var data2 = data2.replaceAll('import(', 'require(');
                    var data2 = data2.replaceAll('imp(', 'require(');
    
                    // Infinity
                    var data2 = data2.replaceAll('infinite' + p, 'Infinity');
                    var data2 = data2.replaceAll('noend' + p, 'Infinity');
                    var data2 = data2.replaceAll('∞' + p, 'Infinity');
    
                    // BubbleJS comments
                    var data2 = data2.replaceAll(/^.*##.*$/mg, "");
    
                    // Loops
                    if (mC.Loops === true) {
                        for (var i = 0; i < mC.MaxLoops; i++) {
                            var loopString = data2.substring(data2.indexOf('loop <') + 6, data2.indexOf('>'));
                            var data2 = data2.replace('loop <' + loopString + '>', 'for (' + mC.VariableTypeLoop + ' ' + mC.VariableLoop + ' = 0; ' + mC.VariableLoop + ' < ' + loopString + '; ' + mC.VariableLoop + '++)');
                        }
                        var data2 = data2.replaceAll('infiniteloop' + p, 'for (' + mC.VariableTypeLoop + ' ' + mC.VariableLoop + ' = 0; ' + mC.VariableLoop + ' < Infinity; ' + mC.VariableLoop + '++)');
                    }
    
                    // Importings
                    if (mC.Imports === true) {
                        for (var i = 0; i < mC.MaxLoops; i++) {
                            var importString = data2.substring(data2.indexOf('import ') + 7, data2.indexOf(';'));
                            var data2 = data2.replace('import ' + importString + ';', 'var ' + importString + ' = require("' + importString + '")');
                        }
                    }

                    // Javascript shortcuts
                    // Removing the include doucments;
                    var data2 = data2.replace('get documents;', '');

                    // Getting
                    var data2 = data2.replaceAll('gebi(', 'getElementById(');
                    var data2 = data2.replaceAll('gebtn(', 'getElementsByTagName(');
                    var data2 = data2.replaceAll('gebcn(', 'getElementsByClassName(');
                    
                    // Document
                    var data2 = data2.replaceAll('doc.', 'document.');
    
                } else {

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

                // Checking if it's only .bjs files if is not sending error
                if (!files.includes('.bjs')) {
                    console.log(bubbleError + 'Please use only .bjs files in your scripts.\nIf you want to create a file, create it in the BubbleJS folder.');
                    if (mC.ForceRun === false) {
                        process.exit(1);
                    }
                }

                // If is only .bjs files
                if (files.includes('.bjs')){

                    // Replacing the .asc for .js
                    var file = files.split('.')[0] + '.js';

                    if (mC.EmptyFile === true) {
                        if (data2 === '') {
                            console.log(bubbleError + 'One or more than one file is containing nothing. Please insert something in them.');
                        }
                    }
    
                    // Generating the Javascript
                    // Checking the options
                    if (mC.GenerationFile === true) {
                        // Creating the directory
                        fs.mkdir(__dirname + mC.GenerationFolder, function(err) {
                        });
                        // Adding the files
                        fs.writeFile(__dirname + mC.GenerationFolder + file, data2, function(err) {
                            // Run the code
                            var runnableScript = exec('node .' + mC.GenerationFolder + file,
                            (error, stdout, stderr) => {
                                console.log(stdout);
                            });
                        });
                        // Checking the options
                    } else if (mC.GenerationFile === false) {
                        // Checking if directory exists
                        var existCheck = fs.existsSync(__dirname + mC.GenerationFolder);
                        if (existCheck) {
                            var checkDir = true;
                        } else {
                            var checkDir = false;
                        }
                        // Checking if the variable is true
                        if (checkDir === true) {
                            // Removing the files from the directory
                            fs.unlink(__dirname + mC.GenerationFolder + file, function(err) {
                                // Removing the directory
                                fs.rmdir(__dirname + mC.GenerationFolder, (err) => {
            
                                    if (err) {
                                        return console.log("error occurred in deleting directory", err);
                                    }
                                });
                            });
                        }
    
                        // Executing the code without files
                        eval(data2);
                    }
                }
            });
        });
    });
});
