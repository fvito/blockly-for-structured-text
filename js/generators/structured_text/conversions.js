goog.provide('Blockly.ST.conversions');

goog.require('Blockly.ST');

Blockly.ST['conversion_general'] = function (block) {
    console.log(block.getInput("INPUT").connection.targetBlock());
    var input = Blockly.ST.valueToCode(block, "INPUT", Blockly.ST.ORDER_NONE);
    var inputType = block.getFieldValue("IN_TYPE");
    var outputType = block.getFieldValue("OUT_TYPE");
    //Time and date special case
    var code = inputType+"_TO_"+outputType+"("+input+")";
    return code;
};

Blockly.ST['conversion_trunc'] = function (block) {
    var input = Blockly.ST.valueToCode(block, "INPUT", Blockly.ST.ORDER_NONE);
    var code = "TRUNC("+input+")";
    return code;
};

Blockly.ST['conversion_to_bcd'] = function (block) {
    var input = Blockly.ST.valueToCode(block, "INPUT", Blockly.ST.ORDER_NONE);
    var type = block.getFieldValue("TYPE");
    var code = type+"_TO_BCD("+input+")";
    return code;
};

Blockly.ST['conversion_from_bcd'] = function (block) {
    var input = Blockly.ST.valueToCode(block, "INPUT", Blockly.ST.ORDER_NONE);
    var type = block.getFieldValue("TYPE");
    var code = "BCD_TO_"+type+"("+input+")";
    return code;
};