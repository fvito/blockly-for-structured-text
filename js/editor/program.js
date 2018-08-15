'use strict';
goog.provide('Editor.Program');

Editor.Program = function (name) {
    this.name = name;
    this.id_ = Blockly.utils.genUid();
    this.workspace_ = new Blockly.Workspace();
};