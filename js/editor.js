'use strict';

/**
 * Create a namespace for the application.
 */
var Editor = {};

Editor.workspace = null;

Editor.init = function () {
    Editor.blocklyInit();

    $('#variableDialog').on('show.bs.modal', () => {
        $('#variableType').empty();
        $.each(Blockly.ST.ANY_ELEMENTARY_TYPE, (i, p) => {
            $('#variableType').append($('<option></option>').val(p).html(p));
        });
    });

};

Editor.blocklyInit = () => {
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

Editor.blockCreated = (event) => {
    var block = Editor.workspace.getBlockById(event.blockId);
    if (block.type === 'variables_declare') {

    }
};

Editor.blockChanged = (event) => {
    var block = Editor.workspace.getBlockById(event.blockId);
    if (block.type === 'variables_declare') {
        Editor.variableChangeEvent(block, event);
    }
};

Editor.variableChangeEvent = (block, event) => {
    var ws = Editor.workspace;
    if (event.name === 'NAME') {

    }
    else if (event.name === 'TYPE') {

    }

};

Editor.newVariable = () => {
    $('#variableDialog').modal('show');
};

Editor.createNewVariable = () => {
    var form = $('#newVariableForm');
    var values = form.serializeArray();
    Editor.createNewVariable_(values[0].value, values[1].value, values[2].value, values[3].value);
    form[0].reset();
    $('#variableDialog').modal('hide');
};

Editor.createNewVariable_ = (name, type, opt_value, opt_address) => {
    Editor.workspace.createVariable(name, type, opt_value, opt_address);
};

Editor.exportAsXml = function (fileName) {
    var xml = XMLExporter.export(Editor.workspace);
    var blob = new Blob([xml], {type: "application/xml"});
    saveAs(blob, fileName+".xml");
};

Editor.exportAsSt = function (fileName) {
    var code = Blockly.ST.fullOutput(Editor.workspace);
    var blob = new Blob([code], {type:"text/plain"});
    saveAs(blob, fileName+".st");
};


Editor.saveProject = function (fileName) {
    //$('#saveDialog').modal('show');
    var xml = Blockly.Xml.workspaceToDom(Editor.workspace);
    xml = Blockly.Xml.domToText(xml);
    var blob = new Blob([xml], {type:"application/xml"});
    saveAs(blob, fileName+".xml");
};

Editor.showSaveDialog = function(callback) {
    bootbox.prompt({
        title:"Save file",
        inputType:"text",
        value:'Project',
        callback: function (result) {
            if(result) {
                callback(result);
            }
        }
    });
};

Editor.loadProject = function () {
    bootbox.confirm({
        message:"Are you sure you want to overwrite your current work?",
        buttons: {
            confirm: {
                label:"Yes",
                className: 'btn-success'
            },
            cancel: {
                label:"No"
            },
        },
        callback: function (result) {
            if(result){
                var openFileDialog = $("#openFile");
                openFileDialog.on("change", (e)=> {
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

Editor.devGenerateXml = function(){
    var xml = Blockly.Xml.workspaceToDom(Editor.workspace);
    xml = Blockly.Xml.domToPrettyText(xml);
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