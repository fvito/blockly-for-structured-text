'use strict';

goog.provide('Editor.Task');
goog.require('Editor.Configuration');

Editor.Task = function (name, interval, priority) {
    this.name = name;
    this.interval = interval;
    this.priority = priority;
    this.id_ = Blockly.utils.genUid();
    this.workspaceDomText_ = this.getInitialDom_();
};

Editor.Task.prototype.getId = function () {
    return this.id_;
};

Editor.Task.prototype.getInitialDom_ = function () {
    return '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="task_container" deletable="false" movable="false"><field name="NAME">' + this.name + '</field><value name="PRIORITY"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="INTERVAL"><block type="time_value"><field name="VALUE">50</field></block></value></block></xml>';
};

Editor.Task.prototype.getAllInstances = function () {
    let instances = [];
    let ws = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(this.getWorkspaceDom(), ws);
    let blocks = Blockly.ST.getAllBlocksOfTypes(ws, 'single_task');
    for (let block of blocks) {
        instances.push({
            "name": block.getFieldValue('NAME'),
            "instance": block.getFieldValue('INSTANCE')
        });
    }
    return instances;
};

Editor.Task.prototype.getWorkspaceDom = function () {
    return Blockly.Xml.textToDom(this.workspaceDomText_);
};

Editor.Task.prototype.updateWorkspace = function (workspace) {
    let dom = Blockly.Xml.workspaceToDom(workspace);
    this.workspaceDomText_ = Blockly.Xml.domToText(dom);
};
