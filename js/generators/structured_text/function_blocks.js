'use strict';

goog.provide('Blockly.ST.function_blocks');

goog.require('Blockly.ST');

Blockly.ST['function_block_ton'] = function (block) {
    var name = block.getFieldValue('NAME');
    var enabled = Blockly.ST.valueToCode(block, "EN", Blockly.ST.ORDER_NONE) || 'FALSE';
    var time = Blockly.ST.valueToCode(block, "PT", Blockly.ST.ORDER_NONE) || 'TIME#0s';
    return name+"(IN:="+enabled+", PT:="+time+");\n";
};
Blockly.ST['function_block_tof'] = Blockly.ST['function_block_ton'];
Blockly.ST['function_block_tp'] = Blockly.ST['function_block_ton'];

Blockly.ST['function_block_sr'] = function (block) {
    var name = block.getFieldValue('NAME');
    var set = Blockly.ST.valueToCode(block, 'SET', Blockly.ST.ORDER_NONE) || 'FALSE';
    var reset = Blockly.ST.valueToCode(block, 'RESET', Blockly.ST.ORDER_NONE) || 'FALSE';
    return  name+"(SET1:="+set+" ,RESET:="+reset+");\n";
};
Blockly.ST['function_block_rs'] = function (block) {
    var name = block.getFieldValue('NAME');
    var set = Blockly.ST.valueToCode(block, 'SET', Blockly.ST.ORDER_NONE) || 'FALSE';
    var reset = Blockly.ST.valueToCode(block, 'RESET', Blockly.ST.ORDER_NONE) || 'FALSE';
    return  name+"(SET:="+set+" ,RESET1:="+reset+");\n";
};

Blockly.ST['function_block_ctu'] = function (block) {
    var name = block.getFieldValue('NAME');
    var cu = Blockly.ST.valueToCode(block, 'CU', Blockly.ST.ORDER_NONE) || 'FALSE';
    var reset = Blockly.ST.valueToCode(block, 'RESET', Blockly.ST.ORDER_NONE) || 'FALSE';
    var pv = Blockly.ST.valueToCode(block, 'PV', Blockly.ST.ORDER_NONE) || '0';

    return name+"(CU:="+cu+" ,RESET:="+reset+" ,PV:="+pv+");\n";
};
Blockly.ST['function_block_ctd'] = function (block) {
    var name = block.getFieldValue('NAME');
    var cd = Blockly.ST.valueToCode(block, 'CD', Blockly.ST.ORDER_NONE) || 'FALSE';
    var load = Blockly.ST.valueToCode(block, 'LOAD', Blockly.ST.ORDER_NONE) || 'FALSE';
    var pv = Blockly.ST.valueToCode(block, 'PV', Blockly.ST.ORDER_NONE) || '0';

    return name+"(CD:="+cd+" ,LOAD:="+load+" ,PV:="+pv+");\n";
};
Blockly.ST['function_block_ctud'] = function (block) {
    var name = block.getFieldValue('NAME');
    var cu = Blockly.ST.valueToCode(block, 'CU', Blockly.ST.ORDER_NONE) || 'FALSE';
    var reset = Blockly.ST.valueToCode(block, 'RESET', Blockly.ST.ORDER_NONE) || 'FALSE';
    var cd = Blockly.ST.valueToCode(block, 'CD', Blockly.ST.ORDER_NONE) || 'FALSE';
    var load = Blockly.ST.valueToCode(block, 'LOAD', Blockly.ST.ORDER_NONE) || 'FALSE';
    var pv = Blockly.ST.valueToCode(block, 'PV', Blockly.ST.ORDER_NONE) || '0';
    return name+"(CU:="+cu+" ,CD:="+cd+" ,RESET:="+reset+" ,LOAD:="+load+" ,PV:="+pv+");\n";
};
Blockly.ST['function_block_f_trig'] = function (block) {
    var name = block.getFieldValue('NAME');
    var clk = Blockly.ST.valueToCode(block, 'CLK', Blockly.ST.ORDER_NONE) || 'FALSE';
    return name+"(CLK:="+clk+");\n";
};
Blockly.ST['function_block_r_trig'] = Blockly.ST['function_block_f_trig'];

Blockly.ST['function_block_rtc'] = function (block) {
    var name = block.getFieldValue('NAME');
    var en = Blockly.ST.valueToCode(block, 'EN', Blockly.ST.ORDER_NONE) || 'FALSE';
    var pdt = Blockly.ST.valueToCode(block, 'PDT', Blockly.ST.ORDER_NONE) || '0';
    return name+"(EN:="+en+" ,PDT:="+pdt+");\n";
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

Blockly.ST['function_block_def'] = function (block) {
    var branch = Blockly.ST.statementToCode(block, 'STACK');
    return branch;
};

Blockly.ST['function_block_call'] = function (block) {
    var name = block.getFieldValue('NAME');
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        var argument = block.arguments_[i].name + ":=" + Blockly.ST.valueToCode(block, 'ARG' + i, Blockly.ST.ORDER_ATOMIC) || 'null';
        args.push(argument);
    }
    var code = name + "(" + args.join(" ,") + ");\n";
    return code;
};
