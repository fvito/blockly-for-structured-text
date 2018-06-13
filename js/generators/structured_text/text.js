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
    var operator = block.getFieldValue('END') == 'FIRST' ?
        'FIND' : '';
    var substring = Blockly.ST.valueToCode(block, 'FIND',
        Blockly.ST.ORDER_NONE) || '\'\'';
    var text = Blockly.ST.valueToCode(block, 'VALUE',
        Blockly.ST.ORDER_NONE) || '\'\'';
    var code = operator + '('+ text + "," + substring + ')';
    return [code, Blockly.ST.ORDER_FUNCTION_CALL];
};

Blockly.ST['text_charAt'] = function(block) {
    var where = block.getFieldValue('WHERE') || 'FROM_START';
    var text = Blockly.ST.valueToCode(block, 'VALUE',
        Blockly.ST.ORDER_NONE) || '\'\'';
    switch (where){
        case 'FROM_START':
            var at = Blockly.ST.valueToCode(block, 'AT',
                Blockly.ST.ORDER_NONE) || '0';
            var code = text+'['+at+']';
            return [code, Blockly.ST.ORDER_FUNCTION_CALL];
            break;
        case 'FIRST':
            var code = text+'[0]';
            return [code, Blockly.ST.ORDER_ATOMIC];
            break;
        case 'LAST':
            var code = text+'[' + 'LEN('+ text +') - 1'+']';
            return [code, Blockly.ST.ORDER_ATOMIC];
            break;
    }
    throw 'Unhandled option (text_charAt).';
};

Blockly.ST['text_getSubstring'] = function (block) {
    return "substring";
};

Blockly.ST['text_replace'] = function(block){
    return 'replace';
};

Blockly.ST['text_delete'] = function(block){
    return 'delete';
};

Blockly.ST['text_insert'] = function(block){

};

Blockly.ST['text_changeCase'] = function (block) {
    return "change case";
};

Blockly.ST['text_trim'] = function (block) {
    return "trim";
};