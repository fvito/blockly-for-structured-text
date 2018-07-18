'use strict';

goog.provide('Blockly.ST.function_blocks');

goog.require('Blockly.ST');

Blockly.ST['function_block_ton'] = function (block) {
    var name = block.getFieldValue('NAME');
    var enabled = Blockly.ST.valueToCode(block, "EN", Blockly.ST.ORDER_NONE) || 'FALSE';
    var time = Blockly.ST.valueToCode(block, "PT", Blockly.ST.ORDER_NONE) || 'TIME#0s';
    return name+"(EN:="+enabled+", PT:="+time+")";
};