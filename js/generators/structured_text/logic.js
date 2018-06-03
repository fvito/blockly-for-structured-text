'use strict';

goog.provide('Blockly.ST.logic');

goog.require('Blockly.ST');

Blockly.ST['controls_if'] = function (block) {

    var n = 0;
    var code = 'IF', conditionCode, brachCode;
    conditionCode = Blockly.ST.valueToCode(block, 'IF' + n,
        Blockly.ST.ORDER_NONE) || 'FALSE';
    brachCode = Blockly.ST.statementToCode(block, "DO" + n);
    code += " " + conditionCode + " THEN\n\t" + brachCode + "\n";


    if (block.getInput("ELSE")) {
        console.log("Else");
        code += "ELSE\n\t-code-\n";
    }
    return code + "END_IF";
};

Blockly.ST['controls_ifelse'] = function (block) {
    return "ELSE IF\n";
};

Blockly.ST['logic_compare'] = function (block) {
    var OPERATORS = {
        'EQ': '==',
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
    };
    var operator = OPERATORS[block.getFieldValue('OP')];
    var order = (operator === '==' || operator === '!=') ?
        Blockly.ST.ORDER_EQUALITY : Blockly.ST.ORDER_RELATIONAL;
    var argument0 = Blockly.ST.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.ST.valueToCode(block, 'B', order) || '0';

    var code = argument0 + " " + operator + " " + argument1;
    return [code, order];
};

Blockly.ST['logic_boolean'] = function (block) {
    var code = (block.getFieldValue('BOOL') === 'TRUE') ? 'TRUE' : 'FALSE';
    return [code, Blockly.ST.ORDER_ATOMIC];
};

Blockly.ST['logic_operation'] = function (block) {
    var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
    var order;
    if (operator === "&&") {
        order = Blockly.ST.ORDER_BITWISE_AND;
    } else if (operator === "||") {
        order = Blockly.ST.ORDER_BITWISE_OR;
    } else if (operator === "")
        var argument0 = Blockly.Dart.valueToCode(block, 'A', order);
    var argument1 = Blockly.Dart.valueToCode(block, 'B', order);
};