'use strict';

goog.provide('Editor.Program');

Editor.Program = function (name) {
    this.name = name;
    this.id_ = Blockly.utils.genUid();
    this.workspaceDomText_ = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="procedures_program" id="U}~Z4e$,RX61+UEiT:R," deletable="false" editable="false" movable="false" x="287" y="288"><field name="NAME">'+this.name+'</field></block></xml>';
};

Editor.Program.prototype._getInitBlock = function() {

};

Editor.Program.prototype.getId = function() {
    return this.id_;
};

Editor.Program.prototype.getWorkspaceDom = function () {
  return Blockly.Xml.textToDom(this.workspaceDomText_);
};

Editor.Program.prototype.updateWorkspace = function (workspace) {
  let dom = Blockly.Xml.workspaceToDom(workspace);
  this.workspaceDomText_ = Blockly.Xml.domToText(dom);
};