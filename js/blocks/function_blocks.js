'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['function_block_get'] = {};

Blockly.Blocks['function_block_ton'] = {
    init: function () {
        this.jsonInit({
            "type": "timer_test",
            "message0": "TON %1 %2 IN %3 PT %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "t0"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "EN",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
                {
                    "type": "input_value",
                    "name": "PT",
                    "check": Blockly.ST.TIME_TYPE
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
    },

    getFuncBlockDefine: function () {
        return ['fb', this.getFieldValue('NAME'), this.getType(), this.getMembers()];
    },

    getType: function(){
      return "TON";
    },

    getMembers: function () {
        return [
            {
                "name":"Q",
                "check":Blockly.ST.BOOLEAN_TYPE
            },
            {
                "name":"ET",
                "check":Blockly.ST.TIME_TYPE
            }
        ];
    }

};