'use strict';

goog.provide('Blockly.Constants.Conversions');

goog.require('Blockly.Blocks');
goog.require('Blockly');



Blockly.defineBlocksWithJsonArray([
    {
        "type": "conversion_trunc",
        "message0": "Truncate %1",
        "args0": [
            {
                "type": "input_value",
                "name": "INPUT",
                "check": Blockly.ST.ANY_REAL_TYPE
            }
        ],
        "output": Blockly.ST.ANY_INT_TYPE,
        "colour": 60,
        "tooltip": "Tooltip",
        "helpUrl": "Help url"
    },
    {
        "type": "conversion_to_bcd",
        "message0": "Convert %1 from %2 to BCD",
        "args0": [
            {
                "type": "input_value",
                "name": "INPUT",
                "check": Blockly.ST.ANY_BIT_TYPE
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": Blockly.ST.MAPPED_INT_TYPES
            }
        ],
        "output": Blockly.ST.ANY_BIT_TYPE,
        "colour": 60,
        "tooltip": "Tool tip",
        "helpUrl": "Help url"
    },
    {
        "type": "conversion_from_bcd",
        "message0": "Convert %1 from BCD to %2",
        "args0": [
            {
                "type": "input_value",
                "name": "INPUT",
                "check": Blockly.ST.ANY_BIT_TYPE
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": Blockly.ST.MAPPED_INT_TYPES
            }
        ],
        "output": Blockly.ST.ANY_INT_TYPE,
        "colour": 60,
        "tooltip": "Tool tip",
        "helpUrl": "Help url"
    },
]);

Blockly.Blocks["conversion_general"] = {
    init: function () {
        this.jsonInit({
            "type": "conversion_general",
            "message0": "Convert %1 from %2 to %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "INPUT"
                },
                {
                    "type": "field_dropdown",
                    "name": "IN_TYPE",
                    "options": Blockly.ST.MAPPED_TYPES
                },
                {
                    "type": "field_dropdown",
                    "name": "OUT_TYPE",
                    "options": Blockly.ST.MAPPED_TYPES
                }
            ],
            "output": Blockly.ST.ANY_NUM_TYPE,
            "colour": 60,
            "tooltip": "tooltip",
            "helpUrl": "help url"
        });
    },

    onchange: function () {
        var inputType = this.getFieldValue("IN_TYPE");
        var outputType = this.getFieldValue("OUT_TYPE");

        if (inputType === outputType) {
            this.setWarningText("Input and output types are the same");
        } else {
            this.setWarningText(null);
        }
        this.getInput("INPUT").setCheck(inputType);
        this.setOutput(outputType);

    },
};