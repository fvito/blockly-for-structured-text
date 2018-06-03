'use strict';

goog.provide('Blockly.ST.math');

goog.require('Blockly.ST');

Blockly.ST['math_number'] = function (block) {
    var code = parseFloat(block.getFieldValue('NUM'));
    return [code, Blockly.ST.ORDER_ATOMIC];
};

Blockly.ST['math_arithmetic'] = function (block) {
    var OPERATORS = {
        'ADD': [' + ', Blockly.ST.ORDER_ADDITION],
        'MINUS': [' - ', Blockly.ST.ORDER_ADDITION],
        'MULTIPLY': [' * ', Blockly.ST.ORDER_MULTIPLICATIVE],
        'DIVIDE': [' / ', Blockly.ST.ORDER_MULTIPLICATIVE],
        'POWER': [' ** ', Blockly.ST.ORDER_MULTIPLICATIVE],
        'MOD': [' modulo ', Blockly.ST.ORDER_NONE]
    };
    var tuple = OPERATORS[block.getFieldValue('OP')];
    var operator = tuple[0];
    var order = tuple[1];

    var argument0 = Blockly.ST.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.ST.valueToCode(block, 'B', order) || '0';

    var code;
    code = argument0 + operator + argument1;
    return [code, order];
};