require([
	'dojo/dom',
	'dojo/dom-construct',
	'dojo/on',
	'dojo/_base/fx',
	'dojo/mouse',
	'dojo/dom-style',
	'dojo/query',
	'dojo/store/JsonRest',
	'dojo/store/Observable',
    'dojo/domReady!'
	],  function(dom, domConstruct, on, fx, mouse, domStyle, query, JsonRest, Observable){
		// JSON stores
		var user = Window.sessionStorage.getItem('user');
		var userstore = new Observable(new JsonRest(target: "/users"})); 	
		var userres = store.query({email: });
		
		
});