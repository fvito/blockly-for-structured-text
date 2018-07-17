'use strict'

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.defineBlocksWithJsonArray([
    {
        "type": "time_value",
        "message0": "%1 unit %2",
        "args0": [
            {
                "type": "field_number",
                "name": "VALUE",
                "value": 0
            },
            {
                "type": "field_dropdown",
                "name": "UNIT",
                "options": [
                    [
                        "milliseconds",
                        "ms"
                    ],
                    [
                        "seconds",
                        "s"
                    ],
                    [
                        "minutes",
                        "m"
                    ],
                    [
                        "hours",
                        "h"
                    ],
                    [
                        "days",
                        "d"
                    ]
                ]
            }
        ],
        "output": Blockly.ST.TIME_TYPE,
        "colour": 230,
        "tooltip": "Tool tip",
        "helpUrl": "Help url"
    },
    {
        "type": "date_value",
        "message0": "Date %1",
        "args0": [
            {
                "type": "field_date",
                "name": "DATE",
            },
        ],
        "output": Blockly.ST.TIME_TYPE,
        "colour": 230,
        "tooltip": "Tool tip",
        "helpUrl": "Help url"
    },
    {
        "type": "time_of_day_value",
        "message0": "%1 h %2 m %3 s",
        "args0": [
            {
                "type": "field_number",
                "name": "HOUR_VALUE",
                "value": 15,
                "min": 0,
                "max": 23
            },
            {
                "type": "field_number",
                "name": "MIN_VALUE",
                "value": 36,
                "min": 0,
                "max": 59
            },
            {
                "type": "field_number",
                "name": "SEC_VALUE",
                "value": 55,
                "min": 0,
                "max": 59
            }
        ],
        "output": Blockly.ST.TIME_OF_DAY_TYPE,
        "colour": 230,
        "tooltip": "Tooltip",
        "helpUrl": "Help url"
    },
    {
        "type":"date_and_time_value",
        "message0": "on %1 at %2 h %3 m %4 s",
        "args0": [
            {
                "type":"field_date",
                "name":"DATE_VALUE"
            },
            {
                "type": "field_number",
                "name": "HOUR_VALUE",
                "value": 15,
                "min": 0,
                "max": 23
            },
            {
                "type": "field_number",
                "name": "MIN_VALUE",
                "value": 36,
                "min": 0,
                "max": 59
            },
            {
                "type": "field_number",
                "name": "SEC_VALUE",
                "value": 55,
                "min": 0,
                "max": 59
            }
        ],
        "output": Blockly.ST.TIME_OF_DAY_TYPE,
        "colour": 230,
        "tooltip": "Tooltip",
        "helpUrl": "Help url"
    }
]);