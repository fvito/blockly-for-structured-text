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

Blockly.FunctionBlocks.getMembersOfBlock = function (name) {
    var blocks = Blockly.mainWorkspace.getAllBlocks(false);

    for (var i = 0; i < blocks.length; i++) {
        var define = blocks[i].getFuncBlockDefine;
        if (define) {
            var block = define.call(blocks[i]);
            if (block) {
                if (block.name === name) {
                    return block;
                }
            }
        }
    }
    return null;
};

Blockly.FunctionBlocks.getMemberOfBlock = function (name, member) {
    var block = Blockly.FunctionBlocks.getMembersOfBlock(name);
    for (var i = 0; i < block.members.length; i++) {
        if(block.members[i].name === member){
            return block.members[i];
        }
    }
};

Blockly.FunctionBlocks.findLegalName = function (name, block) {
    if (block.isInFlyout) {
        return name;
    }
    while (!Blockly.FunctionBlocks.isLegalName(name, block.workspace, block)) {
        var regex = name.match(/^(.+)(\d+)$/);
        if (!regex) {
            name += '2';
        } else {
            name = regex[1] + (parseInt(regex[2], 10) + 1);
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
        var func = blocks[i].getName;
        if (func) {
            var blockName = func.call(blocks[i]);
            console.log(blockName);
            if (Blockly.Names.equals(blockName, name)) {
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
    if (blockList.length < 1) {
        var label = goog.dom.createDom('label');
        label.setAttribute('text', 'No function blocks placed');
        xmlList.push(label);
    }
    xmlList = xmlList.concat(blockList);
    return xmlList;
};

Blockly.FunctionBlocks.flyoutCategoryBlocks = function (workspace) {
    var functionBlocks = Blockly.FunctionBlocks.allFunctionBlocks();
    functionBlocks.sort(Blockly.FunctionBlocks.compareByName);

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
    return xmlList;
};

Blockly.FunctionBlocks.CHANGE_OUTPUT_TYPE = function (block) {
    console.log(block);
    var fb = Blockly.FunctionBlocks.getMembersOfBlock(block.getFieldValue('NAME'));
    var member = block.getFieldValue('MEM');
    console.log(fb, member);
};

Blockly.FunctionBlocks.compareByName = function (nameA, nameB) {
    return goog.string.caseInsensitiveCompare(nameA.name, nameB.name);
};


