'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['function_block_get'] = {};

Blockly.Blocks['function_block_ton'] = {
    init: function () {
        this.jsonInit({
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
Blockly.Blocks['function_block_tof'] = {
    init: function () {
        this.jsonInit({
            "message0": "TOF %1 %2 IN %3 PT %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "tof0"
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
        return "TOF";
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

Blockly.Blocks['function_block_tp'] = {
    init: function () {
        this.jsonInit({
            "message0": "TP %1 %2 IN %3 PT %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "tof0"
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
        return "TP";
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

Blockly.Blocks['function_block_sr'] = {
    init: function () {
        this.jsonInit({
            "message0": "SR %1 %2 S1 %3 R %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "sr0"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "SET",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
                {
                    "type": "input_value",
                    "name": "RESET",
                    "check": Blockly.ST.BOOLEAN_TYPE
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
        return "SR";
    },

    getMembers: function () {
        return [
            {
                "name":"Q",
                "check":Blockly.ST.BOOLEAN_TYPE
            },
        ];
    }
};

Blockly.Blocks['function_block_rs'] = {
    init: function () {
        this.jsonInit({
            "message0": "RS %1 %2 S %3 R1 %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "rs0"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "SET",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
                {
                    "type": "input_value",
                    "name": "RESET",
                    "check": Blockly.ST.BOOLEAN_TYPE
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
        return "RS";
    },

    getMembers: function () {
        return [
            {
                "name":"Q",
                "check":Blockly.ST.BOOLEAN_TYPE
            },
        ];
    }
};