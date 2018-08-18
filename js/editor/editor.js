'use strict';

goog.provide('Editor');

Editor.workspace = null;
Editor.project = null;

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

    var tree = [
        {
            text: "Project - {{name}}",
            selectable: false,
            nodes: [
                {
                    text: "Functions",
                    selectable: false,
                    nodes: [
                        {
                            text: "Function A"
                        },
                        {
                            text: "Function B"
                        }
                    ]
                },
                {
                    text: "Programs",
                    selectable: false,
                    nodes: [
                        {
                            text: "MAIN_PRG"
                        }
                    ]
                },
                {
                    text: "Function blocks",
                    selectable: false,
                    nodes: [
                        {
                            text: "myFunctionBlock"
                        }
                    ]
                },
                {
                    text: "Configuration"
                }
            ]
        }
    ];

    Editor.project = new Editor.Project("test");
    Editor.project.addProgram(new Editor.Program("MAIN_PRG"));
    Editor.project.addProgram(new Editor.Program("MAIN_PRG_2"));

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
            console.log("Selected");
            console.log(data);
            Editor.loadWorkspace(data);
        },
        onNodeUnselected: function (event, data) {
            console.log("Unselected");
            console.log(data);
            Editor.saveWorkspace(data);
        },
    });
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
        var code = Blockly.ST.fullOutput(Editor.workspace);
        document.getElementById('output').value = code;
    });
};

Editor.blockCreated = function (event) {
    var block = Editor.workspace.getBlockById(event.blockId);
    if (block.type === 'variables_declare') {

    }
};

Editor.swapWorkspace = function (source) {
    Blockly.Xml.clearWorkspaceAndLoadFromXml(source, Editor.workspace);
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
    var xml = XMLExporter.export(Editor.workspace);
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
        value: 'Project',
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

Editor.saveWorkspace = function (data) {
    var target = null;
    if (data.type === Editor.Project.PROGRAM_TYPE) {
        target = Editor.project.getProgramById(data.id);
    } else if (data.type === Editor.Project.FUNCTION_TYPE) {
        target = Editor.project.getFunctionById(data.id);
    } else if (data.type === Editor.Project.FUNCTION_BLOCK_TYPE) {
        target = Editor.project.getFunctionBlockById(data.id);
    }
    if(target !== null){
        target.updateWorkspace(Editor.workspace);
    }else{
        console.error("Unabled to find the target to save workspace to, target id: "+data.id);
    }
};

Editor.loadWorkspace = function (data) {
    var target = null;
    if (data.type === 'PROGRAM') {
        target = Editor.project.getProgramById(data.id);
    } else if (data.type === 'FUNCTION') {
        target = Editor.project.getFunctionById(data.id);
    } else if (data.type === 'FUNCTION_BLOCK') {
        target = Editor.project.getFunctionBlockById(data.id);
    }
    if(target !== null){
        Editor.swapWorkspace(target.getWorkspaceDom())
    }else{
        console.error("Unabled to find the target to save workspace to, target id: "+data.id);
    }
};

    window.addEventListener('load', () => {
        Editor.init();
        //document.getElementById('generate').addEventListener('click', () => {
        //Editor.workspace.createVariable('TEST', Blockly.ST.STRING_TYPE);
        var code = Blockly.JavaScript.workspaceToCode(Editor.workspace);
        //    document.getElementById('output').value = code;
        //});
    });