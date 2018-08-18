'use strict';

goog.provide('Editor.Program');

Editor.Program = function (name) {
    this.name = name;
    this.id_ = Blockly.utils.genUid();
    this.workspaceDomText_ = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="BOOL" id="WDjMT7aO-2ArL8G,^MCS" value="FALSE" address="address">testVarialbe</variable></variables><block type="variables_set" id="+~Jm?;`4=|pdMi_K9~bc" x="312" y="88"><field name="VAR" id="WDjMT7aO-2ArL8G,^MCS" variabletype="BOOL">testVarialbe</field><next><block type="controls_if" id="l~a0EiB}f|4veZY?~Gfi"></block></next></block></xml>';
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