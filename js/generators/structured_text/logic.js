'use strict';

goog.provide('Blockly.ST.logic');

goog.require('Blockly.ST');

Blockly.ST['controls_if'] = function (block) {

    var n = 0;
    var code = '', conditionCode, branchCode;
    do {
        conditionCode = Blockly.ST.valueToCode(block, 'IF' + n,
            Blockly.ST.ORDER_NONE) || 'FALSE';
        branchCode = Blockly.ST.statementToCode(block, 'DO' + n);
        code += (n > 0 ? 'ELSE' : '') +
            'IF ' + conditionCode + ' THEN\n\t' + branchCode + '\n';

        ++n;
    } while (block.getInput('IF' + n));

    if (block.getInput("ELSE")) {
        branchCode = Blockly.ST.statementToCode(block, 'ELSE');
        code += "ELSE\n\t" + branchCode + "\n";
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
    var operator = block.getFieldValue('OP');
    var order;
    if (operator === "AND") {
        order = Blockly.ST.ORDER_BITWISE_AND;
    } else if (operator === "OR") {
        order = Blockly.ST.ORDER_BITWISE_OR;
    }
    var argument0 = Blockly.ST.valueToCode(block, 'A', order);
    var argument1 = Blockly.ST.valueToCode(block, 'B', order);

    var code = argument0 + " " + operator + " " + argument1;
    return[code, order];
};