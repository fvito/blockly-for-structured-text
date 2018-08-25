'use strict';

goog.provide('Editor');

Editor.workspace = null;
Editor.project = null;
Editor.tree = null;

Editor.init = function () {
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

    Editor.project = new Editor.Project("test");
    Editor.project.addProgram(new Editor.Program("MAIN_PRG"));
    Editor.project.addFunction(new Editor.Function("test","BOOL"));

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
            Editor.loadWorkspace(data.dataAttr);
        },
        onNodeUnselected: function (event, data) {
            Editor.saveWorkspace(data.dataAttr);
        },
    });

    Editor.tree = $('#tree').treeview(true);
    //let programNode = Editor.tree.findNodes('MAIN_PRG', 'text');
    //Editor.tree.selectNode(programNode);


};

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

    Editor.workspace.registerToolboxCategoryCallback('TEST_FUNCTIONS', Editor.functionsFlyoutCallback)
};

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
            mutation.appendChild(arg);
        }
        xmlList.push(block);
    }

    return xmlList;
};

Editor.blockCreated = function (event) {
    var block = Editor.workspace.getBlockById(event.blockId);
    if (block.type === 'variables_declare') {

    }
};

Editor.swapWorkspace = function (source) {
};

Editor.blockChanged = function (event) {
    var block = Editor.workspace.getBlockById(event.blockId);
    if (block.type === 'variables_declare') {
        Editor.variableChangeEvent(block, event);
    }
};

Editor.variableChangeEvent = function (block, event) {
    var ws = Editor.workspace;
    if (event.name === 'NAME') {

    }
    else if (event.name === 'TYPE') {

    }

};

Editor.showEditVariable = function () {
    $('#editVariableDialog').modal('show');
};

Editor.editVariable = function () {
    var form = $('#editVariableForm');
    var values = form.serializeArray();
    Editor.changeVariable_(form.data('variableId'), values[0].value, values[1].value, values[2].value, values[3].value);
    form[0].reset();
    $('#editVariableDialog').modal('hide');
};

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

Editor.newVariable = function () {
    $('#variableDialog').modal('show');
};

Editor.createNewVariable = function () {
    var form = $('#newVariableForm');
    var values = form.serializeArray();
    Editor.createNewVariable_(values[0].value, values[1].value, values[2].value, values[3].value);
    form[0].reset();
    $('#variableDialog').modal('hide');
};

Editor.createNewVariable_ = function (name, type, opt_value, opt_address) {
    Editor.workspace.createVariable(name, type, opt_value, opt_address);
};

Editor.changeVariable_ = function (id, name, type, opt_value, opt_address) {
    Editor.workspace.changeVariable(id, name, opt_value, opt_address);
};

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

Editor.newFunction = function () {
    $('#functionDialog').modal('show');
};

Editor.createNewFunction = function () {

    var form = $('#newFunctionForm');
    var values = form.serializeArray();
    form[0].reset();
    $('#functionDialog').modal('hide');
    let funcName = values[0].value;
    let returnType = values[1].value;
    Editor.createNewFunction_(funcName, returnType);
};

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

Editor.newFunctionBlock = function () {
    /*var program = new Editor.FunctionBlock("new program");
    Editor.project.addProgram(program);
    var parent = Editor.tree.findNodes('Programs','text');
    Editor.tree.addNode({text: program.name, id: program.getId(), type: Editor.Project.PROGRAM_TYPE}, parent);
    */
};


Editor.populateForm = function (form_name, variable) {
    var form = $(form_name);
    form.data('variableId', variable.getId());
    form = form[0];
    form[0].value = variable.name;
    form[1].value = variable.type;
    form[2].value = variable.initValue;
    form[3].value = variable.address;
};

Editor.exportAsXml = function (fileName) {
    var xml = XMLExporter.exportProject(Editor.project);
    var blob = new Blob([xml], {type: "application/xml"});
    saveAs(blob, fileName + ".xml");
};

Editor.exportAsSt = function (fileName) {
    var code = Blockly.ST.fullOutput(Editor.workspace);
    var blob = new Blob([code], {type: "text/plain"});
    saveAs(blob, fileName + ".st");
};


Editor.saveProject = function (fileName) {
    //$('#saveDialog').modal('show');
    var xml = Blockly.Xml.workspaceToDom(Editor.workspace);
    xml = Blockly.Xml.domToText(xml);
    var blob = new Blob([xml], {type: "application/xml"});
    saveAs(blob, fileName + ".xml");
};

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

Editor.devGenerateXml = function () {
    var xml = Blockly.Xml.workspaceToDom(Editor.workspace);
    xml = Blockly.Xml.domToPrettyText(xml);
    document.getElementById('output').value = xml;
};

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

Editor.debug = function () {
    var xml = XMLExporter.exportProject(Editor.project);
    document.getElementById('output').value = xml;
};

window.addEventListener('load', () => {
    Editor.init();
    //document.getElementById('generate').addEventListener('click', () => {
    //Editor.workspace.createVariable('TEST', Blockly.ST.STRING_TYPE);
    var code = Blockly.JavaScript.workspaceToCode(Editor.workspace);
    //    document.getElementById('output').value = code;
    //});
});
