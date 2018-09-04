'use strict';

goog.provide('Blockly.ST.configuration');

goog.require('Blockly.ST');

Blockly.ST['task_container'] = function (block) {
    let name = block.getFieldValue('NAME');
    let interval = Blockly.ST.valueToCode(block, 'INTERVAL', Blockly.ST.ORDER_NONE) || 'TIME#50s';
    let priority = Blockly.ST.valueToCode(block, 'PRIORITY', Blockly.ST.ORDER_NONE) || '0';
    var code = 'TASK ' + name + " (INTERVAL := " + interval + ", PRIORITY := " + priority + ");\n";
    code += Blockly.ST.statementToCode(block, 'INSTANCES');
    return code;
};

Blockly.ST['single_task'] = function (block) {
    let name = block.getFieldValue('NAME');
    let program = block.getFieldValue('INSTANCE');
    let task = block.getSurroundParent().getFieldValue('NAME');
    var code = 'PROGRAM ' + name + ' WITH ' + task + ' : ' + program + ";\n";
    return code;
};