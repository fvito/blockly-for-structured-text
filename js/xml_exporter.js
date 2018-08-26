'use strict';

var XMLExporter = {};

XMLExporter.writer = {};


XMLExporter.export = function (workspace) {
    //Header
    this.writer = new XMLWriter('UTF-8', '1.0');
    this.writer.writeStartDocument();
    this.writer.writeStartElement("project");

    this.writer.writeAttributeString("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    this.writer.writeAttributeString("xmlns", "http://www.plcopen.org/xml/tc6.xsd");
    this.writer.writeAttributeString("xmlns:xhtml", "http://www.w3.org/1999/xhtml");
    this.writer.writeAttributeString("xsi:schemaLocation", "http://www.plcopen.org/xml/tc6.xsd");

    //File Header
    this.writeFileHeader();
    //End File Header
    //Content Header
    this.writeContentHeader();
    //End Content Header

    //Start Types Element
    this.writer.writeStartElement("types");
    //Start dataTypes Element
    this.writer.writeStartElement("dataTypes");
    //End dataTypes Element
    this.writer.writeEndElement();

    //Start POUS Element
    this.writer.writeStartElement("pous");
    this.writeProgram(workspace);
    //End POUS Element
    this.writer.writeEndElement();
    //End Types Element
    this.writer.writeEndElement();
    this.writer.writeEndElement();

    //Instances Element
    this.writeGenericInstance_();
    //End Instances Element

    //End Project Element
    this.writer.writeEndElement();
    this.writer.writeEndDocument();
    return this.writer.flush();
};

XMLExporter.exportProject = function (project) {
    let workspace = new Blockly.Workspace();
    this.writer = new XMLWriter('UTF-8', '1.0');
    this.writer.writeStartDocument();
    this.writer.writeStartElement("project");

    this.writer.writeAttributeString("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    this.writer.writeAttributeString("xmlns", "http://www.plcopen.org/xml/tc6.xsd");
    this.writer.writeAttributeString("xmlns:xhtml", "http://www.w3.org/1999/xhtml");
    this.writer.writeAttributeString("xsi:schemaLocation", "http://www.plcopen.org/xml/tc6.xsd");

    //File Header
    this.writeFileHeader();
    //End File Header
    //Content Header
    this.writeContentHeader(project.name);
    //End Content Header

    //Start Types Element
    this.writer.writeStartElement("types");
    //Start dataTypes Element
    this.writer.writeStartElement("dataTypes");
    //End dataTypes Element
    this.writer.writeEndElement();

    //Start POUS Element
    this.writer.writeStartElement("pous");

    //Output all programs
    for (var program of project.programs_) {
        workspace.clear();
        Blockly.Xml.domToWorkspace(program.getWorkspaceDom(), workspace);
        this.writeProgram(workspace, program);
    }
    //Output all functions
    for (var func of project.getAllFunctions(true)) {
        workspace.clear();
        Blockly.Xml.domToWorkspace(func.workspace, workspace);
        this.writeFunction(workspace, func);
    }

    //End POUS Element
    this.writer.writeEndElement();
    //End Types Element
    this.writer.writeEndElement();
    this.writer.writeEndElement();

    //Instances Element
    this.writeGenericInstance_(project);
    //End Instances Element

    //End Project Element
    this.writer.writeEndElement();
    this.writer.writeEndDocument();
    return this.writer.flush();
};

XMLExporter.writeFileHeader = function () {
    this.writer.writeStartElement("fileHeader");
    this.writer.writeAttributeString("companyName", "Blank");
    this.writer.writeAttributeString("productName", "Blank");
    this.writer.writeAttributeString("productVersion", "1.0");
    this.writer.writeAttributeString("creationDateTime", moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));
    this.writer.writeEndElement();
};

XMLExporter.writeContentHeader = function (opt_name) {
    this.writer.writeStartElement("contentHeader");
    this.writer.writeAttributeString("name", opt_name == null ? "Blank Project" : opt_name);
    this.writer.writeAttributeString("modificationDateTime", moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));
    this.writeCoordinateInfo([1, 1], [1, 1], [1, 1]);
    this.writer.writeEndElement();
};

XMLExporter.writeCoordinateInfo = function (fbdSize, ldSize, sfcSize) {
    this.writer.writeStartElement("coordinateInfo");
    //FBD sizes
    this.writer.writeStartElement("fbd");
    this.writeElementWithAttributes_("scaling", {x: fbdSize[0], y: fbdSize[1]}, true);
    this.writer.writeEndElement();

    //LD sizes
    this.writer.writeStartElement("ld");
    this.writeElementWithAttributes_("scaling", {x: ldSize[0], y: ldSize[1]}, true);
    this.writer.writeEndElement();

    //SFC sizes
    this.writer.writeStartElement("sfc");
    this.writeElementWithAttributes_("scaling", {x: sfcSize[0], y: sfcSize[1]}, true);
    this.writer.writeEndElement();

    this.writer.writeEndElement();
};

XMLExporter.writeProgram = function (workspace, program) {
    this.writeElementWithAttributes_("pou", {name: program.name, pouType: "program"});
    this.writeVariables(workspace.getAllVariables(), Blockly.FunctionBlocks.allFunctionBlocks(workspace));

    this.writer.writeStartElement("body");
    this.writer.writeStartElement("ST");

    this.writeWorkspace(workspace);

    this.writer.writeEndElement();
    this.writer.writeEndElement();
    this.writer.writeEndElement();

};

XMLExporter.writeFunction = function (workspace, func) {
    this.writeElementWithAttributes_("pou", {name: func.name, pouType: "function"});
    this.writer.writeStartElement("interface");
    this.writer.writeElementString("returnType", `<${func.return_type}/>`);
    this.writeFunctionVariables(workspace, func);

    this.writer.writeEndElement();

    this.writer.writeStartElement("body");
    this.writer.writeStartElement("ST");

    this.writeWorkspace(workspace);

    this.writer.writeEndElement();
    this.writer.writeEndElement();
    this.writer.writeEndElement();
};

