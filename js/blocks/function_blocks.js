'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['function_block_get'] = {};
// TIMERS
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
                    "text": "tp0"
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

//BISTABLE
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

//COUNTERS
Blockly.Blocks['function_block_ctd'] = {
    init: function () {
        this.jsonInit({
            "message0": "CTD %1 %2 CD %3 LOAD %4 PV %5",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "ctd0"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "CD",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
                {
                    "type": "input_value",
                    "name": "LOAD",
                    "check": Blockly.ST.TIME_TYPE
                },
                {
                    "type":"input_value",
                    "name":"PV",
                    "check":Blockly.ST.WORD_TYPE
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
        return "CTD";
    },

    getMembers: function () {
        return [
            {
                "name":"Q",
                "check":Blockly.ST.BOOLEAN_TYPE
            },
            {
                "name":"CV",
                "check":Blockly.ST.WORD_TYPE
            }
        ];
    }
};
Blockly.Blocks['function_block_ctu'] = {
    init: function () {
        this.jsonInit({
            "message0": "CTU %1 %2 CU %3 RESET %4 PV %5",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "ctu0"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "CU",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
                {
                    "type": "input_value",
                    "name": "RESET",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
                {
                    "type":"input_value",
                    "name":"PV",
                    "check":Blockly.ST.WORD_TYPE
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
        return "CTU";
    },

    getMembers: function () {
        return [
            {
                "name":"Q",
                "check":Blockly.ST.BOOLEAN_TYPE
            },
            {
                "name":"CV",
                "check":Blockly.ST.WORD_TYPE
            }
        ];
    }
};
Blockly.Blocks['function_block_ctud'] = {
    init: function () {
        this.jsonInit({
            "message0": "CTUD %1 %2 CU %3 CD %4 RESET %5 LOAD %6 PV %7",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "ctud0"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "CU",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
                {
                    "type": "input_value",
                    "name": "CD",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
                {
                    "type": "input_value",
                    "name": "RESET",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
                {
                    "type": "input_value",
                    "name": "LOAD",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
                {
                    "type": "input_value",
                    "name": "PV",
                    "check": Blockly.ST.WORD_TYPE
                },
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
        return "CTUD";
    },

    getMembers: function () {
        return [
            {
                "name":"QU",
                "check":Blockly.ST.BOOLEAN_TYPE
            },
            {
                "name":"QD",
                "check":Blockly.ST.BOOLEAN_TYPE
            },
            {
                "name":"CV",
                "check":Blockly.ST.WORD_TYPE
            }
        ];
    }
};

//MISC
Blockly.Blocks['function_block_rtc'] = {
    init: function () {
        this.jsonInit({
            "message0": "RTC %1 %2 EN %3 PDT %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "rtc0"
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
                    "name": "PDT",
                    "check": Blockly.ST.DATE_AND_TIME_TYPE
                },
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
        return "RTC";
    },

    getMembers: function () {
        return [
            {
                "name":"Q",
                "check":Blockly.ST.BOOLEAN_TYPE
            },
            {
                "name":"CDT",
                "check":Blockly.ST.DATE_AND_TIME_TYPE
            }
        ];
    }
};
//TRIGGER
Blockly.Blocks['function_block_f_trig'] = {
    init: function () {
        this.jsonInit({
            "message0": "F-Trig %1 %2 CLK %3",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "f_trig0"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "CLK",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
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
        return "F_TRIG";
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

Blockly.Blocks['function_block_r_trig'] = {
    init: function () {
        this.jsonInit({
            "message0": "R-Trig %1 %2 CLK %3",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "r_trig0"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "CLK",
                    "check": Blockly.ST.BOOLEAN_TYPE
                },
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
        return "R_TRIG";
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


