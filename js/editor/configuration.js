'use strict';
goog.provide('Editor.Configuration');

Editor.Configuration = function () {
    this.id_ = Blockly.utils.genUid();
    this.tasks_ = [];
};

Editor.Configuration.prototype.addTask = function (newTask) {
    this.tasks_.push(newTask);
};

Editor.Configuration.prototype.deleteTask = function (id) {
    let index = this.tasks_.findIndex(i => i.getId() === id);
    this.tasks_.splice(index, 1);
};

Editor.Configuration.prototype.getTaskById = function (id) {
    let index = this.tasks_.findIndex(i => i.getId() === id);
    return this.getTaskByIndex(index);
};

Editor.Configuration.prototype.getTaskByIndex = function (index) {
    return this.tasks_[index];
};

Editor.Configuration.prototype.getTaskByName = function (name) {
    let index = this.tasks_.findIndex(i => i.name === name);
    return this.getTaskByIndex(index);
};

Editor.Configuration.prototype.getAllTasks = function () {
    return this.tasks_;
};