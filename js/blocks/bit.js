'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg.MATH_HUE. (2018 April 5)
 */
Blockly.Constants.Math.HUE = 230;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    // Block for numeric value.
    {
        "type": "bit_shift",
        "message0": "%1 %2 by %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIR",
                "options": [
                    [
                        "Left Shift",
                        "LEFT"
                    ],
                    [
                        "Right Shift",
                        "RIGHT"
                    ],
                    [
                        "Rot. Right",
                        "ROT_RIGHT"
                    ],
                    [
                        "Rot. Left",
                        "ROT_LEFT"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "IN"
            },
            {
                "type": "input_value",
                "name": "BITS"
            }
        ],
        "inputsInline": true,
        "colour": 230,
        "tooltip": "Bit shift",
        "helpUrl": ""
    }
]);
