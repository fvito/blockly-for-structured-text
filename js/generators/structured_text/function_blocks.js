'use strict';

goog.provide('Blockly.ST.function_blocks');

goog.require('Blockly.ST');

Blockly.ST['function_block_ton'] = function (block) {
    var name = block.getFieldValue('NAME');
    var enabled = Blockly.ST.valueToCode(block, "EN", Blockly.ST.ORDER_NONE) || 'FALSE';
    var time = Blockly.ST.valueToCode(block, "PT", Blockly.ST.ORDER_NONE) || 'TIME#0s';
    return name+"(EN:="+enabled+", PT:="+time+")";
};

Blockly.ST['function_block_tof'] = function (block) {
    return 'TOF';
};

Blockly.ST['function_block_tp'] = function (block) {
    return 'TP';
};
Blockly.ST['function_block_sr'] = function (block) {
    return 'SR';
};
Blockly.ST['function_block_rs'] = function (block) {
    return 'RS';
};
Blockly.ST['function_block_ctu'] = function (block) {
    return 'CTU';
};
Blockly.ST['function_block_ctd'] = function (block) {
    return 'CTD';
};
Blockly.ST['function_block_ctud'] = function (block) {
    return 'CTUD';
};
Blockly.ST['function_block_f_trig'] = function (block) {
    return 'F_TRIG';
};
Blockly.ST['function_block_r_trig'] = function (block) {
    return 'R_TRIG';
};
Blockly.ST['function_block_rtc'] = function (block) {
    return 'RTC';
};

Blockly.ST['function_block_get'] = function (block) {
    var name = block.getFieldValue('NAME');
    var member = block.getFieldValue('MEM');

    return [name+"."+member, Blockly.ST.ORDER_NONE];
};

Blockly.ST['function_block_set'] = function (block) {
    var name = block.getFieldValue('NAME');
    var member = block.getFieldValue('MEM');

    var value = Blockly.ST.valueToCode(block, 'VALUE', Blockly.ST.ORDER_NONE);

    return name+"."+member+":="+value;
};
