'use strict';

goog.provide('Editor');

/**
 * Currently active workspace
 * @type {Blockly.Workspace}
 */
Editor.workspace = null;

/**
 * Currently active project
 * @type {Editor.Project}
 */
Editor.project = null;

/**
 * Project tree structure
 * @type {null}
 */
Editor.tree = null;

/**
 * Creates a new project and initializes the editor with it
 * @param {string} project_name - Name of the new project
 */
Editor.initNewProject = function (project_name) {
    Editor.project = new Editor.Project(project_name);
    Editor.project.addProgram(new Editor.Program("MAIN_PRG"));
    Editor.init_();
    //Editor.project.addFunction(new Editor.Function("F_Test","BOOL"));
    //Editor.project.addFunctionBlock(new Editor.FunctionBlock('FB_Test'));
};

/**
 * Initializes the editor with a provided project.
 * @param {Editor.Project} loaded_project
 */
Editor.initWithProject = function (loaded_project) {
    //console.log("init with project");
    var project = new Editor.Project(loaded_project.name);
    for (var program of loaded_project.programs_) {
        project.addProgram(Object.assign(new Editor.Program(program.name), program));
    }
    for (var func of loaded_project.functions_) {
        project.addFunction(Object.assign(new Editor.Function(func.name, func.returnType), func));
    }
    for (var funcBlock of loaded_project.functionBlocks_) {
        project.addFunctionBlock(Object.assign(new Editor.FunctionBlock(funcBlock.name), funcBlock));
    }
    console.log("project", project);
    Editor.project = project;
    Editor.init_();
};

/**
 * Initializes the editor. Sets up the dialog listeners and initializes the project tree
 * @private
 */
Editor.init_ = function () {
    Editor.blocklyInit();

    $('#variableDialog').on('show.bs.modal', () => {
        $('#newVariableType').empty();
        $.each(Blockly.ST.ANY_ELEMENTARY_TYPE, (i, p) => {
            $('#newVariableType').append($('<option></option>').val(p).html(p));
        });
    });

    $('#editVariableDialog').on('show.bs.modal', () => {
        $('#variableSelect').empty();
        $.each(Editor.workspace.getAllVariables(), (i, variable) => {
            $('#variableSelect').append($('<option></option>').val(variable.getId()).html(variable.name));
        });

        $('#variableType').empty();
        $.each(Blockly.ST.ANY_ELEMENTARY_TYPE, (i, p) => {
            $('#variableType').append($('<option></option>').val(p).html(p));
        });

        var variable = Editor.workspace.getAllVariables()[0];
        Editor.populateForm('#editVariableForm', variable);

    });

    $('#variableSelect').change(function () {
        var variable = Editor.workspace.getVariableById($(this).val());
        Editor.populateForm('#editVariableForm', variable);
    });

    $('#functionDialog').on('show.bs.modal', () => {
        $('#newFunctionReturnType').empty();
        $('#newFunctionReturnType').append($('<option value="NONE">NONE</option>'));
        $.each(Blockly.ST.ANY_ELEMENTARY_TYPE, (i, p) => {
            $('#newFunctionReturnType').append($('<option></option>').val(p).html(p));
        });
    });

    if (Editor.tree) {
        Editor.tree.remove();
    }

    $('#tree').treeview({
        color: "#FFFFFF",
        level: 1,
        backColor: "#343a40",
        onhoverColor: "#4a645a",
        selectedBackColor: "#343a40",
        selectedColor: "#007bff",
        showBorder: false,
        collapseIcon: 'fas fa-minus',
        expandIcon: 'fas fa-folder-open',
        data: Editor.project.getAsTree(),
        onNodeSelected: function (event, data) {
            console.log('selected');
            Editor.loadWorkspace(data.dataAttr);
        },
        onNodeUnselected: function (event, data) {
            Editor.saveWorkspace(data.dataAttr);
        },
    });
    Editor.tree = $('#tree').treeview(true);
};

/**
 * Initializes blockly framework. Injects and registers the custom toolbox categories
 */
