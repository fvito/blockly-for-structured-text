goog.provide('Blockly.ST.text');

goog.require('Blockly.ST');

Blockly.ST['text'] = function (block) {
    // Text value.
    var code = Blockly.ST.quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.ST.ORDER_ATOMIC];
};

Blockly.ST['text_join'] = function (block) {
    var code = "CONCAT(";
    var i = 0;
    do{
        code+=Blockly.ST.valueToCode(block, "ADD"+i, Blockly.ST.ORDER_ATOMIC)+",";
        i++;
    }while (block.getInput("ADD"+i));
    if(code.endsWith(",")){
        code = code.substr(0, code.length - 1);
    }
    code += ")";
    return [code, Blockly.ST.ORDER_FUNCTION_CALL];
};

Blockly.ST['text_append'] = function (block) {
    var original = block.getField("VAR").getText();
    var appended = Blockly.ST.valueToCode(block, "TEXT", Blockly.ST.ORDER_ATOMIC);
    var code = original+" := "+"CONCAT("+original+","+appended+");";
    return code;
};

Blockly.ST['text_prepend'] = function(block){
    var original = block.getField("VAR").getText();
    var appended = Blockly.ST.valueToCode(block, "TEXT", Blockly.ST.ORDER_ATOMIC);
    var code = original+" := "+"CONCAT("+appended+","+original+");";
    return code;
};

Blockly.ST['text_length'] = function (block) {
    var code = "LEN("+Blockly.ST.valueToCode(block, "VALUE", Blockly.ST.ORDER_ATOMIC)+")";
    return [code, Blockly.ST.ORDER_FUNCTION_CALL];
};

Blockly.ST['text_isEmpty'] = function (block) {
    return "empty";
};

Blockly.ST['text_indexOf'] = function (block) {
    return "find";
};

Blockly.ST['text_getSubstring'] = function (block) {
    return "substring";
};

Blockly.ST['text_changeCase'] = function (block) {
    return "change case";
};

Blockly.ST['text_trim'] = function (block) {
    return "trim";
};