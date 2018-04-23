#!/usr/bin/env node
'use strict';

const { createContext, runInContext } = require('vm');
const { readFileSync, appendFileSync } = require('fs');
const { resolve } = require('path');
const { red, blue, bold, green, yellow } = require('chalk');
const prettier = require('prettier');
const util = require('util');
const repl = require('repl');
const clear = require('clear');
const prompt = red.bold('GEEK! > ');

const replContext = {
    __clear: clear
}

const line = Array(5).fill('-').join('_');

const filePath = resolve(process.argv[2]);
appendFileSync(filePath, `\n// ${line} REPL SESSION STARTS HERE ${line}\n`);
const fileContent = readFileSync(filePath,'utf8');

const evalOptions = {
    filename: filePath,
    lineOffset: fileContent.split('\n').length
};

const autocompleteRegex = /^try { .* } catch \(e\) {}$/;
const isAutoCompleteCmd = (x) => autocompleteRegex.test(x);
const isRecoverableError = (error) => 
    error.name === 'SyntaxError'
      ? /^(Unexpected end of input|Unexpected token|missing \) after argument list)/.test(error.message)
      : false;

const customEval = (cmd, context, filename, callback) => {
    
    let result = null;
    try{
        result = runInContext(cmd, context, evalOptions);
    } catch (e) {
        if (isRecoverableError(e)) {
          return callback(new repl.Recoverable(e));
        }
    }
    callback(null,result);
    if (isAutoCompleteCmd(cmd)) {
        return;
    };
    // console.info('Eval this: ',green(cmd.replace(/\n/,'')));
    const output =
        result === undefined
            ? cmd
            : `${cmd.trim()} /* ${util.inspect(result)} */\n`;

    appendFileSync(filePath, prettier.format(output,{singleQuote: true}));
}

const customWriter = (input) => {
    console.log('Outputo', input)
    return yellow.bold(input)
}

const replServer = repl.start({
    prompt,
    ignoreUndefined: true,
    // writer: customWriter,
    eval: customEval,
    useColors: true,
})

// fileStream.on('data', process.stdin.write);
// process.stdin.on('data', (ch) => {
//     if (ch.toString() === 'x') {
//         process.stdout.cursorTo(0);
//         process.stdout.write(green('xxxx'))
//     }
// })

runInContext(fileContent, replServer.context);

Object.assign(replServer.context, replContext, {repol: replServer});


clear();
console.info(blue.bold('\nWelcome sir'));
replServer.prompt();