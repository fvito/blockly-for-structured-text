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
Blockly.ST.STRING_TYPE = 'STRING';

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

Blockly.ST.finish = function (code) {
    if (code) {
        code = Blockly.ST.prefixLines(code, Blockly.ST.INDENT);
    }
    //Replace with Structured text version
    code = 'PROGRAM\n' + code + '\nEND_PROGRAM;';
    return code;
};

Blockly.ST.scrubNakedValue = function (line) {
    return line + ";\n";
};




