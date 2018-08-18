'use strict';

goog.provide('Editor.Function');

Editor.Function = function (name) {
    this.name = name;
    this.id_ = Blockly.utils.genUid();
    this.workspaceDomText_ = "";
};

Editor.Function.prototype.getId = function() {
    return this.id_;
};

Editor.Function.prototype.getWorkspaceDom = function () {
    return Blockly.Xml.textToDom(this.workspaceDomText_);
};

Editor.Function.prototype.updateWorkspace = function (workspace) {
    let dom = Blockly.Xml.workspaceToDom(workspace);
    this.workspaceDomText_ = Blockly.Xml.domToText(dom);
};
