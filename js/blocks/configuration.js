goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['task_container'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Task")
            .appendField(new Blockly.FieldTextInput(''), "NAME");
        this.appendValueInput("INTERVAL")
            .setCheck(Blockly.ST.TIME_TYPE)
            .appendField("Interval");
        this.appendValueInput("PRIORITY")
            .setCheck(Blockly.ST.INT_TYPE)
            .appendField("Priority");
        this.appendStatementInput("INSTANCES")
            .setCheck('single_task')
            .appendField("Instances");
        this.setColour(230);
        this.setTooltip("Tasks");
        this.setHelpUrl("");
        this.setDeletable(false);
        this.setEditable(false);
        this.setMovable(false);
    },
};
Blockly.Blocks['single_task'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Instance")
            .appendField(new Blockly.FieldTextInput('Inst0'), "NAME")
            .appendField(new Blockly.FieldDropdown(Editor.programMenuBuilder), 'INSTANCE');
        this.setColour(230);
        this.setTooltip("Tasks");
        this.setHelpUrl("");
        this.setNextStatement(true, 'single_task');
        this.setPreviousStatement(true, 'single_task')
    },
};