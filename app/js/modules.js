// Modules

(function(){
  // Module model
  var Module = Backbone.Model.extend({
	
	// default attrs for module item
	defaults : function() {
	  return {
		title	: "unknown module...",
		moduleCode : "unknow module code...",
		coursID : 0,
		anns	: "no announcements...",
		workbins: "no workbins...",
		unreadAnn: 0
	  };
	},
	
	
	// initialization and ensure each module has title
	initialize : function(){
	  if(!this.get("title")){
		this.get({
		  "title" : this.defaults.title,
		  "moduleCode" : this.defaults.moduleCode,
		  "unreadAnn" : this.defaults.unreadAnn
		});
	  }
	  
	  // link attrs with API data, announcements, workbins
	  
	  
	}
	
	
  });
  
  
  
  var ModuleList = Backbone.Collection.extend({
	
	model : Module,
	
	modulesStorage : new Store("modules")
	
  });
  
  // global module list collection
  var Modules = new ModuleList;
  
  var ModuleCount = _.size(ModuleList);
  //----------------------------------------------------------------------------
  
  // Module item View

  var ModuleView = Backbone.View.extend({
	
	// ..list tag for module
	tagName : "li",
	
	// create the template function for a single item.
	moduleTemplate : _.template($('#module-template').html()),
	
//	// DOM events specific to an module item
//	events : {
//	  "click .grid" : "viewDetail"
//	 // "hover .grid" : "onMouseover"
//	},
	
	
	// initialzation and bind events
	initialize: function() {
	  this.model.bind('change', this.render, this)
	},
	
	
	// re-render the model items
	render: function() {
	  this.$el.html(this.moduleTemplate(this.model.toJSON()));
	  return this;
	}
	
//	// view the module details
//	viewDetail: function() {
//	  this.$el.html(this.infoTamplate(this.model.toJSON()));
//	  return this;
//	}
	
  });
  
  
  //---------------------------------------------------------------------------
  
  // module info view
  
  var ModuleInfoView = Backbone.View.extend({
	
	// ..list tag for module
	tagName : "div",
	
	// create the tempalate for module details
	infoTamplate : _.template($('#module-info-template').html()),	
	
	// initialzation and bind events
	initialize: function() {
	  this.model.bind('change', this.render, this)
	},
	
	
	// re-render the model items
	render: function() {
	  this.$el.html(this.infoTemplate(this.model.toJSON()));
	  return this;
	}
	
  });
  
  
  //----------------------------------------------------------------------------
  
  ModulesAppView = Backbone.View.extend({
	
	// html element
	el : $('#modules-info'),
	
	// template for modules-info area
	modulesAppTempale: _.template($('modulesapp-template').html()),
	
	// events
	events: {
	  "click .grid" : "viewModuleInfo"
	},
	
	// initialzation
	initialize: function() {
	  this.moduleArea = this.$('modules-area');
	  this.infoArea = this.$('info-area');
	},
	  
	// render the module app view
	render: function(module) {
	  var count = Modules.length;
	  if(count) {
		this.moduleArea.show();
		this.moduleArea.html(this.moduleTemplate({count : count, Modules : Modules}));  // pass the model collection to tempalte script
		this.infoArea.hide();
	  }
	},
	
	// dropdown collapse
	viewModuleInfo : function(anns, workbins) {
	  var info = new ModuleInfoView();   // 
	  this.infoArea.html(info.infoTamplate({anns : anns, workbins : workbins}));
	}
	
  });
  
  
  
})();