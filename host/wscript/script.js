define(
	'util',
	['dojo/dom',
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
		return{
			maketable :function(departments, coursenums){
				//var departments = ["PHYSICS", "COMPSCI", "BIOLOGY"];
				//var coursenums = ["100\'s", "200\'s", "300\'s", "400\'s", "500\'s"];
				
				table = domConstruct.create('table', {id : "coursechoosing"}, dom.byId('coursesDiv'), 'inside');
				for (dep in departments){
					var row = domConstruct.create('tr', {id: "row"+ dep.value}, table, 'inside');
					domConstruct.create('th', {innerHTML : departments[dep]}, row, 'inside');
					for (course in coursenums){
						var cell = domConstruct.create('td', {}, row, 'inside');
						cell = domConstruct.create('label', {for : departments[dep]+coursenums[course], innerHTML : coursenums[course]}, cell, 'inside')
						domConstruct.create('input', {name: "courses" , type : 'checkbox', id : departments[dep]+coursenums[course], value :  departments[dep]+coursenums[course]}, cell, 'before');
						
					}			
				}
			}
		}
	
});
