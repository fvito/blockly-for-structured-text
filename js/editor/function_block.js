'use strict';

goog.provide('Editor.FunctionBlock');

Editor.FunctionBlock = function (name) {
    this.name = name;
    this.id_ = Blockly.utils.genUid();
    this.workspaceDomText_ = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="function_block_def" deletable="false" movable="false"><field name="NAME">' + this.name + '</field><comment pinned="false" h="80" w="160">Describe this function block...</comment></block></xml>\;';
};

Editor.FunctionBlock.prototype.getId = function() {
    return this.id_;
};

Editor.FunctionBlock.prototype.getWorkspaceDom = function () {
    return Blockly.Xml.textToDom(this.workspaceDomText_);
};

Editor.FunctionBlock.prototype.updateWorkspace = function (workspace) {
    let dom = Blockly.Xml.workspaceToDom(workspace);
    this.workspaceDomText_ = Blockly.Xml.domToText(dom);
};

Editor.FunctionBlock.prototype.toTreeNode = function () {
    return {
        text: this.name,
        dataAttr: [{id: this.getId(), type: 'FUNCTION_BLOCK'}],
        icon: 'fas fa-file',
        class: 'context-text'
    };
};