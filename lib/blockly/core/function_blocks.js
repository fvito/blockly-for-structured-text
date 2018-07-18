'use strict';

goog.provide('Blockly.FunctionBlocks');

goog.require('Blockly.Block');
goog.require('Blockly.Names');
goog.require('Blockly.Workspace');

Blockly.FunctionBlocks.NAME_TYPE = 'FUNCTION_BLOCK';

Blockly.FunctionBlocks.allFunctionBlocks = function () {
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var functionBlocks = [];

    for (var i = 0; i < blocks.length; i++) {
        var define = blocks[i].getFuncBlockDefine;
        if (define) {
            var tuple = define.call(blocks[i]);
            if(tuple) {
                functionBlocks.push(tuple);
            }
        }
    }
    return functionBlocks;
};

Blockly.FunctionBlocks.findLegalName = function (name, block) {
    if (block.isInFlyout) {
        return name;
    }
    while (!Blockly.FunctionBlocks.isLegalName(name, block.workspace, block)) {
        var regex = name.match(/^(.?)(\d+)$/);
        if (!regex) {
            name += '2';
        } else {
            name = r[1] + (parseInt(r[2], 10) + 1);
        }
    }
    return name;
};

Blockly.FunctionBlocks.isLegalName = function (name, workspace, opt_exclude) {
    var blocks = workspace.getAllBlocks();
    for (var i = 0; i < blocks.length; i++) {
      if(blocks[i] == opt_exclude){
          continue;
      }
      var func = blocks[i].getFuncBlockDefine;
      if(func){
          var blockName = func.call(blocks[i]);
          if(Blockly.Names.equals(blockName[0], name)){
              return false;
          }
      }
    }
    return true;
};

Blockly.FunctionBlocks.rename = function (new_name) {
  new_name = new_name.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
  new_name = Blockly.FunctionBlocks.findLegalName(new_name, this.sourceBlock_);
  var blocks = this.sourceBlock_.workspace.getAllBlocks();
  for(var i = 0; i < blocks.length; i++){
      var func = blocks[i].renameFuncBlock;
      if(func){
          func.call(blocks[i], this.text_, new_name);
      }
  }
  return new_name;
};

