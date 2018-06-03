'use strict';

/**
 * Create a namespace for the application.
 */
var Editor = {};

Editor.workspace = null;

Editor.init = function() {
    Editor.workspace = Blockly.inject("blocklyArea",
        {grid:
                {spacing: 25,
                    length: 3,
                    colour: '#ccc',
                    snap: true},
            media: 'lib/blockly/media/',
            toolbox: document.getElementById("toolbox"),
            zoom:
                {controls: true,
                    wheel: true}
        });


    Editor.workspace.addChangeListener(() => {
        var code = Blockly.ST.workspaceToCode(Editor.workspace);
        document.getElementById('output').value = code;
    })

};

window.addEventListener('load', Editor.init);