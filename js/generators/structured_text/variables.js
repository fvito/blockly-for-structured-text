'use strict';

goog.provide('Blockly.ST.variables');

goog.require('Blockly.ST');


Blockly.ST['variables_get'] = function (block) {
    // Variable getter.
    var code = Blockly.ST.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return [code, Blockly.ST.ORDER_ATOMIC];
};

Blockly.ST['variables_set'] = function (block) {
    // Variable setter.
    var argument0 = Blockly.ST.valueToCode(block, 'VALUE',
        Blockly.ST.ORDER_NONE) || '0';
    var varName = Blockly.ST.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return varName + ' := ' + argument0 + ';\n';
};

Blockly.ST['variables_local'] = function (block) {
    var variables = Blockly.ST.statementToCode(block, "VARIABLES");
    var code = "VAR\n" + variables + "\nEND_VAR;\n";
    return code;
};

Blockly.ST['variables_global'] = function (block) {
    var variables = Blockly.ST.statementToCode(block, "VARIABLES");
    var code = "VAR_GLOBAL\n" + variables + "\nEND_VAR;\n";
    return code;
};

Blockly.ST['variables_declare'] = function (block) {
    var varName = Blockly.ST.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var varType = block.getFieldValue('TYPE');
    var initValue = Blockly.ST.valueToCode(block, "VALUE", Blockly.ST.ORDER_NONE) || '';
    var code = varName + ":" + varType;
    if (initValue !== '') {
        code +=" := " + initValue;
    }
    //Blockly.getMainWorkspace().createVariable(varName, varType);
    return code+"\n";
};