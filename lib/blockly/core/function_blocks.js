'use strict';

goog.provide('Blockly.FunctionBlocks');

goog.require('Blockly.Block');
goog.require('Blockly.Names');
goog.require('Blockly.Workspace');

Blockly.FunctionBlocks.NAME_TYPE = 'FUNCTION_BLOCK';

Blockly.FunctionBlocks.allFunctionBlocks = function (opt_workspace) {
    var ws = opt_workspace ? opt_workspace : Blockly.mainWorkspace;
    var blocks = ws.getAllBlocks(false);
    var functionBlocks = [];

    for (var i = 0; i < blocks.length; i++) {
        var define = blocks[i].getFuncBlockDefine;
        if (define) {
            var block = define.call(blocks[i]);
            if (block) {
                functionBlocks.push(block);
            }
        }
    }
    return functionBlocks;
};

Blockly.FunctionBlocks.getMembersOfBlock = function(name){
  var blocks = Blockly.mainWorkspace.getAllBlocks(false);

  for(var i = 0; i < blocks.length; i++){
      var define = blocks[i].getFuncBlockDefine;
      if(define){
          var block = define.call(blocks[i]);
          if(block){
              if(block.name === name){
                  return block;
              }
          }
      }
  }
  return null;
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
        if (blocks[i] == opt_exclude) {
            continue;
        }
        var func = blocks[i].getFuncBlockDefine;
        if (func) {
            var blockName = func.call(blocks[i]);
            if (Blockly.Names.equals(blockName[0], name)) {
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
    for (var i = 0; i < blocks.length; i++) {
        var func = blocks[i].renameProcedure;
        if (func) {
            func.call(blocks[i], this.text_, new_name);
        }
    }
    return new_name;
};

Blockly.FunctionBlocks.flyoutCategory = function (workspace) {
    var xmlList = [];
    var blockList = Blockly.FunctionBlocks.flyoutCategoryBlocks(workspace);
    xmlList = xmlList.concat(blockList);
    console.log(xmlList);
    return xmlList;
};

Blockly.FunctionBlocks.flyoutCategoryBlocks = function (workspace) {
    var functionBlocks = Blockly.FunctionBlocks.allFunctionBlocks();
    functionBlocks.sort(Blockly.FunctionBlocks.compareByName);
    //sort
    console.log(functionBlocks);
    var xmlList = [];
    if (functionBlocks.length > 0) {
        for (var i = 0; i < functionBlocks.length; i++) {
            var blockText = '<xml>' +
                '<block type="function_block_get" gap="8">' +
                '<field name="NAME">' + functionBlocks[i].name + '</field>' +
                '</block>' +
                '</xml>';

            var block = Blockly.Xml.textToDom(blockText).firstChild;
            xmlList.push(block);

            var blockText = '<xml>' +
                '<block type="function_block_set" gap="8">' +
                '<field name="NAME">' + functionBlocks[i].name + '</field>' +
                '</block>' +
                '</xml>';
            var block = Blockly.Xml.textToDom(blockText).firstChild;
            xmlList.push(block);
        }
    }
    console.log(xmlList);
    return xmlList;
};

Blockly.FunctionBlocks.compareByName = function (nameA, nameB) {
    return goog.string.caseInsensitiveCompare(nameA, nameB);
};


