'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['function_block_get'] = {
    init: function () {
        this.appendDummyInput('function_block')
            .appendField('', 'NAME')
            .appendField('get member')
            .appendField(new Blockly.FieldFunctionBlockMember('name', this), 'MEM');
        this.setOutput(true);
        this.setColour(270);
        this.setTooltip("Tool tip");
    },

    getName: function () {
        return (this.getFieldValue('NAME'));
    },

    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('name', this.getFieldValue('NAME'));
        return container;
    },

    domToMutation: function (xmlElement) {
        var name = xmlElement.getAttribute('name');
        this.setFieldValue(name, 'NAME');
    },

    renameProcedure: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getName())) {
            this.setFieldValue(newName, 'NAME');
        }
    },

    onchange: function () {
        var blockName = this.getFieldValue('NAME');
        var memberName = this.getFieldValue('MEM');
        var member = Blockly.FunctionBlocks.getMemberOfBlock(blockName, memberName);
        if(member){
            this.setOutput(true, member.check);
        }
        //console.log(member);
    }

};

Blockly.Blocks['function_block_set'] = {
    init: function () {
        this.appendDummyInput('function_block')
            .appendField('', 'NAME')
            .appendField('change member')
            .appendField(new Blockly.FieldFunctionBlockMember('name', this, 'input'), 'MEM')
            .appendField('to');
        this.appendValueInput('VALUE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('Tool tip');
        this.setColour(270);
        this.setInputsInline(true)
    },

    getName: function () {
        return (this.getFieldValue('NAME'));
    },

    renameProcedure: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getName())) {
            this.setFieldValue(newName, 'NAME');
        }
    },

    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('name', this.getFieldValue('NAME'));
        return container;
    },

    domToMutation: function (xmlElement) {
        var name = xmlElement.getAttribute('name');
        this.setFieldValue(name, 'NAME');
    },
    onchange: function () {
        var blockName = this.getFieldValue('NAME');
        var memberName = this.getFieldValue('MEM');
        var member = Blockly.FunctionBlocks.getMemberOfBlock(blockName, memberName);
        if(member){
            this.getInput('VALUE').setCheck(member.check);
        }
        //console.log(member);
    }
};

