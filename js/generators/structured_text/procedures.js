'use strict';

goog.provide('Blockly.ST.procedures');

goog.require('Blockly.ST');

Blockly.ST['procedures_program'] = function (block) {
  //var name = block.getFieldValue("NAME");
  var statements = Blockly.ST.statementToCode(block, 'STATEMENTS');
  //return "PROGRAM " + name + '\n' + statements + '\nEND_PROGRAM;';
    return statements;
};


/*Blockly.ST['procedures_defreturn'] = function(block) {
    // Define a procedure with a return value.
    var funcName = Blockly.ST.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.ST.statementToCode(block, 'STACK');
    if (Blockly.ST.STATEMENT_PREFIX) {
        var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
        branch = Blockly.ST.prefixLines(
            Blockly.ST.STATEMENT_PREFIX.replace(/%1/g,
                '\'' + id + '\''), Blockly.ST.INDENT) + branch;
    }
    if (Blockly.ST.INFINITE_LOOP_TRAP) {
        branch = Blockly.ST.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + block.id + '\'') + branch;
    }
    var returnValue = Blockly.ST.valueToCode(block, 'RETURN',
        Blockly.ST.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = Blockly.ST.INDENT + 'return ' + returnValue + ';\n';
    }
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.ST.variableDB_.getName(block.arguments_[i],
            Blockly.Variables.NAME_TYPE);
    }
    var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
        branch + returnValue + '}';
    code = Blockly.ST.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    Blockly.ST.definitions_['%' + funcName] = code;
    return null;
};*/


Blockly.ST['procedures_defreturn'] = function(block){
    var branch = Blockly.ST.statementToCode(block, 'STACK');
    return branch;
};

Blockly.ST['procedures_defnoreturn'] =
    Blockly.ST['procedures_defreturn'];
