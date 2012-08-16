// Modules

(function(){
  // Module model
  console.log("start loading modules");
  var Module = Backbone.Model.extend({
	
	// default attrs for module item
	defaults : function() {
	  return {
		title	: "unknown module...",
		moduleCode : "unknow module code...",
		anns	: "no announcements...",
		workbins: "no workbins...",
		unreadAnn: 0
	  };
	},
	
	
	// initialization and ensure each module has title
	initialize : function(){
//	  
//	  this.title = this.defaults.title;
//	  this.moduleCode = this.defaults.moduleCode;
//	  this.unreadAnn = this.defaults.unreadAnn;
//	  this.anns = this.defaults.anns;
//	  this.workbins = this.defalults.workbins;
//	  
//	  
	  if(true){
		this.set({
		  "title" : this.defaults.title,
		  "moduleCode" : this.defaults.moduleCode,
		  "unreadAnn" : this.defaults.unreadAnn,
		  "anns": this.defaults.anns,
		  "workbins": this.defalults.workbins
		  
		});
	  }
	}  
	  // link attrs with API data, announcements, workbins
	  
	
  });
  
  console.log(Module);
  
  var ModuleList = Backbone.Collection.extend({
	
	model : Module,
	
	modulesStorage : new Store("modules")
	
//	initialize : function() {
//	  
//	}
	
  });
  
  // global module list collection
  var Modules = new ModuleList;
  
  //----------------------------------------------------------------------------
  
  // Module item View

  var ModuleView = Backbone.View.extend({
	
	// ..list tag for module
	tagName : "li",
	
	// create the template function for a single item.
	moduleTemplate : null,
	
//	// DOM events specific to an module item
//	events : {
//	  "click .grid" : "viewDetail"
//	 // "hover .grid" : "onMouseover"
//	},
	
	
	// initialzation and bind events
	initialize: function() {
	  this.moduleTemplate = _.template($('#module-template').html());
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
//  
//  var ModuleInfoView = Backbone.View.extend({
//	
//	// ..list tag for module
//	tagName : "div",
//	
//	// create the tempalate for module details
//	infoTamplate : _.template($('#module-info-template').html()),	
//	
//	// initialzation and bind events
//	initialize: function() {
//	  this.model.bind('change', this.render, this)
//	},
//	
//	
//	// re-render the model items
//	render: function() {
//	  this.$el.html(this.infoTemplate(this.model.toJSON()));
//	  return this;
//	}
//	
//  });
  
  
  //----------------------------------------------------------------------------
  
  ModulesAppView = Backbone.View.extend({
	
	// html element
	el : $('#modules-info'),
	
	// template for modules-info area
	modulesAppTempale: null,
	
	// events
//	events: {
//	  "click .grid" : "viewModuleInfo"
//	},
	
	// initialzation
	initialize: function() {
	  var modules = nusivle.user.modules;
	  alert("in modules:" + modules);
	  $.each(modules, function(i, m) {
		alert("test:" + m.CourseName);
//		Modules.add(new Module(
//		  {
//			title: m.CourseName,
//			moduleCode: m.CourseCode,
//			anns: m.Announcements,
//			workbins: m.Workbins
//		  })
//		);
	  });
	  alert("title: " + Modules.at(1).title);
	  
	  this.moduleAppTemplate = _.template($('modulesapp-template').html());
	  this.moduleArea = this.$('modules-area');
	  this.infoArea = this.$('info-area');
	  
	  Modules.bind('all', this.render, this);
	  
	  Modules.fetch();
	},
	  
	// render the module app view
	render: function() {
	  var count = Modules.length;
	  if(count) {
		this.moduleArea.show();
		this.moduleArea.html(this.moduleTemplate({count : count, Modules : Modules}));  // pass the model collection to tempalte script
		this.infoArea.hide();
	  }
	},
	
	showOne: function(module) {
	  var view  = new ModuleView({model: module});
	  $('#module-list').append(view.render().el);
	},
	
	showAll: function() {
	  Modules.each(this.showOne)
	}
	
	
//	// dropdown collapse
//	viewModuleInfo : function(anns, workbins) {
//	  var info = new ModuleInfoView();   // 
//	  this.infoArea.html(info.infoTamplate({anns : anns, workbins : workbins}));
	
  });
  
  $(document).ready(function() {
   
   // kick things off
//  ModuleApp = new ModulesAppView;
  
 });
  
  nusivle.modules = ModulesAppView;
})();