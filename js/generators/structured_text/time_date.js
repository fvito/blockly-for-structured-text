'use strict';

goog.provide('Blockly.ST.time_date');

goog.require('Blockly.ST');

Blockly.ST['time_value'] = function (block) {
  var value = block.getFieldValue("VALUE");
  var unit = block.getFieldValue("UNIT");

  return ["TIME#"+value+unit, Blockly.ST.ORDER_ATOMIC];
};

Blockly.ST['date_value'] = function (block) {
    var date = block.getFieldValue("DATE");
    return ["DATE#"+date, Blockly.ST.ORDER_ATOMIC];;
};

Blockly.ST['time_of_day_value'] = function (block) {
  var hours = block.getFieldValue("HOUR_VALUE");
  var minutes = block.getFieldValue("MIN_VALUE");
  var seconds = block.getFieldValue("SEC_VALUE");

  return ["TIME_OF_DAY#"+hours+":"+minutes+":"+seconds, Blockly.ST.ORDER_ATOMIC];;
};

Blockly.ST['date_and_time_value'] = function (block) {
    var hours = block.getFieldValue("HOUR_VALUE");
    var minutes = block.getFieldValue("MIN_VALUE");
    var seconds = block.getFieldValue("SEC_VALUE");
    var date = block.getFieldValue("DATE_VALUE");

    return ["DATE_AND_TIME#"+date+"-"+hours+":"+minutes+":"+seconds, Blockly.ST.ORDER_ATOMIC];;

};

