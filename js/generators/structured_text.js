'use strict';

goog.provide('Blockly.ST');
goog.require('Blockly.Generator');


Blockly.ST = new Blockly.Generator("Structured Text");

Blockly.ST.addReservedWords(
    'FUNCTION,END_FUNCTION,FUNCTION_BLOCK,END_FUNCTION_BLOCK,IF,THEN,ELSIF,ELSE,END_IF,INITIAL_STEP,' +
    'END_STEP, NOT, MOD, AND, XOR, OR, PROGRAM, WITH, END_PROGRAM, R_EDGE, READ_ONLY, READ_WRITE, REPEAT, UNTIL, END_REPEAT,' +
    'RESOURCE, ON, END_RESOURCE, RETAIN, NOT_RETAIN, RETURN, STEP, END_STEP, STRUCT, END_STRUCT, TASK, TRANSITION,' +
    'FROM, TO, END_TRANSITION, TRUE, TYPE, END_TYPE, VAR, END_VAR, VAR_INPUT, VAR_OUTPUT, VAR_IN_OUT, VAR_TEMP, VAR_EXTERNAL,' +
    'VAR_ACCESS, VAR_CONFIG, VAR_GLOBAL, WHITE, DO, END_WHILE, WITH'
);

Blockly.ST.ORDER_ATOMIC = 0;
Blockly.ST.ORDER_BITWISE_OR = 1; // OR
Blockly.ST.ORDER_BITWISE_XOR = 2; // XOR
Blockly.ST.ORDER_BITWISE_AND = 3; // AND
Blockly.ST.ORDER_EQUALITY = 4; // =, <>
Blockly.ST.ORDER_RELATIONAL = 5; //<, >, <=, >=
Blockly.ST.ORDER_ADDITION = 6; // +, -
Blockly.ST.ORDER_MULTIPLICATIVE = 7; // *, /, MOD
Blockly.ST.ORDER_UNARY_NEGATION = 8; // -, NOT
Blockly.ST.ORDER_EXPONENTIATION = 9; // EXPT
Blockly.ST.ORDER_FUNCTION_CALL = 10; // Function name
Blockly.ST.ORDER_NONE = 99; // ()

/** Elementary types that language supports */
Blockly.ST.TIME_TYPE = 'TIME';
Blockly.ST.TIME_OF_DAY_TYPE = 'TIME_OF_DAY';
Blockly.ST.DATE_AND_TIME_TYPE = 'DATE_AND_TIME';
Blockly.ST.BOOLEAN_TYPE = 'BOOL';
Blockly.ST.STRING_TYPE = 'STRING';
Blockly.ST.INT_TYPE = 'INT';
Blockly.ST.CHAR_TYPE = 'BYTE';
Blockly.ST.ARRAY_TYPE = 'ARRAY';
Blockly.ST.WORD_TYPE = 'WORD';

Blockly.ST.ANY_BIT_TYPE = [
    'BOOL', 'BYTE', 'WORD', 'DWORD'
];
Blockly.ST.ANY_INT_TYPE = [
    'SINT', 'INT', 'DINT', 'USINT', 'UINT', 'UDINT'
];
Blockly.ST.ANY_REAL_TYPE = [
    'REAL', 'LREAL'
];
Blockly.ST.ANY_DATE_TYPE = [
    'DATE', 'TIME_OF_DAY', 'TOD', 'DATE_AND_TIME', 'DT'
];
Blockly.ST.ANY_ELEMENTARY_TYPE = [].concat(
    Blockly.ST.ANY_BIT_TYPE,
    Blockly.ST.ANY_INT_TYPE,
    Blockly.ST.ANY_DATE_TYPE,
    Blockly.ST.TIME_TYPE,
    Blockly.ST.STRING_TYPE);

Blockly.ST.ANY_NUM_TYPE = [].concat(
    Blockly.ST.ANY_INT_TYPE,
    Blockly.ST.ANY_REAL_TYPE);

Blockly.ST.MAPPED_TYPES = Blockly.ST.ANY_ELEMENTARY_TYPE.map(x => [x, x]);
Blockly.ST.MAPPED_INT_TYPES = Blockly.ST.ANY_INT_TYPE.map(x => [x, x]);


