/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldFunctionBlockMember');

goog.require('Blockly.FieldDropdown');
goog.require('Blockly.Msg');
goog.require('Blockly.FunctionBlocks');
goog.require('goog.asserts');
goog.require('goog.string');


/**
 * Class for a variable's dropdown field.
 * @param {?string} varname The default name for the variable.  If null,
 *     a unique variable name will be generated.
 * @param {Function=} opt_validator A function that is executed when a new
 *     option is selected.  Its sole argument is the new option value.
 * @param {Array.<string>=} opt_variableTypes A list of the types of variables
 *     to include in the dropdown.
 * @param {string=} opt_defaultType The type of variable to create if this
 *     field's value is not explicitly set.  Defaults to ''.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.FieldFunctionBlockMember = function(varname, block) {
    // The FieldDropdown constructor would call setValue, which might create a
    // spurious variable.  Just do the relevant parts of the constructor.
    this.menuGenerator_ = Blockly.FieldFunctionBlockMember.dropdownCreate;
    this.size_ = new goog.math.Size(0, Blockly.BlockSvg.MIN_BLOCK_Y);
    this.block_ = block;
    this.value_ = null;
};
goog.inherits(Blockly.FieldFunctionBlockMember, Blockly.FieldDropdown);

/**
 * Construct a FieldFunctionBlockMember from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (variable,
 *                          variableTypes, and defaultType).
 * @returns {!Blockly.FieldFunctionBlockMember} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldFunctionBlockMember.fromJson = function(options) {
    //var varname = Blockly.utils.replaceMessageReferences(options['variable']);
    //var variableTypes = options['variableTypes'];
    //var defaultType = options['defaultType'];
    //return new Blockly.FieldFunctionBlockMember(varname, null, variableTypes, defaultType);
};

/**
 * Initialize everything needed to render this field.  This includes making sure
 * that the field's value is valid.
 * @public
 */
Blockly.FieldFunctionBlockMember.prototype.init = function() {
    if (this.fieldGroup_) {
        // Dropdown has already been initialized once.
        return;
    }
    Blockly.FieldFunctionBlockMember.superClass_.init.call(this);
};

/**
 * Dispose of this field.
 * @public
 */
Blockly.FieldFunctionBlockMember.prototype.dispose = function() {
    Blockly.FieldFunctionBlockMember.superClass_.dispose.call(this);
    this.workspace_ = null;
};

/**
 * Attach this field to a block.
 * @param {!Blockly.Block} block The block containing this field.
 */
Blockly.FieldFunctionBlockMember.prototype.setSourceBlock = function(block) {
    goog.asserts.assert(!block.isShadow(),
        'Variable fields are not allowed to exist on shadow blocks.');
    Blockly.FieldFunctionBlockMember.superClass_.setSourceBlock.call(this, block);
};

/**
 * Get the variable's ID.
 * @return {string} Current variable's ID.
 */
Blockly.FieldFunctionBlockMember.prototype.getValue = function() {
    return this.value_;
};

/**
 * Get the text from this field, which is the selected variable's name.
 * @return {string} The selected variable's name, or the empty string if no
 *     variable is selected.
 */
Blockly.FieldFunctionBlockMember.prototype.getText = function() {
    return this.value_ ? this.value_ : '';
};


/**
 * Set the variable ID.
 * @param {string} id New variable ID, which must reference an existing
 *     variable.
 */
Blockly.FieldFunctionBlockMember.prototype.setValue = function(text) {
    this.value_ = text;
    this.setText(text);
};


/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<string>} Array of variable names.
 * @this {Blockly.FieldFunctionBlockMember}
 */
Blockly.FieldFunctionBlockMember.dropdownCreate = function() {
    var members = Blockly.FunctionBlocks.getMembersOfBlock(this.block_.getFieldValue('NAME')).members;

    //functionBlocks.sort(Blockly.VariableModel.compareByName);

    var options = [];
    for (var i = 0; i < members.length; i++) {
        // Set the UUID as the internal representation of the variable.
        options[i] = [members[i].name, members[i].name];
    }
    return options;
};

/**
 * Handle the selection of an item in the variable dropdown menu.
 * Special case the 'Rename variable...' and 'Delete variable...' options.
 * In the rename case, prompt the user for a new name.
 * @param {!goog.ui.Menu} menu The Menu component clicked.
 * @param {!goog.ui.MenuItem} menuItem The MenuItem selected within menu.
 */
Blockly.FieldFunctionBlockMember.prototype.onItemSelected = function(menu, menuItem) {
    //var id = menuItem.getValue();
    /*if (this.sourceBlock_ && this.sourceBlock_.workspace) {
        var workspace = this.sourceBlock_.workspace;
    }
    */
    this.setValue(menuItem.getValue());
    this.setText(menuItem.getValue());
};

/**
 * Overrides referencesVariables(), indicating this field refers to a variable.
 * @return {boolean} True.
 * @package
 * @override
 */
Blockly.FieldFunctionBlockMember.prototype.referencesVariables = function() {
    return false;
};

Blockly.Field.register('field_function_block_member', Blockly.FieldFunctionBlockMember);
