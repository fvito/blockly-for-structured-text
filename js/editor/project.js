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

Editor.Project.prototype.getAllFunctions = function (opt_inc_workspace) {
    var functions = [];
    let tmpWs = new Blockly.Workspace();
    for(var func of this.functions_){
        tmpWs.clear();
        Blockly.Xml.domToWorkspace(func.getWorkspaceDom(), tmpWs);
        let topBlock = tmpWs.getTopBlocks(true)[0];
        if(topBlock.callType_ === 'procedures_callnoreturn' || topBlock.callType_ === 'procedures_callreturn'){
            var def = {
                'name':func.name,
                'return_type':func.returnType,
                'args':topBlock.argumentVarModels_
            };
            if (opt_inc_workspace) {
                def["workspace"] = func.getWorkspaceDom();
            }
            functions.push(def);
        }else{
            console.error(`Top block in function(id:${func.id}) workspace was not a function wrapper`);
        }

    }
    //console.log(functions);
    return functions;
};

Editor.Project.prototype.getAllFunctionBlocks = function (opt_inc_workspace) {
    var functionBlocks = [];
    let tmpWs = new Blockly.Workspace();
    for (var block of this.functionBlocks_) {
        tmpWs.clear();
        Blockly.Xml.domToWorkspace(block.getWorkspaceDom(), tmpWs);
        let topBlock = tmpWs.getTopBlocks(true)[0];
        if (topBlock.callType_ === 'function_blocks_call') {
            var def = {
                'name': block.name,
                'inputs': topBlock.argumentVarModels_,
                'outputs': topBlock.outputsVarModels_
            };
            if (opt_inc_workspace) {
                def['workspace'] = block.getWorkspaceDom();
            }
            functionBlocks.push(def);
        } else {
            console.error(`Top block in function(id:${block.id}) workspace was not a function blocks define block`);
        }
    }
    return functionBlocks;
};

Editor.Project.prototype.getAsTree = function () {
    var tree = [];
    var root = {text: `Project - ${this.name}`, selectable: false, nodes: []};

    var programs = {text: "Programs", selectable: false, nodes: [],};
    for (var program of this.programs_) {
        programs.nodes.push({
            text: program.name,
            dataAttr: [{id: program.getId(), type: 'PROGRAM'}],
            icon: 'fas fa-file'
        });
    }
    root.nodes.push(programs);

    var functions = {text: "Functions", selectable: false, nodes: []};
    for (var func of this.functions_) {
        functions.nodes.push({
            text: func.name,
            dataAttr: [{id: func.getId(), type: 'FUNCTION',}],
            icon: 'fas fa-file'
        });
    }
    root.nodes.push(functions);

    var funcBlocks = {text: "Function Blocks", selectable: false, nodes: []};
    for (var block of this.functionBlocks_) {
        funcBlocks.nodes.push({
            text: block.name,
            dataAttr: [{id: block.getId(), type: 'FUNCTION_BLOCK'}],
        });
    }
    root.nodes.push(funcBlocks);


    root.nodes.push({text: "Configuration"});
    tree.push(root);
    return tree;
};

