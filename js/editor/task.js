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
    let interval = this.extractInterval_();
    let dom = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="task_container" deletable="false" movable="false"><field name="NAME">' + this.name + '</field><value name="PRIORITY"><shadow type="math_number"><field name="NUM">' + this.priority + '</field></shadow></value><value name="INTERVAL"><block type="time_value"><field name="VALUE">' + interval[0] + '</field><field name="UNIT">' + interval[1] + '</field></block></value></block></xml>';
    return dom;
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
    let blocks = workspace.getTopBlocks(true);
    if (blocks[0].type === 'task_container') {
        //update internal task variables
        let block = blocks[0];
        this.priority = Blockly.ST.valueToCode(block, 'PRIORITY', Blockly.ST.ORDER_NONE) || 0;
        this.interval = Blockly.ST.valueToCode(block, 'INTERVAL', Blockly.ST.ORDER_NONE) || 'TIME#50ms';
    }
    let dom = Blockly.Xml.workspaceToDom(workspace);
    this.workspaceDomText_ = Blockly.Xml.domToText(dom);
};

Editor.Task.prototype.toTreeNode = function () {
    return {
        text: this.name,
        dataAttr: [{id: this.getId(), type: 'TASK'}],
        icon: 'fas fa-file',
        class: 'context-text'
    };
};

/**
 * Extracts the number and unit from combined input. Returns as tuple [number, unit].
 * @returns {string[]}
 * @private
 */
Editor.Task.prototype.extractInterval_ = function () {
    let tuple = [];
    let startIndex = this.interval.indexOf('#');
    let split = this.interval.substring(startIndex + 1);
    let number = split.match(/\d+/)[0];
    let unit = split.match(/[A-Za-z]+/)[0];
    console.log('number: ', number, 'unit: ', unit);
    return [number, unit];
};