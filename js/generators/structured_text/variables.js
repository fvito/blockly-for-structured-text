'use strict';

goog.provide('Blockly.ST.variables');

goog.require('Blockly.ST');


Blockly.ST['variables_get'] = function(block) {
    // Variable getter.
    var code = Blockly.ST.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return [code, Blockly.ST.ORDER_ATOMIC];
};

Blockly.ST['variables_set'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.ST.valueToCode(block, 'VALUE',
        Blockly.ST.ORDER_NONE) || '0';
    var varName = Blockly.ST.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return varName + ' := ' + argument0 + ';\n';
};