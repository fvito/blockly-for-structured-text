'use strict';

goog.provide('Editor.FunctionBlock');

Editor.FunctionBlock = function (name) {
    this.name = name;
    this.id_ = Blockly.utils.genUid();
    this.workspaceDomText_ = '<xml xmlns=\"http://www.w3.org/1999/xhtml\"></xml>';
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
