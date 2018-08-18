'use strict';

goog.provide('Editor.Project');
goog.require('Editor.Configuration');

Editor.Project.PROGRAM_TYPE = 'PROGRAM';
Editor.Project.FUNCTION_TYPE = 'FUNCTION';
Editor.Project.FUNCTION_BLOCK_TYPE = 'FUNCTION_BLOCK';

Editor.Project = function (name) {
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

Editor.Project.prototype.getProgramByIndex = function (index) {
    return this.programs_[index]
};

Editor.Project.prototype.getProgramById = function (id) {
    for (var program of this.programs_) {
        if (program.getId() === id) {
            return program;
        }
    }
    return null;
};

Editor.Project.prototype.getFunctionById = function (id) {
    for (var func of this.functions_) {
        if (func.getId() === id) {
            return func;
        }
    }
    return null;
};


Editor.Project.prototype.getFunctionBlockById = function (id) {
    for (var fb of this.functionBlocks_) {
        if (fb.getId() === id) {
            return fb;
        }
    }
    return null;
};

Editor.Project.prototype.getAsTree = function () {
    var tree = [];
    var root = {text: `Project - ${this.name}`, selectable: false, nodes: []};

    var programs = {text: "Programs", selectable: false, nodes: []};
    for (var program of this.programs_) {
        programs.nodes.push({text: program.name, id: program.getId(), type: Editor.Project.PROGRAM_TYPE});
    }
    root.nodes.push(programs);

    var functions = {text: "Functions", selectable: false, nodes: []};
    for (var func of this.functions_) {
        functions.nodes.push({text: func.name, id: func.getId(), type: Editor.Project.FUNCTION_TYPE});
    }
    root.nodes.push(functions);

    var funcBlocks = {text: "Function Blocks", selectable: false, nodes: []};
    for (var block of this.functionBlocks_) {
        funcBlocks.nodes.push({text: block.name, id: block.getId(), type: Editor.Project.FUNCTION_BLOCK_TYPE});
    }
    root.nodes.push(funcBlocks);


    root.nodes.push({text: "Configuration"});
    tree.push(root);
    return tree;
};

