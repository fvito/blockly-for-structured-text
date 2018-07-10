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
        var code = Blockly.ST.workspaceToCode(Editor.workspace);
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
    Editor.createNewVariable_(values[0].value, values[1].value, values[2].value);
    form[0].reset();
    $('#variableDialog').modal('hide');
};

Editor.createNewVariable_ = (name, type, opt_value) => {
    Editor.workspace.createVariable(name, type, opt_value);
};

window.addEventListener('load', () => {
    Editor.init();
    //document.getElementById('generate').addEventListener('click', () => {
        //Editor.workspace.createVariable('TEST', Blockly.ST.STRING_TYPE);
        var code = Blockly.JavaScript.workspaceToCode(Editor.workspace);
    //    document.getElementById('output').value = code;
    //});
});