Editor.blocklyInit = function () {
    Editor.workspace = Blockly.inject("blocklyArea",
        {
            grid:
                {
                    spacing: 25,
                    length: 3,
                    colour: '#ccc',
                    snap: true
                },
            media: 'lib/blockly/media/',
            //horizontalLayout: true,
            toolboxPosition: 'end',
            toolbox: document.getElementById("toolbox"),
            zoom:
                {
                    controls: true,
                    wheel: true
                }
        });


    Editor.workspace.addChangeListener((event) => {
        /*if (event.type === Blockly.Events.BLOCK_CHANGE) {
            this.blockChanged(event);
        }else if(event.type === Blockly.Events.BLOCK_CREATE){
            this.blockCreated(event);
        }
        */
        var code = Blockly.ST.workspaceToCode(Editor.workspace);
        document.getElementById('output').value = code;
        //console.log(Editor.tree.getSelected()[0].dataAttr);
        if(Editor.tree.getSelected()[0]) {
            Editor.saveWorkspace(Editor.tree.getSelected()[0].dataAttr);
        }
    });

    Editor.workspace.registerToolboxCategoryCallback('FUNCTIONS', Editor.functionsFlyoutCallback);
    Editor.workspace.registerToolboxCategoryCallback('CUSTOM_FUNCTION_BLOCKS', Editor.functionBlocksFlyoutCallback);
};

/**
 * Flyout for CUSTOM_FUNCTION toolbox category
 * @param workspace
 * @returns {Array}
 */
Editor.functionsFlyoutCallback = function (workspace) {
    var xmlList = [];
    var button = goog.dom.createDom('button');
    button.setAttribute('text', 'New Function');
    button.setAttribute('callbackKey', 'CREATE_FUNCTION');

    workspace.registerButtonCallback('CREATE_FUNCTION', function (button) {
        //Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace());
        $('#functionDialog').modal('show');
    });
    xmlList.push(button);

    for(var func of Editor.project.getAllFunctions()){
        var block = goog.dom.createDom('block');
        block.setAttribute('type', func.return_type === 'NONE' ? 'procedures_callnoreturn' : 'procedures_callreturn');
        block.setAttribute('gap', 16);
        var mutation = goog.dom.createDom('mutation');
        mutation.setAttribute('name', func.name);
        block.appendChild(mutation);
        for (var j = 0; j < func.args.length; j++) {
            var arg = goog.dom.createDom('arg');
            arg.setAttribute('name', func.args[j].variable.name);
            arg.setAttribute('type', func.args[j].variable.type);
            mutation.appendChild(arg);
        }
        xmlList.push(block);
    }

    return xmlList;
};

/**
 * Flyout for CUSTOM_FUNCTION_BLOCK toolbox category
 * @param workspace
 * @returns {Array}
 */
Editor.functionBlocksFlyoutCallback = function (workspace) {
    var xmlList = [];
    var button = goog.dom.createDom('button');
    button.setAttribute('text', 'New Function Block');
    button.setAttribute('callbackKey', 'CREATE_FUNCTION_BLOCK');

    workspace.registerButtonCallback('CREATE_FUNCTION_BLOCK', function (button) {
        Editor.newFunctionBlock();
    });
    xmlList.push(button);
    for (var funcBlock of Editor.project.getAllFunctionBlocks()) {
        var block = goog.dom.createDom('block');
        block.setAttribute('type', 'function_block_call');
        block.setAttribute('gap', 16);
        var mutation = goog.dom.createDom('mutation');
        mutation.setAttribute('name', funcBlock.name);
        block.appendChild(mutation);

        for (var input of funcBlock.inputs) {
            var inArg = goog.dom.createDom('inArg');
            inArg.setAttribute('name', input.variable.name);
            inArg.setAttribute('type', input.variable.type);
            mutation.appendChild(inArg);
        }

        for (var output of funcBlock.outputs) {
            var outArg = goog.dom.createDom('outArg');
            outArg.setAttribute('name', output.name);
            outArg.setAttribute('type', output.type);
            mutation.appendChild(outArg);
        }
        xmlList.push(block);
    }
    return xmlList;
};

/**
 * @deprecated Not used
 * @param block
 * @param event
 */
Editor.blockCreated = function (event) {
    var block = Editor.workspace.getBlockById(event.blockId);
    if (block.type === 'variables_declare') {

    }
};

/**
 * @deprecated Not used
 * @param block
 * @param event
 */
Editor.blockChanged = function (event) {
    var block = Editor.workspace.getBlockById(event.blockId);
    if (block.type === 'variables_declare') {
        Editor.variableChangeEvent(block, event);
    }
};

/**
 * @deprecated Not used
 * @param block
 * @param event
 */
