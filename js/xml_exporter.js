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

XMLExporter.writeFileHeader = function () {
    this.writer.writeStartElement("fileHeader");
    this.writer.writeAttributeString("companyName", "Blank");
    this.writer.writeAttributeString("productName", "Blank");
    this.writer.writeAttributeString("productVersion", "1.0");
    this.writer.writeAttributeString("creationDateTime", moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));
    this.writer.writeEndElement();
};

XMLExporter.writeContentHeader = function () {
    this.writer.writeStartElement("contentHeader");
    this.writer.writeAttributeString("name", "Blank Project");
    this.writer.writeAttributeString("modificationDateTime", moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS));
    this.writeCoordinateInfo([1, 1], [1, 1], [1, 1]);
    this.writer.writeEndElement();
};

XMLExporter.writeCoordinateInfo = function (fbdSize, ldSize, sfcSize) {
    this.writer.writeStartElement("coordinateInfo");
    //FBD sizes
    this.writer.writeStartElement("fbd");
    this.writeElementWithAttributes_("spacing", {x: fbdSize[0], y: fbdSize[1]}, true);
    this.writer.writeEndElement();

    //LD sizes
    this.writer.writeStartElement("ld");
    this.writeElementWithAttributes_("spacing", {x: ldSize[0], y: ldSize[1]}, true);
    this.writer.writeEndElement();

    //SFC sizes
    this.writer.writeStartElement("sfc");
    this.writeElementWithAttributes_("spacing", {x: sfcSize[0], y: sfcSize[1]}, true);
    this.writer.writeEndElement();

    this.writer.writeEndElement();
};

XMLExporter.writeProgram = function (workspace) {
    this.writeElementWithAttributes_("pou", {name: "MAIN_PRG", pouType: "program"});
    this.writeVariables(workspace.getAllVariables());

    this.writer.writeStartElement("body");
    this.writer.writeStartElement("ST");

    this.writeElementWithAttributes_("xhtml", {xmlns: "http://www.w3.org/1999/xhtml"}, false);
    this.writer.writeString(Blockly.ST.workspaceToCode(workspace));
    this.writer.writeEndElement();

    this.writer.writeEndElement();
    this.writer.writeEndElement();

};

XMLExporter.writeVariables = function (variables) {
    this.writer.writeStartElement("interface");
    this.writer.writeStartElement("localVars");

    variables.forEach((variable) => {
        //Begin Variable Element
        this.writeElementWithAttributes_("variable", {name: variable.name});
        this.writer.writeStartElement("type");
        //TODO Handle String optinal Length attribute
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

    //End LocalVars Element
    this.writer.writeEndElement();
    //End interface Element
    this.writer.writeEndElement();
};

XMLExporter.writeGenericInstance_ = function () {
    this.writer.writeStartElement("instances")
        .writeStartElement("configurations").writeAttributeString("name", "config0")
        .writeStartElement("resource").writeAttributeString("name", "Res0");
    this.writeElementWithAttributes_("task", {name: "TaskMain", interval: "T#50ms", priority: "0"});
    this.writeElementWithAttributes_("pouInstance", {name: "Inst0", typeName: "MAIN_PRG"}, true);
    this.writer.writeEndElement()
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
    var string = "<" + name + " ";
    for (var key in attrs) {
        string += key + "=" + '"' + attrs[key] + '" ';
    }
    string += "/>";
    this.writer.writeXML(string);
};
