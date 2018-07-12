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
        'MOD': [' MOD ', Blockly.ST.ORDER_NONE]
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

Blockly.ST['math_single'] = function (block) {
    var operator = block.getFieldValue('OP');
    var arg = Blockly.ST.valueToCode(block, 'NUM',
        Blockly.ST.ORDER_NONE) || '0';
    var code = operator + "(" + arg + ")";
    return [code, Blockly.ST.ORDER_FUNCTION_CALL];
};

Blockly.ST['math_trig'] = Blockly.ST['math_single'];

Blockly.ST['math_constrain'] = function (block) {
    var valueIn = Blockly.ST.valueToCode(block, "VALUE", Blockly.ST.ORDER_ATOMIC);
    var valueMax = Blockly.ST.valueToCode(block, "HIGH", Blockly.ST.ORDER_ATOMIC);
    var valueMin = Blockly.ST.valueToCode(block, "LOW", Blockly.ST.ORDER_ATOMIC);

    var code = "LIMIT(IN:=" + valueIn + ",MN:=" + valueMin + ",MX:=" + valueMax + ")";
    return [code, Blockly.ST.ORDER_NONE];
};

Blockly.ST['math_max'] = function (block) {
    // Create a list with any number of elements of any type.
    var elements = [];
    var i = 1;
    while (block.getInput('IN'+i)){
        elements.push(Blockly.ST.valueToCode(block, 'IN'+i, Blockly.ST.ORDER_NONE));
        i++;
    }
    var code = 'MAX(' + elements.join(', ') + ')';
    return [code, Blockly.ST.ORDER_ATOMIC];
};

Blockly.ST['math_min'] = function (block) {
    // Create a list with any number of elements of any type.
    var elements = [];
    var i = 1;
    while (block.getInput('IN'+i)){
        elements.push(Blockly.ST.valueToCode(block, 'IN'+i, Blockly.ST.ORDER_NONE));
        i++;
    }
    var code = 'MIN(' + elements.join(', ') + ')';
    return [code, Blockly.ST.ORDER_ATOMIC];
};


Blockly.ST['math_change'] = function (block) {
    // Add to a variable in place.
    var argument0 = Blockly.ST.valueToCode(block, 'DELTA',
        Blockly.ST.ORDER_ADDITION) || '0';
    var varName = Blockly.ST.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return varName + ' := ' + varName + " + " + argument0 + ';\n';
};

Blockly.ST['math_constant'] = function (block) {
    var CONSTANTS = {
        'PI': '3.1415926535',
        'E': '2.7182818284',
        'GOLDEN_RATIO': '1.6180339887',
        'SQRT2': '1.4142135623',
        'SQRT1_2': '0.7071067811'
    };
    var selected = block.getFieldValue('CONSTANT');
    return [CONSTANTS[selected], Blockly.ST.ORDER_ATOMIC];
};

Blockly.ST['math_number_property'] = function (block) {
    var number_to_check = Blockly.ST.valueToCode(block, 'NUMBER_TO_CHECK', Blockly.ST.ORDER_MULTIPLICATIVE) || '0';
    var property = block.getFieldValue('PROPERTY');
    var code;
    switch (property) {
        case 'EVEN':
            code = number_to_check + ' MOD 2 = 0';
            break;
        case 'ODD':
            code = number_to_check + ' MOD 2 = 1';
            break;
        case 'WHOLE':
            code = number_to_check + ' MOd 1 = 0';
            break;
        case 'POSITIVE':
            code = number_to_check + ' > 0';
            break;
        case 'NEGATIVE':
            code = number_to_check + ' < 0';
            break;
        case 'DIVISIBLE_BY':
            var divisor = Blockly.ST.valueToCode(block, 'DIVISOR', Blockly.ST.ORDER_MULTIPLICATIVE);
            if (!divisor || divisor === '0') {
                return ['error', Blockly.ST.ORDER_ATOMIC];
            }
            code = number_to_check + ' % ' + divisor + ' = 0';
            break;
    }
    return [code, Blockly.ST.ORDER_NONE];
};

Blockly.ST['math_modulo'] = function (block) {
    var dividend = Blockly.ST.valueToCode(block, 'DIVIDEND', Blockly.ST.ORDER_ATOMIC) || '0';
    var divisor = Blockly.ST.valueToCode(block, 'DIVISOR', Blockly.ST.ORDER_ATOMIC) || '0';

    var code = dividend + ' MOD ' + divisor;
    return [code, Blockly.ST.ORDER_NONE];
};
Blockly.ST['math_mux'] = function (block) {
    var input = Blockly.ST.valueToCode(block, "INPUT", Blockly.ST.ORDER_NONE);
    var elements = [];
    var i = 1;
    while (block.getInput('IN'+i)){
        elements.push(Blockly.ST.valueToCode(block, 'IN'+i, Blockly.ST.ORDER_NONE));
        i++;
    }
    var code = 'MUX(K:'+ input + ", " + elements.join(', ') + ')';
    return [code, Blockly.ST.ORDER_ATOMIC];
};

