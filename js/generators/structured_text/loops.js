goog.provide('Blockly.ST.loops');

goog.require('Blockly.ST');

Blockly.ST['controls_repeat_ext'] = function (block) {
    // Repeat n times.
    if (block.getField('TIMES')) {
        // Internal number.
        var repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
        // External number.
        var repeats = Blockly.ST.valueToCode(block, 'TIMES',
            Blockly.ST.ORDER_NONE) || '0';
    }

    var branch = Blockly.ST.statementToCode(block, 'DO');
    branch = Blockly.ST.addLoopTrap(branch, block.id);
    var code = '';
    var loopVar = block.getField('VAR').getText();
    //var loopVar = Blockly.Variables.getOrCreateVariablePackage(block.workspace, null, 'count', 'INT');
    var endVar = repeats;
    if (!String(repeats).match(/^\w+$/) && !Blockly.isNumber(repeats)) {
        var endVar = Blockly.ST.variableDB_.getDistinctName(
            'REPEAT_END', Blockly.Variables.NAME_TYPE);
        code += endVar + ':=' + repeats + ';\n';
    }
    code += 'FOR ' + loopVar + ' :=0 TO ' + endVar + ' DO\n' +
        branch + '\n' +
        "END_FOR";
    return code;
};

Blockly.ST['controls_whileUntil'] = function (block) {
    var until = block.getFieldValue('MODE') === 'UNTIL';
    var argument0 = Blockly.ST.valueToCode(block, 'BOOL',
        until ? Blockly.ST.ORDER_NONE :
            Blockly.ST.ORDER_NONE) || 'FALSE';
    var branch = Blockly.ST.statementToCode(block, 'DO');
    branch = Blockly.ST.addLoopTrap(branch, block.id);
    if (until) {
        argument0 = 'NOT ' + argument0;
    }
    return 'WHILE ' + argument0 + ' DO\n' + branch + '\nEND_WHILE;';
};

Blockly.ST['controls_for'] = function (block) {
    var variable = Blockly.ST.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var from = Blockly.ST.valueToCode(block, "FROM", Blockly.ST.ORDER_NONE) || '0';
    var to = Blockly.ST.valueToCode(block, "TO", Blockly.ST.ORDER_NONE) || '0';
    var by = Blockly.ST.valueToCode(block, "BY", Blockly.ST.ORDER_NONE) || '1';
    var branch = Blockly.ST.statementToCode(block, 'DO');
    branch = Blockly.ST.addLoopTrap(branch, block.id);
    var code = "FOR " + variable + ":=" + from + " TO " + to;
    if (by !== 1) {
        code += " BY " + by;
    }
    code += " DO\n" + branch + "\nEND_FOR;";
    return code;
};

Blockly.ST['controls_do'] = function(block){
    var statement = Blockly.ST.statementToCode(block, "DO");
    var argument0 = Blockly.ST.valueToCode(block, 'TERM',

            Blockly.ST.ORDER_NONE) || 'FALSE';
    var cond = block.getFieldValue("COND");
    var code = "REPEAT\n"+statement+"UNTIL ";
    if(cond === "UNTIL"){
        code += "NOT ";
    }
    code += argument0+"\n";
    code +="END_REPEAT;";
    return code;
};

Blockly.ST['controls_flow_statements'] = function (block) {
    switch (block.getFieldValue('FLOW')) {
        case 'BREAK':
            return 'EXIT;\n';
    }
    throw 'Unknown flow statement.';
};
