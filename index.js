// Imports
var fs = require('fs');
var exec  = require('child_process').exec;

// Fast variables
var none = '';
var bubbleError = '\nBubbleJS error: ';
var bubbleUrgent = '\nBubbleJS <!>: ';

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
    var json = json.replace("// If you would need to 'Press any key to exit' so you can see the code you have made.", none);
    var json = json.replace("// This will create a folder and a index.html file with containing already everything to start to code (still need a bit of html code). Please set the option GenerationFile to true.", none);
    var json = json.replace("/* Prefix and suffix */", none);
    var json = json.replace("/* Imports */", none);
    var json = json.replace("/* BubbleJS Developers */", none);
    var json = json.replace("/* Others */", none);
    var json = json.replace("/* Loops */", none);
    var json = json.replace("/* Directory */", none);
    var json = json.replace("/* Files */", none);
    var json = json.replace("/* Website */", none);

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

                    if (mC.WebsiteDevelopement === true) {
                        fs.mkdir(__dirname + '/Website/', function(err) {
                            var htmlData = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
<!-- Please set the "FileName.js" to your Javascript file. -->
<script src="/Generation/FileName.js"></script>
</html>
                            `;

                            // checking and creating the index.html file and Website folder
                            if (fs.existsSync(__dirname + '/Website/index.html')) {
                                fs.readFile(__dirname + '/Website/index.html', 'utf8', function(err, htmlFile) {
                                    if (htmlFile === htmlData) {
                                        fs.writeFile(__dirname + '/Website/index.html', htmlData, function(err) {
                                        });
                                    }
                                });
                            } else if (!fs.existsSync(__dirname + '/Website/index.html')) {
                                fs.writeFile(__dirname + '/Website/index.html', htmlData, function(err) {
                                });
                            }
                        });
                    } else if (mC.WebsiteDevelopement === false) {
                        if (fs.existsSync(__dirname + '/Website/')) {
                            console.log(bubbleUrgent + "Please consider removing the website folder and the files by your self for your code's security.");
                        }
                    }

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
                    var data2 = data2.replaceAll('sys.say', 'console.log');
                    var data2 = data2.replaceAll('console.println', 'console.log');
                    var data2 = data2.replaceAll('console.print', 'console.log');
    
                    // Variables
                    var data2 = data2.replaceAll('v' + p, 'var');
                    var data2 = data2.replaceAll('c' + p, 'const');
                    var data2 = data2.replaceAll('l' + p, 'let');
                    var data2 = data2.replaceAll('set' + p, 'var');
                    var data2 = data2.replaceAll('sys.set', 'var');
                    var data2 = data2.replaceAll('sys.var', 'var');
                    var data2 = data2.replaceAll('sys.const', 'const');
                    var data2 = data2.replaceAll('sys.let', 'let');

                    // Json
                    var data2 = data2.replaceAll('json.p', 'JSON.parse');
                    var data2 = data2.replaceAll('json.s', 'JSON.stringify');

                    // ?=
                    for (var i = 0; i < mC.MaxLoops; i++) {
                        var data6 = data2.substring(data2.indexOf('sys.?') + 5, data2.indexOf('?;'));
                        var data2 = data2.replace('sys.?' + data6 + '?;', 'console.log(' + data6 + ');');
                    }

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

                    if (data2.includes('get pack.math;')) {
                        var data2 = 'get pack.math;\nget pack.math;\nget pack.math;\nget pack.math;\nget pack.math;' + data2;
                        var data2 = data2.replace('get pack.math;', `
function square(number) {
    return number * number
}
`);
                        var data2 = data2.replace('get pack.math;', `
function log(string) {
    console.log(string)
}
`);
                        var data2 = data2.replace('get pack.math;', `
function multiply(number, number2) {
    return number * number2
}
`);
                        var data2 = data2.replace('get pack.math;', `
function division(number, number2) {
    return number / number2
}\n
function divide(number, number2) {
    return number / number2
}
`);
                        var data2 = data2.replace('get pack.math;', `
function addition(number, number2) {
    return number + number2
}
`);
                        var data2 = data2.replace('get pack.math;', `
function subtraction(number, number2) {
    return number - number2
}
`);
                    }

                    // get square
                    if (data2.includes('get square;')) {
                        var data2 = data2.replace('get square;', `
function square(number) {
    return number * number
}
`);
                    }
                    
                    // get log
                    if (data2.includes('get log;')) {
                        var data2 = data2.replace('get log;', `
function log(string) {
    console.log(string)
}
`);
                    }

                    // get multiply
                    if (data2.includes('get multiply;')) {
                        var data2 = data2.replace('get multiply;', `
function multiply(number, number2) {
    return number * number2
}
`);
                    }

                    // get multiply
                    if (data2.includes('get division;')) {
                        var data2 = data2.replace('get division;', `
function division(number, number2) {
    return number / number2
}\n
function divide(number, number2) {
    return number / number2
}
`);
                    }

                    // get addition
                    if (data2.includes('get addition;')) {
                        var data2 = data2.replace('get addition;', `
function addition(number, number2) {
    return number + number2
}
`);
                    }

                    // get subtraction
                    if (data2.includes('get subtraction;')) {
                        var data2 = data2.replace('get subtraction;', `
function subtraction(number, number2) {
    return number - number2
}
`);
                    }

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

                    // Getting
                    var data2 = data2.replaceAll('gebi(', 'getElementById(');
                    var data2 = data2.replaceAll('gebtn(', 'getElementsByTagName(');
                    var data2 = data2.replaceAll('gebcn(', 'getElementsByClassName(');
                    var data2 = data2.replaceAll('getbyid(', 'getElementById(');
                    var data2 = data2.replaceAll('getbytagname(', 'getElementsByTagName(');
                    var data2 = data2.replaceAll('getbyclassname(', 'getElementsByClassName(');
                    
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

                                if (mC.WaitKeyPress === true) {
                                    // Press any key to exit
                                    console.log('Press any key to exit');
                                    process.stdin.setRawMode(true);
                                    process.stdin.resume();
                                    process.stdin.on('data', process.exit.bind(process, 0));
                                }
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

                        if (mC.WaitKeyPress === true) {
                            // Press any key to exit
                            console.log('Press any key to exit');
                            process.stdin.setRawMode(true);
                            process.stdin.resume();
                            process.stdin.on('data', process.exit.bind(process, 0));
                        }
                    }
                }
            });
        });
    });
});
