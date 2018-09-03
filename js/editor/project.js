'use strict';

goog.provide('Editor.Project');
goog.require('Editor.Configuration');

Editor.Project.PROGRAM_TYPE = 'PROGRAM';
Editor.Project.FUNCTION_TYPE = 'FUNCTION';
Editor.Project.FUNCTION_BLOCK_TYPE = 'FUNCTION_BLOCK';

Editor.Project = function (name) {
    this.name = name;
    this.configuration = new Editor.Configuration();
    this.configuration.addTask(new Editor.Task('TaskMain', 'T#50ms', 0));
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

Editor.Project.prototype.deleteProgram = function (id) {
    console.log('delete id:', id);
    var index = this.programs_.findIndex(i => i.getId() === id);
    console.log(index);
    this.programs_.splice(index, 1);
};

Editor.Project.prototype.deleteFunction = function (id) {
    var index = this.functions_.findIndex(i => i.getId() === id);
    this.functions_.splice(index, 1);
};

Editor.Project.prototype.deleteFunctionBlock = function (id) {
    var index = this.functionBlocks_.findIndex(i => i.getId() === id);
    this.functionBlocks_.splice(index, 1);
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

Editor.Project.prototype.getFunctionByIndex = function (index) {
    return this.functions_[index];
};

Editor.Project.prototype.getFunctionById = function (id) {
    for (var func of this.functions_) {
        if (func.getId() === id) {
            return func;
        }
    }
    return null;
};

Editor.Project.prototype.getFunctionByName = function (name) {
    for (var func of this.functions_) {
        if (func.name === name) {
            return func;
        }
    }
    return null;
};

Editor.Project.prototype.getFunctionBlockByIndex = function (index) {
    return this.functionBlocks_[index];
};

Editor.Project.prototype.getFunctionBlockById = function (id) {
    for (var fb of this.functionBlocks_) {
        if (fb.getId() === id) {
            return fb;
        }
    }
    return null;
};

Editor.Project.prototype.getFunctionBlockByName = function (name) {
    for (var fb of this.functionBlocks_) {
        if (fb.name === name) {
            return fb;
        }
    }
    return null;
};

Editor.Project.prototype.getFunctionDef = function (func, opt_inc_workspace) {
    let ws = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(func.getWorkspaceDom(), ws);
    let topBlock = ws.getTopBlocks(true)[0];
    if (topBlock.type === 'procedures_defnoreturn' || topBlock.type === 'procedures_defreturn') {
        let def = {
            'name': func.name,
            'return_type': func.returnType,
            'args': topBlock.argumentVarModels_
        };
        if (opt_inc_workspace) {
            def['workspace'] = func.getWorkspaceDom();
        }
        return def;
    } else {
        console.error(`Top block in function(id:${func.id}) workspace was not a function wrapper`);
    }
};

Editor.Project.prototype.getFunctionBlockDef = function (block, opt_inc_workspace) {
    let ws = new Blockly.Workspace();
    Blockly.Xml.domToWorkspace(block.getWorkspaceDom(), ws);

    let topBlock = ws.getTopBlocks(true)[0];
    if (topBlock.callType_ === 'function_blocks_call') {
        let def = {
            'name': block.name,
            'inputs': topBlock.argumentVarModels_,
            'outputs': topBlock.outputsVarModels_
        };
        if (opt_inc_workspace) {
            def['workspace'] = block.getWorkspaceDom();
        }
        return def;
    } else {
        console.error(`Top block in function(id:${block.id}) workspace was not a function blocks define block`);
    }

};

Editor.Project.prototype.getAllFunctions = function (opt_inc_workspace) {
    let functions = [];
    for (const func of this.functions_) {
        functions.push(this.getFunctionDef(func, opt_inc_workspace));
    }
    //console.log(functions);
    return functions;
};

Editor.Project.prototype.getAllFunctionBlocks = function (opt_inc_workspace) {
    let functionBlocks = [];
    for (const block of this.functionBlocks_) {
        functionBlocks.push(this.getFunctionBlockDef(block, opt_inc_workspace));
    }
    return functionBlocks;
};

Editor.Project.prototype.getAsTree = function () {
    var tree = [];
    var root = {text: `Project - ${this.name}`, selectable: false, nodes: []};

    var programs = {text: "Programs", selectable: false, nodes: []};
    for (var program of this.programs_) {
        programs.nodes.push({
            text: program.name,
            dataAttr: [{id: program.getId(), type: 'PROGRAM'}],
            icon: 'fas fa-file',
            class: 'context-text'
        });
    }
    root.nodes.push(programs);

    var functions = {text: "Functions", selectable: false, nodes: []};
    for (var func of this.functions_) {
        functions.nodes.push({
            text: func.name,
            dataAttr: [{id: func.getId(), type: 'FUNCTION',}],
            icon: 'fas fa-file',
            class: 'context-text'
        });
    }
    root.nodes.push(functions);

    var funcBlocks = {text: "Function Blocks", selectable: false, nodes: []};
    for (var block of this.functionBlocks_) {
        funcBlocks.nodes.push({
            text: block.name,
            dataAttr: [{id: block.getId(), type: 'FUNCTION_BLOCK'}],
            icon: 'fas fa-file',
            class: 'context-text'
        });
    }
    root.nodes.push(funcBlocks);


    var confingNode = {text: "Configuration", selectable: false, nodes: []};
    for (var task of this.configuration.getAllTasks()) {
        confingNode.nodes.push({
            text: task.name,
            dataAttr: [{id: task.getId(), type: 'TASK'}],
            icon: 'fas fa-file',
            class: 'context-text'
        })
    }
    root.nodes.push(confingNode);
    tree.push(root);
    return tree;
};