Editor.variableChangeEvent = function (block, event) {
    var ws = Editor.workspace;
    if (event.name === 'NAME') {

    }
    else if (event.name === 'TYPE') {

    }
};

/**
 * Shows the dialog for editing a variable
 */
Editor.showEditVariable = function () {
    $('#editVariableDialog').modal('show');
};

/**
 * Parses the edit variable form and calls {@link Editor.changeVariable_}
 */
Editor.editVariable = function () {
    var form = $('#editVariableForm');
    var values = form.serializeArray();
    Editor.changeVariable_(form.data('variableId'), values[0].value, values[1].value, values[2].value, values[3].value);
    form[0].reset();
    $('#editVariableDialog').modal('hide');
};

/**
 * Wrapper for {@link workspace.deleteVariableById}. Deletes the selected variable
 */
Editor.deleteVariable = function () {
    bootbox.confirm({
        message: "Are you sure you want to delete this variable?",
        buttons: {
            confirm: {
                label: "Yes",
                className: 'btn-success'
            },
            cancel: {
                label: "No"
            },
        },
        callback: function (result) {
            if (result) {
                var form = $('#editVariableForm');
                var varId = form.data('variableId');
                Editor.workspace.deleteVariableById(varId);
                $('#editVariableDialog').modal('hide');
            }
        }
    });
};

/**
 * Shows the new variable dialog
 */
Editor.newVariable = function () {
    $('#variableDialog').modal('show');
};

/**
 * Parses the new variable form and call {@link Editor.createNewVariable} with the parsed values
 */
Editor.createNewVariable = function () {
    var form = $('#newVariableForm');
    var values = form.serializeArray();
    Editor.createNewVariable_(values[0].value, values[1].value, values[2].value, values[3].value);
    form[0].reset();
    $('#variableDialog').modal('hide');
};

/**
 * Wrapper for {@link workspace.createVariable}
 * @param {string} name - Variable name
 * @param {string} type - Variable type
 * @param {string} opt_value - Optional variable initial value
 * @param {string} opt_address - Optional mapped address to variable
 * @private
 */
Editor.createNewVariable_ = function (name, type, opt_value, opt_address) {
    Editor.workspace.createVariable(name, type, opt_value, opt_address);
};

/**
 * Wrapper for the workspace change variable
 * @param {string} id - Id of the variable to change
 * @param {string }name - New name of the variable
 * @param type
 * @param {string} opt_value - Optional initial value for the variable
 * @param {string} opt_address - Optional mapped address for the variable
 * @private
 */
Editor.changeVariable_ = function (id, name, type, opt_value, opt_address) {
    Editor.workspace.changeVariable(id, name, opt_value, opt_address);
};

/**
 * Prompts the user for a program name and creates a new program in the active project
 */
Editor.newProgram = function () {
    bootbox.prompt({
        title: "New program",
        inputType: "text",
        placeholder: 'Program name',
        callback: function (result) {
            if (result) {
                console.log(result);
                var program = new Editor.Program(result);
                Editor.project.addProgram(program);
                var parent = Editor.tree.findNodes('Programs', 'text');
                Editor.tree.addNode({
                    text: program.name,
                    dataAttr: [{id: program.getId(), type: 'PROGRAM'}],
                    icon: 'fas fa-file'
                }, parent);
            }
        }
    });
};

/**
 * Shows the create function dialog
 */
Editor.newFunction = function () {
    $('#functionDialog').modal('show');
};

/**
 * Parses the new function form and calls {@link createNewFunction_} with the parsed values
 */
Editor.createNewFunction = function () {
    var form = $('#newFunctionForm');
    var values = form.serializeArray();
    form[0].reset();
    $('#functionDialog').modal('hide');
    let funcName = values[0].value;
    let returnType = values[1].value;
    Editor.createNewFunction_(funcName, returnType);
};

/**
 * Creates a new function and adds its to the working project
 * @param {String} name - Name of the new function
 * @param {String} type - Return type of the function
 * @private
 */
Editor.createNewFunction_ = function (name, type) {
    var func = new Editor.Function(name, type);
    Editor.project.addFunction(func);
    var parent = Editor.tree.findNodes('Functions', 'text');
    Editor.tree.addNode({
        text: func.name,
        dataAttr: [{id: func.getId(), type: 'FUNCTION'}],
        icon: 'fas fa-file'
    }, parent);
};

