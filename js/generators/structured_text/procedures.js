'use strict';

goog.provide('Blockly.ST.procedures');

goog.require('Blockly.ST');

Blockly.ST['procedures_program'] = function (block) {
  var name = block.getFieldValue("NAME");
  var statements = Blockly.ST.statementToCode(block, 'STATEMENTS');
  return "PROGRAM " + name + '\n' + statements + '\nEND_PROGRAM;';
};