XMLExporter.writeVariables = function (variables, functionBlocks) {
    this.writer.writeStartElement("interface");
    this.writer.writeStartElement("localVars");

    variables.forEach((variable) => {
        //Begin Variable Element
        if (variable.address !== '') {
            this.writeElementWithAttributes_("variable", {name: variable.name, address: variable.address});
        } else {
            this.writeElementWithAttributes_("variable", {name: variable.name});
        }
        this.writer.writeStartElement("type");
        //TODO Handle String optional Length attribute
        this.writeClosedElement_(variable.type);
        this.writer.writeEndElement();
        if (variable.initValue !== '') {
            this.writer.writeStartElement("initialValue");
            this.writeElementWithAttributes_("simpleValue", {value: variable.initValue}, true);
            this.writer.writeEndElement();
        }
        //End Variable Element
        this.writer.writeEndElement();
    });

    functionBlocks.forEach((functionBlock) => {
        this.writeElementWithAttributes_("variable", {name: functionBlock.name});
        this.writer.writeStartElement("type");
        this.writeClosedElement_("derived", {name: functionBlock.type});
        this.writer.writeEndElement();
        //End Variable Element
        this.writer.writeEndElement();
    });

    //End LocalVars Element
    this.writer.writeEndElement();
    //End interface Element
    this.writer.writeEndElement();
};

//TODO Refactor to use writeVariables function
XMLExporter.writeFunctionVariables = function (workspace, func) {
    var variables = workspace.getAllVariables();
    console.log(variables);
    //Input variables
    this.writer.writeStartElement("inputVars");
    func.args.filter(arg => arg.is_reference !== 'TRUE').forEach((arg) => {
        this.writeElementWithAttributes_("variable", {name: arg.variable.name});
        this.writer.writeStartElement("type");
        //TODO Handle String optional Length attribute
        this.writeClosedElement_(arg.variable.type);
        this.writer.writeEndElement();
        this.writer.writeEndElement();
    });
    this.writer.writeEndElement();

    //InOut variables
    this.writer.writeStartElement("inOutVars");
    func.args.filter(arg => arg.is_reference === 'TRUE').forEach((arg) => {
        this.writeElementWithAttributes_("variable", {name: arg.variable.name});
        this.writer.writeStartElement("type");
        //TODO Handle String optional Length attribute
        this.writeClosedElement_(arg.variable.type);
        this.writer.writeEndElement();
        this.writer.writeEndElement();
    });
    this.writer.writeEndElement();

    //Filter local input variables from local variables
    this.writer.writeStartElement("localVars");
    let localVars = [];
    for (let variable of workspace.getAllVariables()) {
        if (func.args.findIndex(i => i.variable.id_ === variable.id_) === -1) {
            localVars.push(variable);
        }
    }
    //Local variables
    localVars.forEach((variable) => {
        this.writeElementWithAttributes_("variable", {name: variable.name});
        this.writer.writeStartElement("type");
        //TODO Handle String optional Length attribute
        this.writeClosedElement_(variable.type);
        this.writer.writeEndElement();
        if (variable.initValue !== '') {
            this.writer.writeStartElement("initialValue");
            this.writeElementWithAttributes_("simpleValue", {value: variable.initValue}, true);
            this.writer.writeEndElement();
        }
        this.writer.writeEndElement();
    });

    let functionBlocks = Blockly.FunctionBlocks.allFunctionBlocks(workspace);
    functionBlocks.forEach((functionBlock) => {
        this.writeElementWithAttributes_("variable", {name: functionBlock.name});
        this.writer.writeStartElement("type");
        this.writeClosedElement_("derived", {name: functionBlock.type});
        this.writer.writeEndElement();
        //End Variable Element
        this.writer.writeEndElement();
    });

    this.writer.writeEndElement();

};

XMLExporter.writeWorkspace = function (workspace) {
    this.writeElementWithAttributes_("xhtml:p", false);
    this.writer.writeCDATA(Blockly.ST.workspaceToCode(workspace));
    this.writer.writeEndElement();
};

XMLExporter.writeGenericInstance_ = function (opt_project) {
    this.writer.writeStartElement("instances")
        .writeStartElement("configurations")
        .writeStartElement("configuration").writeAttributeString("name", "config0")
        .writeStartElement("resource").writeAttributeString("name", "Res0");
    this.writeElementWithAttributes_("task", {name: "TaskMain", interval: "T#50ms", priority: "0"});

    if (opt_project) {
        let i = 0;
        for (const program of opt_project.programs_) {
            this.writeElementWithAttributes_("pouInstance", {name: `Inst${i++}`, typeName: program.name}, true);
        }
    } else {
        this.writeElementWithAttributes_("pouInstance", {name: "Inst0", typeName: "MAIN_PRG"}, true);
    }

    this.writer.writeEndElement()
        .writeEndElement()
        .writeEndElement()
        .writeEndElement();
};

XMLExporter.writeElementWithAttributes_ = function (element, attrs, close = false) {
    this.writer.writeStartElement(element);
    for (var key in attrs) {
        this.writer.writeAttributeString(key, attrs[key]);
    }
    if (close) {
        this.writer.writeEndElement();
    }
};

XMLExporter.writeClosedElement_ = function (name, attrs) {
    var string = "<" + name;
    if (attrs) {
        string += " ";
    }
    for (var key in attrs) {
        string += key + "=" + '"' + attrs[key] + '" ';
    }
    string += "/>";
    this.writer.writeXML(string);
};