/**
 * Prompts user for the name of the new function block and crates it.
 */
Editor.newFunctionBlock = function () {
    bootbox.prompt({
        title: "New function block",
        inputType: "text",
        placeholder: 'Function block name',
        callback: function (result) {
            if (result) {
                var functionBlock = new Editor.FunctionBlock(result);
                Editor.project.addFunctionBlock(functionBlock);
                var parent = Editor.tree.findNodes('Function Blocks', 'text');
                Editor.tree.addNode({
                    text: functionBlock.name,
                    dataAttr: [{id: functionBlock.getId(), type: 'FUNCTION_BLOCK'}],
                    icon: 'fas fa-file'
                }, parent);
            }
        }
    });
};

/**
 * Populates the variable form with the variable data
 * @param {String} form_name - Form which to populate
 * @param {Blockly.VariableModel} variable - Variable that populates the form
 */
Editor.populateForm = function (form_name, variable) {
    var form = $(form_name);
    form.data('variableId', variable.getId());
    form = form[0];
    form[0].value = variable.name;
    form[1].value = variable.type;
    form[2].value = variable.initValue;
    form[3].value = variable.address;
};

/**
 * Saves the currently active project to a file
 *
 * @callback saveCallback
 *
 * @param {String} fileName - Name of the file to save to
 */
Editor.saveProject = function (fileName) {
    //$('#saveDialog').modal('show');
    var blob = new Blob([JSON.stringify(Editor.project)], {type: "application/json"});
    saveAs(blob, fileName + ".b4st");
};

/**
 * Loads a new project and replaces the current one with a newly loaded one
 */
Editor.loadProject = function () {
    bootbox.confirm({
        message: "Are you sure you want to overwrite your current work?",
        buttons: {
            confirm: {
                label: "Yes",
                className: 'btn-success'
            },
            cancel: {
                label: "No"
            },
        },
        callback: function (result) {
            if (result) {
                var openFileDialog = $("#openFile");
                openFileDialog.attr('accept', '.b4st');
                openFileDialog.on("change", (e) => {
                    var fr = new FileReader();
                    fr.addEventListener('load', function (e) {
                        console.log("file reader loaded");
                        Blockly.mainWorkspace.clear();	// clear workspace

                        var xml = Blockly.Xml.textToDom(e.target.result);
                        Blockly.Xml.domToWorkspace(xml, Editor.workspace);	// fill workspace
                    });
                    console.log(e.target.files);
                    fr.readAsText(e.target.files[0]);
                });
                openFileDialog.trigger("click");
            }
        }
    });
};

/**
 * Export the currently active project as PLCOpen file
 * @param {String} fileName - File to save to
 */
Editor.exportAsXml = function (fileName) {
    var xml = XMLExporter.exportProject(Editor.project);
    var blob = new Blob([xml], {type: "application/xml"});
    saveAs(blob, fileName + ".xml");
};

/**
 * Export the currently active project as Structured Text source code
 * @param {String} fileName - File to save to
 */
Editor.exportAsSt = function (fileName) {
    var code = Blockly.ST.projectToCode(Editor.project);
    var blob = new Blob([code], {type: "text/plain"});
    saveAs(blob, fileName + ".st");
};

/**
 * Saves the currently active workspace to a file
 *
 * @callback saveCallback
 *
 * @param {String} fileName - Name of the file to save to
 */
Editor.exportWorkspace = function (fileName) {
    var xml = Blockly.Xml.workspaceToDom(Editor.workspace);
    xml = Blockly.Xml.domToText(xml);
    var blob = new Blob([xml], {type: "application/xml"});
    saveAs(blob, fileName + ".xml");
};

/**
 * Clears and import a new workspace
 */
Editor.importWorkspace = function () {
    bootbox.confirm({
        message: "Are you sure you want to overwrite your current work?",
        buttons: {
            confirm: {
                label: "Yes",
                className: 'btn-success'
            },
            cancel: {
                label: "No"
            },
        },
        callback: function (result) {
            if (result) {
                var openFileDialog = $("#openFile");
                openFileDialog.attr('accept', '.xml');
                openFileDialog.on("change", (e) => {
                    var fr = new FileReader();
                    fr.addEventListener('load', function (e) {
                        console.log("file reader loaded");
                        Blockly.mainWorkspace.clear();	// clear workspace

                        var xml = Blockly.Xml.textToDom(e.target.result);
                        Blockly.Xml.domToWorkspace(xml, Editor.workspace);	// fill workspace
                    });
                    console.log(e.target.files);
                    fr.readAsText(e.target.files[0]);
                });
                openFileDialog.trigger("click");
            }
        }
    });
};