// TIMERS
Blockly.Blocks['function_block_ton'] = {
    init: function () {
        this.jsonInit({
            "message0": "Timer On %1 %2 IN %3 PT %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('t0', this)
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
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "TON";
    },

    getMembers: function () {
        return [
            {
                "name": "IN",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "PT",
                "check": Blockly.ST.TIME_TYPE,
                "type": "input"
            },
            {
                "name": "Q",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
            {
                "name": "ET",
                "check": Blockly.ST.TIME_TYPE,
                "type": "output"
            }
        ];
    }
};
Blockly.Blocks['function_block_tof'] = {
    init: function () {
        this.jsonInit({
            "message0": "Timer Off %1 %2 IN %3 PT %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('tof0', this)
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
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "TOF";
    },

    getMembers: function () {
        return [
            {
                "name": "IN",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "PT",
                "check": Blockly.ST.TIME_TYPE,
                "type": "input"
            },
            {
                "name": "Q",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
            {
                "name": "ET",
                "check": Blockly.ST.TIME_TYPE,
                "type": "output"
            }
        ];
    }
};
Blockly.Blocks['function_block_tp'] = {
    init: function () {
        this.jsonInit({
            "message0": "Timer Pulse %1 %2 IN %3 PT %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('tp0', this)
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
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "TP";
    },

    getMembers: function () {
        return [
            {
                "name": "IN",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "IN",
                "check": Blockly.ST.TIME_TYPE,
                "type": "input"
            },
            {
                "name": "Q",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
            {
                "name": "ET",
                "check": Blockly.ST.TIME_TYPE,
                "type": "output"
            }
        ];
    }
};

//BISTABLE
Blockly.Blocks['function_block_sr'] = {
    init: function () {
        this.jsonInit({
            "message0": "SR Bistable %1 %2 S1 %3 R %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('sr0', this)
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
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "SR";
    },

    getMembers: function () {
        return [
            {
                "name": "S1",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "R",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "Q1",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
        ];
    }
};
Blockly.Blocks['function_block_rs'] = {
    init: function () {
        this.jsonInit({
            "message0": "RS Bistable %1 %2 S %3 R1 %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('rs0', this)
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
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "RS";
    },

    getMembers: function () {
        return [
            {
                "name": "S",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "R1",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "Q1",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
        ];
    }
};

//COUNTERS
Blockly.Blocks['function_block_ctd'] = {
    init: function () {
        this.jsonInit({
            "message0": "Counter Down %1 %2 CD %3 LOAD %4 PV %5",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('ctd0', this)
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
                    "type": "input_value",
                    "name": "PV",
                    "check": Blockly.ST.WORD_TYPE
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "CTD";
    },

    getMembers: function () {
        return [
            {
                "name": "CD",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "LOAD",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "PV",
                "check": Blockly.ST.TIME_TYPE,
                "type": "input"
            },
            {
                "name": "Q",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
            {
                "name": "CV",
                "check": Blockly.ST.WORD_TYPE,
                "type": "output"
            }
        ];
    }
};
Blockly.Blocks['function_block_ctu'] = {
    init: function () {
        this.jsonInit({
            "message0": "Counter Up %1 %2 CU %3 RESET %4 PV %5",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('ctu0', this)
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
                    "type": "input_value",
                    "name": "PV",
                    "check": Blockly.ST.ANY_NUM_TYPE
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "CTU";
    },

    getMembers: function () {
        return [
            {
                "name": "CU",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "RESET",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "PV",
                "check": Blockly.ST.TIME_TYPE,
                "type": "input"
            },
            {
                "name": "Q",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
            {
                "name": "CV",
                "check": Blockly.ST.WORD_TYPE,
                "type": "output"
            }
        ];
    }
};
Blockly.Blocks['function_block_ctud'] = {
    init: function () {
        this.jsonInit({
            "message0": "Counter Up-Down %1 %2 CU %3 CD %4 RESET %5 LOAD %6 PV %7",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('ctud0', this)
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
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "CTUD";
    },

    getMembers: function () {
        return [
            {
                "name": "CD",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "CU",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "RESET",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "LOAD",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "PV",
                "check": Blockly.ST.TIME_TYPE,
                "type": "input"
            },
            {
                "name": "QU",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
            {
                "name": "QD",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
            {
                "name": "CV",
                "check": Blockly.ST.WORD_TYPE,
                "type": "output"
            }
        ];
    }
};

//MISC
Blockly.Blocks['function_block_rtc'] = {
    init: function () {
        this.jsonInit({
            "message0": "Real Time Clock %1 %2 EN %3 PDT %4",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('rtc0', this)
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
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "RTC";
    },

    getMembers: function () {
        return [
            {
              "name":"EN",
              "check":Blockly.ST.BOOLEAN_TYPE,
              "type":"input"
            },
            {
                "name":"PDT",
                "check":Blockly.ST.TIME_OF_DAY_TYPE,
                "type":"input"
            },
            {
                "name": "Q",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
            {
                "name": "CDT",
                "check": Blockly.ST.DATE_AND_TIME_TYPE,
                "type": "output"
            }
        ];
    }
};

//TRIGGER
Blockly.Blocks['function_block_f_trig'] = {
    init: function () {
        this.jsonInit({
            "message0": "Falling Trigger %1 %2 CLK %3",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('f_trig0', this)
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
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "F_TRIG";
    },

    getMembers: function () {
        return [
            {
              "name":"CLK",
              "check":Blockly.ST.BOOLEAN_TYPE,
              "type":"input"
            },
            {
                "name": "Q",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
        ];
    }
};
Blockly.Blocks['function_block_r_trig'] = {
    init: function () {
        this.jsonInit({
            "message0": "Rising Trigger %1 %2 CLK %3",
            "args0": [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": Blockly.FunctionBlocks.findLegalName('r_trig0', this)
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
            "colour": 270,
            "tooltip": "Tool tip",
            "helpUrl": "Help url"
        });
        this.getField('NAME').setValidator(Blockly.FunctionBlocks.rename);
    },

    getName: function () {
        return this.getFieldValue('NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "R_TRIG";
    },

    getMembers: function () {
        return [
            {
                "name": "CLK",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "Q",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "output"
            },
        ];
    }
};

Blockly.Blocks['function_block_def'] = {
    init: function () {
        var nameField = new Blockly.FieldTextInput('',
            Blockly.Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE)
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');
        this.appendValueInput('RETURN')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        if ((this.workspace.options.comments ||
            (this.workspace.options.parentWorkspace &&
                this.workspace.options.parentWorkspace.options.comments)) &&
            Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
            this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
        }
        this.setColour(Blockly.Msg.PROCEDURES_HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        //this.setStatements_(true);
        this.statementConnection_ = null;
    },
};