Blockly.ST.init = function (workspace) {
    Blockly.ST.definitions_ = Object.create(null);
    Blockly.ST.functionNames_ = Object.create(null);

    if (!Blockly.ST.variableDB_) {
        Blockly.ST.variableDB_ = new Blockly.Names(Blockly.ST.RESERVED_WORDS_);
    } else {
        Blockly.ST.variableDB_.reset();
    }

    Blockly.ST.variableDB_.setVariableMap(workspace.getVariableMap());

    var defvars = [];
    var defVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (var i = 0; i < defVarList.length; i++) {
        defvars.push(Blockly.ST.variableDB_.getName(defVarList[i], Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    }

    var variables = Blockly.Variables.allUsedVarModels(workspace);
    for (var i = 0; i < variables.length; i++) {
        defvars.push(Blockly.ST.variableDB_.getName(variables[i].getId(), Blockly.Names.PROCEDURE_CATEGORY_NAME));
    }
};

Blockly.ST.workspaceToCode = function (workspace) {
    if (!workspace) {
        // Backwards compatibility from before there could be multiple workspaces.
        console.warn('No workspace specified in workspaceToCode call.  Guessing.');
        workspace = Blockly.getMainWorkspace();
    }
    var code = [];
    this.init(workspace);
    var blocks = workspace.getTopBlocks(true);
    for (var x = 0, block; block = blocks[x]; x++) {
        var line = this.blockToCode(block);
        if (goog.isArray(line)) {
            // Value blocks return tuples of code and operator order.
            // Top-level blocks don't care about operator order.
            line = line[0];
        }
        if (line) {
            if (block.outputConnection) {
                // This block is a naked value.  Ask the language's code generator if
                // it wants to append a semicolon, or something.
                line = this.scrubNakedValue(line);
            }
            code.push(line);
        }
    }
    code = code.join('\n');  // Blank line between each section.
    code = this.finish(code);
    // Final scrubbing of whitespace.
    code = code.replace(/^\s+\n/, '');
    code = code.replace(/\n\s+$/, '\n');
    code = code.replace(/[ \t]+\n/g, '\n');
    return code;
};

Blockly.ST.finish = function (code) {
    if (code) {
        code = Blockly.ST.prefixLines(code, Blockly.ST.INDENT);
    }
    // Clean up temporary data.
    delete Blockly.ST.definitions_;
    delete Blockly.ST.functionNames_;
    //Blockly.getMainWorkspace().getVariableMap().clear();
    return code;
};

Blockly.ST.variablesToCode = function (workspace) {
    var variables = Blockly.Variables.allUsedVarModels(workspace);
    var variablesCode = [];
    if (variables.length > 0) {
        variables.forEach((e) => {
            variablesCode.push(Blockly.ST.variableToCode(e));
        });
    }
    return variablesCode.join("\n\t");
};

Blockly.ST.variableToCode = function (variable) {
    var code = variable.name;
    if (variable.address !== '') {
        code += " AT " + variable.address;
    }
    code += " : " + variable.type;
    if (variable.initValue !== '') {
        code += " := " + variable.initValue;
    }
    code += ";";
    return code;
};

Blockly.ST.functionBlocksToCode = function (workspace) {
    var code = [];
    var functionBlocks = Blockly.FunctionBlocks.allFunctionBlocks(workspace);
    functionBlocks.forEach((block) => {
        code.push(block.name + " : " + block.type + ";");
    });
    return code.join("\n\t");
};

/**
 *
 * @param {Editor.Project} project
 * @returns {string}
 */
Blockly.ST.projectToCode = function (project) {
    console.log("----------------------------------------");
    var completeCode = '(* Auto generated *)\n';
    completeCode += `(* Project: ${project.name} *)\n`;
    var compiled = [];
    for (var funcBlock of project.getAllFunctionBlocks(true)) {
        // skip over already compiled function blocks
        if (compiled[funcBlock.name]) {
            continue;
        }
        // compile the working item
        completeCode += Blockly.ST.functionBlockToCode(funcBlock, project, compiled) + "\n\n";
        compiled[funcBlock.name] = true;
    }

    for (var func of project.getAllFunctions(true)) {
        // skip over already compiled functions
        if (compiled[func.name]) {
            continue;
        }

        //compile the actual item
        completeCode += Blockly.ST.functionToCode(func, project, compiled) + "\n\n";
        compiled[func.name] = true;
    }

    for (var program of project.programs_) {
        completeCode += Blockly.ST.programToCode(program) + "\n\n";
    }

    completeCode += Blockly.ST.configurationToCode(project.configuration);
    console.log("----------------------------------------");
    return completeCode;
};

Blockly.ST.functionToCode = function (func, project, compiledList) {
    var completeCode = '';
    console.log('started compiling function: ' + func.name);
    let ws = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(func.workspace, ws);
    let allDependencies = Blockly.ST.getAllBlocksOfTypes(ws, ['procedures_callnoreturn', 'procedures_callreturn']);
    for (let block of allDependencies) {
        let name = block.getFieldValue('NAME');
        // skip already compiled dependencies
        if (compiledList[name]) {
            console.log(`dependency ${name} already compiled, skipping`);
            continue;
        }
        console.log('found dependency ' + name);
        let dependencyFunc = project.getFunctionByName(name);
        let def = project.getFunctionDef(dependencyFunc, true);

        //compile the dependency before the actual item
        completeCode += this.functionToCode(def, project, compiledList) + "\n";
        compiledList[def.name] = true;
        console.log(`dependency ${name} compiled!`);
    }

    //compile the actual item
    completeCode += Blockly.ST.functionToCode_(func) + "\n\n";
    compiledList[func.name] = true;
    console.log('finished compiling function: ' + func.name);
    return completeCode;
};

Blockly.ST.functionBlockToCode = function (funcBlock, project, compiledList) {
    var completeCode = '';
    console.log('started compiling function block: ' + funcBlock.name);
    let ws = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(funcBlock.workspace, ws);

    // get all function calls, function blocks
    let allDependencies = Blockly.ST.getAllBlocksOfTypes(ws, ['procedures_callnoreturn', 'procedures_callreturn', 'function_block_call']);
    for (let block of allDependencies) {
        let type = block.type;
        let name = block.getFieldValue('NAME');
        if (compiledList[name]) {
            console.log(`dependency ${name} already compiled, skipping`);
            // already compiled, skip it
            continue;
        }
        console.log('found dependency ' + name);
        if (type === 'function_block_call') {
            // function block dependency
            let block = project.getFunctionBlockByName(name);
            let def = project.getFunctionBlockDef(block, true);

            // compile the dependency before the actual item
            completeCode += "\n" + this.functionBlockToCode(def, project, compiledList) + "\n\n";
            compiledList[def.name] = true;
            console.log(`dependency ${name} compiled!`);
        }
        else if (type === 'procedures_callnoreturn' || type === 'procedures_callreturn') {
            // function dependency
            let func = project.getFunctionByName(name);
            let def = project.getFunctionDef(func, true);

            // compile the dependency before the actual item
            completeCode += "\n" + this.functionToCode(def, project, compiledList) + "\n\n";
            compiledList[def.name] = true;
            console.log(`dependency ${name} compiled!`);
        }
    }
    completeCode += Blockly.ST.functionBlockToCode_(funcBlock) + "\n\n";
    compiledList[funcBlock.name] = true;
    console.log('finished compiling function block: ' + funcBlock.name);
    return completeCode;
};

/**
 *
 * @param  program
 * @returns {string}
 */
Blockly.ST.programToCode = function (program) {
    let ws = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(program.getWorkspaceDom(), ws);

    var code = this.workspaceToCode(ws);
    var variables = this.variablesToCode(ws);
    var functionBlocks = this.functionBlocksToCode(ws);

    code = "VAR\n\t" + variables + "\n\t" + functionBlocks + "\nEND_VAR\n" + code;
    code = 'PROGRAM ' + program.name + '\n' + code + '\nEND_PROGRAM';
    return code;

};

/**
 *
 * @param  func
 * @returns {string}
 */
Blockly.ST.functionToCode_ = function (func) {
    var code = 'FUNCTION ' + func.name + " : " + func.return_type + "\n";
    if (func.args.length > 0) {
        code += "VAR_INPUT\n";
        for (var input of func.args.fiter(i => i.is_reference === false)) {
            code += "\t" + Blockly.ST.variableToCode(input.variable);
        }
        code += "END_VAR\n";
    }

    let references = func.args.filter(i => i.is_reference === true);
    if (references.length > 0) {
        code += "VAR_IN_OUT\n";
        for (var ref of references) {
            code += "\t" + Blockly.ST.variableToCode(ref.variable);
        }
        code += "END_VAR\n";
    }

    let ws = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(func.workspace, ws);
    code += Blockly.ST.workspaceToCode(ws) + "\n";
    code += "END_FUNCTION\n";
    return code;
};

/**
 *
 * @param  funcBlock
 * @returns {string}
 */
Blockly.ST.functionBlockToCode_ = function (funcBlock) {
    var code = 'FUNCTION_BLOCK ' + funcBlock.name + "\n";
    if (funcBlock.inputs.length > 0) {
        code += "VAR_INPUT\n";
        for (var input of funcBlock.inputs) {
            code += "\t" + Blockly.ST.variableToCode(input.variable) + "\n";
        }
        code += "END_VAR\n";
    }

    if (funcBlock.outputs.length > 0) {
        code += "VAR_OUTPUT\n";
        for (var output of funcBlock.outputs) {
            code += "\t" + Blockly.ST.variableToCode(output) + "\n";
        }
        code += "END_VAR\n";
    }

    let ws = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(funcBlock.workspace, ws);

    code += Blockly.ST.workspaceToCode(ws);

    code += "END_FUNCTION_BLOCK";
    return code;
};

Blockly.ST.configurationToCode = function (configuration) {
    var config = "\nCONFIGURATION Config0\n" +
        "\tRESOURCE Res0 ON PLC\n";
    let ws = new Blockly.Workspace();
    for (let task of configuration.getAllTasks()) {
        ws.clear();
        Blockly.Xml.domToWorkspace(task.getWorkspaceDom(), ws);
        config += Blockly.ST.workspaceToCode(ws);
    }
    config += "\tEND_RESOURCE\n" +
        "END_CONFIGURATION";

    return config;
};

Blockly.ST.fullOutput = function (workspace) {
    var code = this.workspaceToCode(workspace);
    var variables = this.variablesToCode(workspace);
    var functionBlocks = this.functionBlocksToCode(workspace);

    code = "VAR\n\t" + variables + "\n\t" + functionBlocks + "\nEND_VAR;\n" + code;

    code = 'PROGRAM MAIN_PRG\n' + code + '\nEND_PROGRAM';

    code += this.generateConfiguration();

    return code;
};

Blockly.ST.generateConfiguration = function () {
    var config = "\nCONFIGURATION Config0\n" +
        "\tRESOURCE Res0 ON PLC\n" +
        "\t\tTASK TaskMain(INTERVAL := T#50ms, PRIORITY := 0);\n" +
        "\t\tPROGRAM Inst0 WITH TaskMain : MAIN_PRG;\n" +
        "\tEND_RESOURCE\n" +
        "END_CONFIGURATION";

    return config;
};

Blockly.ST.scrubNakedValue = function (line) {
    return line + ";\n";
};

Blockly.ST.quote_ = function (string) {
    // Can't use goog.string.quote since $ must also be escaped.
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n')
        .replace(/\$/g, '\\$')
        .replace(/'/g, '\\\'');
    return '\'' + string + '\'';
};

Blockly.ST.scrub_ = function (block, code) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        comment = Blockly.utils.wrap(comment, Blockly.ST.COMMENT_WRAP - 3);
        if (comment) {
            commentCode += Blockly.ST.prefixLines(comment, '(* ');
            commentCode = commentCode + ' *)\n';
            /*if (block.getProcedureDef) {
                // Use documentation comment for function comments.
                commentCode += Blockly.ST.prefixLines(comment, '{ ');
                commentCode = commentCode+' }';
            } else {
                commentCode += Blockly.ST.prefixLines(comment, '(* ');
                commentCode = commentCode + ' *)';
            }
            */
        }

        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type === Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.ST.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.ST.prefixLines(comment, '// ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = Blockly.ST.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

Blockly.ST.getAllBlocksOfTypes = function (workspace, types) {
    var blocks = [];
    for (var block of workspace.getAllBlocks(true)) {
        if (types.includes(block.type)) {
            blocks.push(block);
        }
    }
    return blocks;
};