/**
 * Shows a save file dialog and calls a coresponding callback function with the input result
 * @param {saveCallback} callback
 */
Editor.showSaveDialog = function (callback) {
    bootbox.prompt({
        title: "Save file",
        inputType: "text",
        placeholder: 'File name',
        callback: function (result) {
            if (result) {
                callback(result);
            }
        }
    });
};

/**
 * Searches the project items for the correct item based on the id
 * @param {String} type - Type of item to search for, available items are:
 * <li>PROGRAM</li>
 * <li>FUNCTION</li>
 * <li>FUNCTION BLOCK</li>
 *
 * @param {String} id - Id of the item to look for
 * @returns {null|Editor.Program|Editor.FunctionBlock|Editor.Function}
 */
Editor.getTargetFromProject = function (type, id) {
    if (type === 'PROGRAM') {
        return Editor.project.getProgramById(id);
    } else if (type === 'FUNCTION') {
        return Editor.project.getFunctionById(id);
    } else if (type === 'FUNCTION_BLOCK') {
        return Editor.project.getFunctionBlockById(id);
    }
    return null;
};

/**
 * Saves the workspace of the selected tree view node to the coresponding item in the project structure
 * @param {{type:string, id:string}} data - Data with information about the selected tree node
 */
Editor.saveWorkspace = function (data) {
    if(data instanceof Array){
        data = data[0];
    }
    //console.log('save',data);
    var target = Editor.getTargetFromProject(data.type, data.id);

    if (target !== null) {
        target.updateWorkspace(Editor.workspace);
    } else {
        console.error("Unabled to find the target to save workspace to, target id: " + data.id);
    }
};

/**
 * Load workspace of the selected item in the tree view
 * @param {{type:string, id:string}} data - Data with information about the selected node
 *                                          from the tree view
 *                                   - type Type of the selected node (Program, function block, function)
 *                                   - id Id of the object to find in the projects structure
 */
Editor.loadWorkspace = function (data) {
    if(data instanceof Array){
        data = data[0];
    }
    //console.log('load', data);
    var target = Editor.getTargetFromProject(data.type, data.id);
    if (target !== null) {
        Blockly.Xml.clearWorkspaceAndLoadFromXml(target.getWorkspaceDom(), Editor.workspace);
        Editor.workspace.scrollCenter();
    } else {
        console.error("Unabled to find the target to load workspace from, target id: " + data.id);
    }
};

/**
 * Creates a new project and initializes the editor
 */
Editor.newProject = function () {
    bootbox.prompt({
        title: "New project",
        inputType: "text",
        placeholder: 'Project name',
        callback: function (result) {
            if (result) {
                $('#start_screen').hide();
                $('#main').show();
                Editor.initNewProject(result);
            }
        }
    });
};

/**
 * Loads and reads the JSON structure of the existing project from a file. After successful read,
 * the editor is initialized with newly read project
 */
Editor.openProject = function () {
    var openFileDialog = $("#openFile");
    openFileDialog.attr('accept', '.b4st');
    openFileDialog.on("change", (e) => {
        var fr = new FileReader();
        fr.addEventListener('load', function (e) {
            var project = JSON.parse(e.target.result);
            $('#start_screen').hide();
            $('#main').show();
            Editor.initWithProject(project);
        });
        fr.readAsText(e.target.files[0]);
    });
    openFileDialog.trigger("click");
};

Editor.debug = function () {
    //var xml = XMLExporter.exportProject(Editor.project);
    //document.getElementById('output').value = xml;
    var code = Blockly.ST.projectToCode(Editor.project);
    document.getElementById('output').value = code;
};

Editor.devGenerateXml = function () {
    //var xml = Blockly.Xml.workspaceToDom(Editor.workspace);
    //xml = Blockly.Xml.domToPrettyText(xml);
    //document.getElementById('output').value = xml;

    var code = Blockly.ST.projectToCode(Editor.project);
    document.getElementById('output').value = code;

};

window.addEventListener('load', () => {
    //Editor.init();
});
