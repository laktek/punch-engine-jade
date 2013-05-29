var jade_renderer = require("../lib/jade_engine.js");
var Jade = require("jade");

describe("setup", function() {
  var sample_config = {
	  template_dir: "templates"
	};

  it("set the template dir", function() {
    jade_renderer.setup(sample_config);

		expect(jade_renderer.template_dir).toEqual("templates");
  });

});

describe("creating a new instance", function(){

	it("set the extension as jade", function(){
    var jade_instance = new jade_renderer();
		expect(jade_instance.extension).toEqual(".jade");
	});

});

describe("calling render", function(){

	it("call Jade's compile function with the template and basedir", function(){
    spyOn(Jade, "compile");
    jade_renderer.template_dir = "templates";
    spyOn(process, "cwd").andReturn("path/to");

    var jade_instance = new jade_renderer();
		jade_instance.template = "template";
		jade_instance.content = {};
		jade_instance.partials = {};
		jade_instance.helpers = {};
		jade_instance.lastModified = new Date(2012, 6, 18);
		spyOn(jade_instance, "emit");

		jade_instance.render();
		expect(Jade.compile).toHaveBeenCalledWith("template", { "basedir": 'path/to/templates' });
	});

	it("call compiled template with contents and helpers", function() {
		var dummy_function = jasmine.createSpy();
		spyOn(Jade, "compile").andReturn(dummy_function);

    var jade_instance = new jade_renderer();
		jade_instance.template = "template";
		jade_instance.content = { "content_key": "content_value" };
		jade_instance.partials = {};
		jade_instance.helpers = { "tag": { "tag_helper": "tag_helper_value" }, "block": { "block_helper": "block_helper_value" }};
		jade_instance.lastModified = new Date(2012, 6, 18);
		spyOn(jade_instance, "emit");

		jade_instance.render();
		expect(dummy_function).toHaveBeenCalledWith({ "content_key": "content_value", "tag_helper": "tag_helper_value", "block_helper": "block_helper_value" });
	});

});
