/*
* Template engine for Jade
* Based on Jade - https://github.com/visionmedia/jade#readme
*/

var BaseEngine = require("punch").TemplateEngines.Base;
var Jade = require("jade");

var _ = require("underscore");
var util = require('util');
var path = require('path');

function JadeEngine(options){
	BaseEngine.call(this, options);

	this.extension = JadeEngine.extension;
	this.renderFunction = JadeEngine.renderFunction;
};

util.inherits(JadeEngine, BaseEngine);

JadeEngine.extension = ".jade";
JadeEngine.template_dir = null;

JadeEngine.setup = function(config){
	JadeEngine.template_dir = config.template_dir;
}

JadeEngine.renderFunction = function(template, content, partials, helpers) {
	var content_with_helpers = _.extend({}, content, helpers.tag, helpers.block);

	var compiled_template = Jade.compile(template, { "basedir": path.join(process.cwd(), JadeEngine.template_dir) });
	return compiled_template(content_with_helpers);
}

module.exports = JadeEngine;
