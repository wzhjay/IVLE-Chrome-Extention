// Modules

(function(){
  // Module model
  console.log("start loading modules");
  var Module = Backbone.Model.extend({
	
	// default attrs for module item
	defaults :  {
		title	: "unknown module...",
		moduleCode : "unknow module code...",
		anns	: "no announcements...",
		workbins: "no workbins...",
		unreadAnn: 0
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
//	  if(true){
//		this.set({
//		  "title" : this.defaults.title,
//		  "moduleCode" : this.defaults.moduleCode,
//		  "unreadAnn" : this.defaults.unreadAnn,
//		  "anns": this.defaults.anns,
//		  "workbins": this.defaults.workbins
//		  
//		});
//	  }
	}  
	  // link attrs with API data, announcements, workbins
	  
	
  });
  
  var ModuleList = Backbone.Collection.extend({
	
	model : Module,
	
	modulesStorage : new Store("modules")
	
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
	  this.$el.addClass('myModule', this.model.get('title'))
	  return this;
	}
	
  });

  
  //----------------------------------------------------------------------------
  
  ModulesAppView = Backbone.View.extend({
	
	// html element
	el : $('#modules'),
	
	// template for modules-info area
	modulesAppTempale: null,
	
	// events
//	events: {
//	  "click .grid" : "viewModuleInfo"
//	},
	
	// initialzation
	initialize: function() {
	  var modules = nusivle.user.modules;
	  $.each(modules, function(i, m) {
		alert("test:" + m.Announcements);
		Modules.add(new Module(
		  {
			title : m.CourseName,
			moduleCode: m.CourseCode,
			anns: m.Announcements,
			workbins: m.Workbins
		  }
		)
		);
	  });
	  alert((Modules[0].get("anns"))[0].Description);
	  
	  this.moduleAppTemplate = _.template($('#modulesapp-template').html());
//	  this.moduleArea = this.$('.modules-area');
//	  this.infoArea = this.$('.info-area');
	  
	  Modules.bind('add', this.showOne, this);
	  Modules.bind('all', this.render, this);
	  MOdules.bind('reset', this.showAll, this);
	  
	  Modules.fetch();
	},
	  
	// render the module app view
	render: function() {
	  var count = Modules.length;
	  if(count) {
//		this.moduleArea.show();
//		this.moduleArea.html(this.moduleTemplate({title : count}));  // pass the model collection to tempalte script
//		this.infoArea.hide();
	  }
	},
	
	showOne: function() {
	  var view  = new ModuleView({model: Module});
	  $('#modules-list').append(view.render().el);
	},
	
	showAll: function() {
	  Modules.each(this.showOne)
	}
	
	
//	// dropdown collapse
//	viewModuleInfo : function(anns, workbins) {
//	  var info = new ModuleInfoView();   // 
//	  this.infoArea.html(info.infoTamplate({anns : anns, workbins : workbins}));
	
  });

// nusivle.module = Module;
//  nusivle.ModuleList = Modules;
  nusivle.modules = ModulesAppView;
})();