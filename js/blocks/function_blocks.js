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
        if (member) {
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
        if (member) {
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
                "name": "EN",
                "check": Blockly.ST.BOOLEAN_TYPE,
                "type": "input"
            },
            {
                "name": "PDT",
                "check": Blockly.ST.TIME_OF_DAY_TYPE,
                "type": "input"
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

Blockly.Blocks['function_block_call'] = {
    init: function () {
        this.appendDummyInput('TOPROW')
            .appendField('', 'NAME')
            .appendField(new Blockly.FieldTextInput(Blockly.FunctionBlocks.findLegalName('fb0', this)), 'BLOCK_NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(270);
        // Tooltip is set in renameProcedure.
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        this.arguments_ = [];
        this.outputs_ = [];

        this.argumentVarModels_ = [];
        this.outputVarModels_ = [];

        this.members_ = [];

        this.quarkConnections_ = {};
        this.quarkIds_ = null;
    },

    setFunctionBlockParameters_: function (inputs, inputIds, outputs, outputIds) {
        this.arguments_ = inputs;
        this.outputs_ = outputs;
        this.members_ = [];
        this.updateShape_();

        for (var input of inputs) {
            this.members_.push({"name": input, "check": "", "type": "input"});
        }

        for (var output of outputs) {
            this.members_.push({"name": output, "check": "", "type": "output"});
        }
    },

    /**
     * Modify this block to have the correct number of arguments.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        for (var i = 0; i < this.arguments_.length; i++) {
            var field = this.getField('ARGNAME' + i);
            if (field) {
                Blockly.Events.disable();
                try {
                    field.setValue(this.arguments_[i]);
                } finally {
                    Blockly.Events.enable();
                }
            } else {
                field = new Blockly.FieldLabel(this.arguments_[i]);
                var input = this.appendValueInput('ARG' + i)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(field, 'ARGNAME' + i);
                input.init();
            }
        }

        while (this.getInput('ARG' + i)) {
            this.removeInput('ARG' + i);
            i++;
        }

    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('name', this.getFieldValue('NAME'));
        for (var i = 0; i < this.arguments_.length; i++) {
            var input = document.createElement('inArg');
            input.setAttribute('name', this.arguments_[i]);
            container.appendChild(input);
        }

        for (var i = 0; i < this.outputs_.length; i++) {
            var output = document.createElement('outArg');
            output.setAttribute('name', this.outputs_[i]);
            container.appendChild(output);
        }

        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var name = xmlElement.getAttribute('name');
        this.name = name;
        this.setFieldValue(name, 'NAME');
        var inputs = [];
        var inputIds = [];

        var outputs = [];
        var outputIds = [];

        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'inarg') {
                inputs.push(childNode.getAttribute('name'));
            } else if (childNode.nodeName.toLowerCase() === 'outarg') {
                outputs.push(childNode.getAttribute('name'));
            }
        }
        this.setFunctionBlockParameters_(inputs, inputIds, outputs, outputIds);
    },

    getName: function () {
        return this.getFieldValue('BLOCK_NAME');
    },

    getFuncBlockDefine: function () {
        return {
            'source': this,
            'block_type': 'fb',
            'name': this.getName(),
            'type': this.getType(),
            'members': this.getMembers()
        };
    },

    getType: function () {
        return "FB_CUSTOM";
    },

    getMembers: function () {
        return this.members_;
    }


};

Blockly.Blocks['function_block_def'] = {
    init: function () {
        var nameField = new Blockly.FieldTextInput('',
            Blockly.FunctionBlocks.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE)
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');
        this.appendStatementInput('STACK')
            .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
        this.setMutator(new Blockly.Mutator(['function_blocks_mutatorarg']));
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
        this.outputs_ = [];

        this.argumentVarModels_ = [];
        this.outputsVarModels_ = [];

        this.statementConnection_ = null;
    },

    /**
     * Update the display of parameters for this procedure definition block.
     * Display a warning if there are duplicately named parameters.
     * @private
     * @this Blockly.Block
     */
    updateParams_: function () {
        // Check for duplicated arguments.
        var badArg = false;
        var hash = {};
        //console.log(this.arguments_.concat(this.outputs_));
        var allArguments = this.arguments_.concat(this.outputs_);
        for (var i = 0; i < allArguments.length; i++) {
            if (hash['arg_' + allArguments[i].toLowerCase()]) {
                badArg = true;
                break;
            }
            hash['arg_' + allArguments[i].toLowerCase()] = true;
        }
        if (badArg) {
            this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
        } else {
            this.setWarningText(null);
        }
        // Merge the arguments into a human-readable list.
        var paramString = '';
        if (allArguments.length) {
            paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS +
                ' ' + allArguments.join(', ');
        }
        // The params field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
            this.setFieldValue(paramString, 'PARAMS');
        } finally {
            Blockly.Events.enable();
        }
    },
    /**
     * Create XML to represent the argument inputs.
     * @param {boolean=} opt_paramIds If true include the IDs of the parameter
     *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function (opt_paramIds) {
        var container = document.createElement('mutation');
        if (opt_paramIds) {
            container.setAttribute('name', this.getFieldValue('NAME'));
        }
        for (var i = 0; i < this.argumentVarModels_.length; i++) {
            var parameter = document.createElement('arg');
            var argModel = this.argumentVarModels_[i].variable;
            parameter.setAttribute('name', argModel.name);
            parameter.setAttribute('varId', argModel.getId());
            parameter.setAttribute('type', argModel.type);
            parameter.setAttribute("reference", this.argumentVarModels_[i].is_reference);
            if (opt_paramIds && this.paramIds_) {
                parameter.setAttribute('paramId', this.paramIds_[i]);
            }
            container.appendChild(parameter);
        }
        for (i = 0; i < this.outputsVarModels_.length; i++) {
            var output = document.createElement('out');
            var outModel = this.outputsVarModels_[i];
            output.setAttribute('name', outModel.name);
            output.setAttribute('varId', outModel.getId());
            output.setAttribute('type', outModel.type);
            if (opt_paramIds && this.outIds_) {
                output.setAttribute('outId', this.outIds_[i]);
            }
            container.appendChild(output);
        }

        // Save whether the statement input is visible.
        if (!this.hasStatements_) {
            container.setAttribute('statements', 'false');
        }
        return container;
    },
    /**
     * Parse XML to restore the argument inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'arg') {
                var varName = childNode.getAttribute('name');
                var varType = childNode.getAttribute('type');
                var varId = childNode.getAttribute('varId');
                var isReference = childNode.getAttribute('reference');
                this.arguments_.push(varName);
                var variable = Blockly.Variables.getOrCreateVariablePackage(
                    this.workspace, varId, varName, varType);
                this.argumentVarModels_.push({"variable": variable, "is_reference": isReference});
            } else if (childNode.nodeName.toLocaleLowerCase() == 'out') {
                var varName = childNode.getAttribute('name');
                var varType = childNode.getAttribute('type');
                var varId = childNode.getAttribute('varId');
                this.outputs_.push(varName);
                var variable = Blockly.Variables.getOrCreateVariablePackage(
                    this.workspace, varId, varName, varType);
                this.outputsVarModels_.push(variable);
            }
        }
        this.updateParams_();
        Blockly.FunctionBlocks.mutateCallers(this);
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('function_blocks_mutatorcontainer');
        containerBlock.initSvg();

        // Parameter list.
        var connection = containerBlock.getInput('INPUTS').connection;
        for (var i = 0; i < this.arguments_.length; i++) {
            var paramBlock = workspace.newBlock('function_blocks_mutatorarg');
            paramBlock.initSvg();
            paramBlock.setFieldValue(this.arguments_[i], 'NAME');
            // Store the old location.
            paramBlock.oldLocation = i;
            connection.connect(paramBlock.previousConnection);
            connection = paramBlock.nextConnection;
        }

        var connection = containerBlock.getInput('OUTPUTS').connection;
        for (var i = 0; i < this.outputs_.length; i++) {
            var paramBlock = workspace.newBlock('function_blocks_mutatorarg');
            paramBlock.initSvg();
            paramBlock.setFieldValue(this.outputs_[i], 'NAME');
            // Store the old location.
            paramBlock.oldLocation = i;
            connection.connect(paramBlock.previousConnection);
            connection = paramBlock.nextConnection;
        }

        // Initialize procedure's callers with blank IDs.
        Blockly.FunctionBlocks.mutateCallers(this);
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        // Parameter list.
        this.arguments_ = [];
        this.outputs_ = [];

        this.paramIds_ = [];
        this.outIds_ = [];

        this.argumentVarModels_ = [];
        this.outputsVarModels_ = [];

        var paramBlock = containerBlock.getInputTargetBlock('INPUTS');
        while (paramBlock) {
            var varName = paramBlock.getFieldValue('NAME');
            var varType = paramBlock.getFieldValue('TYPE');
            //console.log(`name: ${varName}, type:${varType}`);
            this.arguments_.push(varName);
            var variable = this.workspace.getVariable(varName, varType);
            //console.log(variable);
            this.argumentVarModels_.push({"variable": variable, "is_reference": paramBlock.getFieldValue('REF')});
            this.paramIds_.push(paramBlock.id);
            paramBlock = paramBlock.nextConnection &&
                paramBlock.nextConnection.targetBlock();
        }

        paramBlock = containerBlock.getInputTargetBlock('OUTPUTS');
        while (paramBlock) {
            var varName = paramBlock.getFieldValue('NAME');
            var varType = paramBlock.getFieldValue('TYPE');
            console.log(`name: ${varName}, type:${varType}`);
            this.outputs_.push(varName);
            var variable = this.workspace.getVariable(varName, varType);
            //console.log(variable);
            this.outputsVarModels_.push(variable);
            this.outIds_.push(paramBlock.id);
            paramBlock = paramBlock.nextConnection &&
                paramBlock.nextConnection.targetBlock();
        }

        this.updateParams_();
        Blockly.FunctionBlocks.mutateCallers(this);
    },
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES NOT have a return value.
     * @this Blockly.Block
     */
    getFuncBlockDefine: function () {
        return [this.getFieldValue('NAME'), this.arguments_, this.outputs_, false];
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function () {
        return this.arguments_.concat(this.outputs_);
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<!Blockly.VariableModel>} List of variable models.
     * @this Blockly.Block
     */
    getVarModels: function () {
        return this.argumentVarModels_.map(i => i.variable);
    },

    /**
     * Notification that a variable is renaming.
     * If the ID matches one of this block's variables, rename it.
     * @param {string} oldId ID of variable to rename.
     * @param {string} newId ID of new variable.  May be the same as oldId, but
     *     with an updated name.  Guaranteed to be the same type as the old
     *     variable.
     * @this Blockly.Block
     */
    renameVarById: function (oldId, newId) {
        var oldVariable = this.workspace.getVariableById(oldId);
        if (oldVariable.type != '') {
            // Procedure arguments always have the empty type.
            return;
        }
        var oldName = oldVariable.name;
        var newVar = this.workspace.getVariableById(newId);

        var change = false;
        for (var i = 0; i < this.argumentVarModels_.length; i++) {
            if (this.argumentVarModels_[i].variable.getId() === oldId) {
                this.arguments_[i] = newVar.name;
                this.argumentVarModels_[i].variable = newVar;
                change = true;
            }
        }
        if (change) {
            this.displayRenamedVar_(oldName, newVar.name);
        }
    },
    /**
     * Notification that a variable is renaming but keeping the same ID.  If the
     * variable is in use on this block, rerender to show the new name.
     * @param {!Blockly.VariableModel} variable The variable being renamed.
     * @package
     */
    updateVarName: function (variable) {
        var newName = variable.name;
        var change = false;
        for (var i = 0; i < this.argumentVarModels_.length; i++) {
            if (this.argumentVarModels_[i].variable.getId() === variable.getId()) {
                var oldName = this.arguments_[i];
                this.arguments_[i] = newName;
                change = true;
            }
        }
        if (change) {
            this.displayRenamedVar_(oldName, newName);
        }
    },
    /**
     * Update the display to reflect a newly renamed argument.
     * @param {string} oldName The old display name of the argument.
     * @param {string} newName The new display name of the argument.
     * @private
     */
    displayRenamedVar_: function (oldName, newName) {
        this.updateParams_();
        // Update the mutator's variables if the mutator is open.
        if (this.mutator.isVisible()) {
            var blocks = this.mutator.workspace_.getAllBlocks();
            for (var i = 0, block; block = blocks[i]; i++) {
                if (block.type === 'function_blocks_mutatorarg' &&
                    Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
                    block.setFieldValue(newName, 'NAME');
                }
            }
        }
    },

    callType_: 'function_blocks_call',

};

Blockly.Blocks['function_blocks_mutatorcontainer'] = {
    /**
     * Mutator block for procedure container.
     * @this Blockly.Block
     */
    init: function () {
        this.appendDummyInput()
            .appendField("inputs");
        this.appendStatementInput("INPUTS")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("outputs");
        this.appendStatementInput("OUTPUTS");
        this.setColour(Blockly.Msg.PROCEDURES_HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['function_blocks_mutatorarg'] = {
    /**
     * Mutator block for procedure argument.
     * @this Blockly.Block
     */
    init: function () {
        var field = new Blockly.FieldTextInput('x', this.validator_);
        // Hack: override showEditor to do just a little bit more work.
        // We don't have a good place to hook into the start of a text edit.
        field.oldShowEditorFn_ = field.showEditor_;
        var newShowEditorFn = function () {
            this.createdVariables_ = [];
            this.oldShowEditorFn_();
        };
        field.showEditor_ = newShowEditorFn;

        var typeField = new Blockly.FieldDropdown(Blockly.ST.MAPPED_TYPES, this.typeValidator_);

        this.appendDummyInput()
            .appendField('variable')
            .appendField(field, 'NAME')
            .appendField("of type")
            .appendField(typeField, 'TYPE')
            .appendField('is reference')
            .appendField(new Blockly.FieldCheckbox('FALSE'), 'REF');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(Blockly.Msg.PROCEDURES_HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = false;

        // Create the default variable when we drag the block in from the flyout.
        // Have to do this after installing the field on the block.
        field.onFinishEditing_ = this.deleteIntermediateVars_;
        // Create an empty list so onFinishEditing_ has something to look at, even
        // though the editor was never opened.
        field.createdVariables_ = [];
        field.onFinishEditing_('x');
    },

    typeValidator_: function (newType) {
        var oldType = this.sourceBlock_.getFieldValue('TYPE');
        var outerWs = Blockly.Mutator.findParentWs(this.sourceBlock_.workspace);
        var varName = this.sourceBlock_.getFieldValue('NAME');
        console.log('newType', newType);
        var model = outerWs.getVariable(varName, oldType);
        if (!model) {
            return null;
        }
        outerWs.changeVariableType(model.getId(), newType);
        return newType;
    },

    /**
     * Obtain a valid name for the procedure argument. Create a variable if
     * necessary.
     * Merge runs of whitespace.  Strip leading and trailing whitespace.
     * Beyond this, all names are legal.
     * @param {string} varName User-supplied name.
     * @return {?string} Valid name, or null if a name was not specified.
     * @private
     * @this Blockly.FieldTextInput
     */
    validator_: function (varName) {
        //console.log('validator', varName);
        var outerWs = Blockly.Mutator.findParentWs(this.sourceBlock_.workspace);
        varName = varName.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        if (!varName) {
            return null;
        }
        var model = outerWs.getVariable(varName, this.sourceBlock_.getFieldValue('TYPE'));
        if (model && model.name != varName) {
            // Rename the variable (case change)
            outerWs.renameVarById(model.getId(), varName);
        }
        if (!model) {
            model = outerWs.createVariable(varName, this.sourceBlock_.getFieldValue('TYPE'));
            if (model && this.createdVariables_) {
                this.createdVariables_.push(model);
            }
        }
        return varName;
    },
    /**
     * Called when focusing away from the text field.
     * Deletes all variables that were created as the user typed their intended
     * variable name.
     * @param {string} newText The new variable name.
     * @private
     * @this Blockly.FieldTextInput
     */
    deleteIntermediateVars_: function (newText) {
        var outerWs = Blockly.Mutator.findParentWs(this.sourceBlock_.workspace);
        if (!outerWs) {
            return;
        }
        for (var i = 0; i < this.createdVariables_.length; i++) {
            var model = this.createdVariables_[i];
            if (model.name != newText) {
                outerWs.deleteVariableById(model.getId());
            }
        }
    }
};



