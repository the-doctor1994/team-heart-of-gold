require([
	'dojo/dom',
	'dojo/dom-construct',
	'dojo/on',
	'dojo/_base/fx',
	'dojo/mouse',
	'dojo/dom-style',
	'dojo/query',
    'dojo/domReady!'
	], function(dom, domConstruct, on, fx, mouse, domStyle, query){
		// fade elements
		var kanye = fx.fadeOut({node: "fadeout",duration:400});
		var west = fx.fadeIn({node: "fadein",duration:400});
		var eynak = fx.fadeIn({node: "fadeout",duration:400});
		var tsew = fx.fadeOut({node: "fadein",duration:400});
		var fadebox = dom.byId("fadediv");
		
		on(fadebox, mouse.enter, function(evt){
			kanye.play();
			west.play();
		});
		on(fadebox, mouse.leave, function(evt){
			eynak.play();
			tsew.play();
		});
		
		
		
	});

//moved this here from index.js anc user.js -Grayson

require([
		"dojo/store/Memory",
		"dojo/store/JsonRest",
		"dojo/store/Observable",
		"dojo/store/Cache"
	],

	function(Memory, JsonRest, Observable, Cache){
		/* some data */
		var store = new JsonRest({
			target: ""/* some resource */
		});
		store = new Memory({}); /* some stuff */
	});
