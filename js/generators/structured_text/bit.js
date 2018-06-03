goog.provide('Blockly.ST.bit');

goog.require('Blockly.ST');

Blockly.ST['bit_shift'] = function(block) {
    var FUNCTIONS = {
        'LEFT': 'SHL',
        'RIGHT': 'SHR',
        'ROT_RIGHT': 'ROR',
        'ROT_LEFT': 'ROL'
    };

    var func = FUNCTIONS[block.getFieldValue('DIR')];
    var value_in = Blockly.ST.valueToCode(block, 'IN', Blockly.ST.ORDER_ATOMIC) || '0';
    var value_bits = Blockly.ST.valueToCode(block, 'BITS', Blockly.ST.ORDER_ATOMIC) || '0';


    // TODO: Assemble JavaScript into code variable.
    var code = func + "(IN:="+value_in+", "+"N:="+value_bits+")";
    return code;
};