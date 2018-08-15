'use strict';

goog.provide('Editor.Project');
goog.require('Editor.Configuration');

Editor.Project = function(name) {
    this.name = name;
    this.configuration = new Editor.Configuration();
    this.programs_ = [];
    this.functions_ = [];
    this.functionBlocks_ = [];
};

Editor.Project.prototype.addProgram = function (program) {
    this.programs_.push(program);
};

Editor.Project.prototype.addFunction = function (func) {
    this.functions_.push(func);
};

Editor.Project.prototype.addFunctionBlock = function (fblock) {
    this.functionBlocks_.push(fblock);
};
