'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.defineBlocksWithJsonArray([
    {
        "type": "conversion_general",
        "message0": "Convert %1 to %2",
        "args0": [
            {
                "type": "input_value",
                "name": "INPUT"
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    ["INT", "INT"],
                    ["REAL", "REAL"],
                    ["FROM BCD", "BCD_TO"],
                    ["TO BCD", "TO_BCD"]
                ]
            }
        ],
        "output": Blockly.ST.ANY_NUM_TYPE,
        "colour":330,
        "tooltip":"tooltip",
        "helpUrl":"help url"
    },
    {
        "type": "conversion_trunc",
        "message0": "Truncate %1",
        "args0": [
            {
                "type" : "input_value",
                "name" : "INPUT",
                "check" : Blockly.ST.ANY_REAL_TYPE
            }
        ],
        "output" : Blockly.ST.ANY_INT_TYPE,
        "colour":330,
        "tooltip":"Tooltip",
        "helpUrl":"Help url"
    }
]);