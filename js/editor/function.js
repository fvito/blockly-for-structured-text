'use strict';

goog.provide('Editor.Function');

Editor.Function = function (name, opt_type) {
    this.name = name;
    this.returnType = opt_type || 'NONE';
    this.id_ = Blockly.utils.genUid();
    this.workspaceDomText_ = this.getInitialDom_();
};

Editor.Function.prototype.getId = function() {
    return this.id_;
};

Editor.Function.prototype.getWorkspaceDom = function () {
    return Blockly.Xml.textToDom(this.workspaceDomText_);
};

Editor.Function.prototype.updateWorkspace = function (workspace) {
    let dom = Blockly.Xml.workspaceToDom(workspace);
    this.workspaceDomText_ = Blockly.Xml.domToText(dom);
};

Editor.Function.prototype.getInitialDom_ = function () {
    if(this.returnType === 'NONE'){
        return '<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables></variables><block type=\"procedures_defnoreturn\" x=\"238\" y=\"238\" deletable="false" movable="false"><field name=\"NAME\">'+this.name+'</field><comment pinned=\"false\" h=\"80\" w=\"160\">Describe this function...</comment></block></xml>';
    }else{
        return '<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables></variables><block type=\"procedures_defreturn\" x=\"238\" y=\"238\" deletable="false" movable="false"><field name=\"NAME\">'+this.name+'</field><comment pinned=\"false\" h=\"80\" w=\"160\">Describe this function...</comment></block></xml>';
    }
};