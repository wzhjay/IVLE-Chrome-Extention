// Todo

(function(){
  var App;
  // todo Model
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title : "empty todo...",
        order : Todos.nextOrder(),
        done  : false
      };
    },

    // Ensure that each todo created has `title`.
    initialize: function() {
	  console.log('todo item init');
      if (!this.get("title")) {
        this.set({"title": this.defaults.title});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    },

    // Remove this Todo from *localStorage* and delete its view.
    clear: function() {
      this.destroy();
    }

  });
  
  
  // Todo collections
  // backed by localStorage
  var TodoList = Backbone.Collection.extend({
	
	// model in collections of backbone
	model : Todo,
	
	// save all items under the same namespace
	localStorage: new Store("todos"),
	
	// Filter the list of todo items that unfinished
	remaining: function() {
      return this.without.apply(this, this.done());
    },
	
	// Filter down the items that finished
	done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },
	
	// generate the next id of todo items
	nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
	
	// items sorted by original orders
	comparator: function(todo) {
      return todo.get('order');
    }
	
  });
  
  // create new todoList as global collection
  var Todos = new TodoList;
  console.log(Todos);
  //----------------------------------------------------------------------------
  //
  // Todo item View
  
  // DOM elements
  var TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: null,

    // The DOM events specific to an item.
    events: {
      "click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },
	
	// initialization and bind events
	initialize: function() {
	  
	  
	  console.log('initialize todo view');
	  this.template = _.template($('#item-template').html());
	  
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },
	
	
	// re-render the titles of todo items
	render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.input = $('.edit');
      return this;
    },
	
	// Toggle the done state of model
	toggleDone : function(){
	  this.model.toggle();
	},
	
	// switch to editing mode
	edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },
	
	// close the editing mode
	close: function() {
      var value = this.input.val();
      if (!value) this.clear();
      this.model.save({title: value});
      this.$el.removeClass("editing");
    },
	
	// enter key press, done editing
	updateOnEnter: function(e) {
	  console.log(e);
      if (e.keyCode == 13) this.close();
    },
	
	// remove items, destroy model
	clear: function() {
      this.model.clear();
    }
	
  });

  //----------------------------------------------------------------------------
  // Application
  var AppView = Backbone.View.extend({

	// from html page
	el : $('#todo'),

	// template for line of statistic atr the buttom
	statsTemplate: null,

	// events
	events: {
//      "keypress #new-todo":  "createOnEnter",
//      "click #clear-completed": "clearCompleted",
//      "click #toggle-all": "toggleAllComplete"
    },

	// initialization and bind the events to global 'Todos' list of collection
	// any loading preexisting todos saved in localStorage
	initialize: function() {
	  console.log('initialize todolist view');
//	  return;
	  this.statsTemplate = _.template($('#stats-template').html());
      this.input = $("#new-todo");
      this.allCheckbox = $("#toggle-all")[0];
	  
      Todos.bind('add', this.addOne, this);
      Todos.bind('reset', this.addAll, this);
      Todos.bind('all', this.render, this);

      this.footer = $('footer');
      this.main = $('#main');

      Todos.fetch();
    },


	// re-rendering the app just to refresh the statistics
	render: function() {
      var done = Todos.done().length;
      var remaining = Todos.remaining().length;
	  console.log('start rendering');
	  console.log(Todos.length + ' items');
      if (Todos.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.footer.hide();
      }
      this.allCheckbox.checked = !remaining;
	  console.log('finish rendering');
    },


	  // add one items to the list
	  addOne: function(todo) {
		var view = new TodoView({model: todo});
		$("#todo-list").append(view.render().el);
    },
	  
	  // add all items in the Todos collection at once
	  addAll: function() {
		Todos.each(this.addOne);
	  },

	  // keypresee to create new todo model and save to localStorage
//	  createOnEnter: function() {
//		console.log(e);
//		if (e.keyCode != 13) return;
//		if (!App.input.val()) return;
//
//		Todos.create({title: this.input.val()});
//		this.input.val('');
//	   },


	  // clear all done items, destroy models
	  clearCompleted: function() {
		console.log('clear completed');
		_.each(Todos.done(), function(todo){ todo.clear(); });
		return false;
    },


	  toggleAllComplete: function () {
		console.log('toggle all as completed');
		var done = this.allCheckbox.checked;
		Todos.each(function (todo) { todo.save({'done': done}); });
		console.log(Todos);
    }
	
  });
//  // kick things off
//  var App = new AppView;
  
 $(document).ready(function() {
   
   // kick things off
  App = new AppView;
  
  function simulateKeyPress(character) {
	jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
  }
  $(function() {
	$('body').keypress(function(e) {
		console.log('key has pressed!');
		if (e.which != 13) return;
//		if($('.editing input').val()) App.view.close();
		if (!App.input.val()) return;
		
		Todos.create({title: App.input.val()});
		App.input.val('');
//		this.input.val('');
	  });
	simulateKeyPress("e");
  });
  
  $('#clear-completed').click(function() {
	App.clearCompleted();
  });
  
  $('#toggle-all').click(function() {
	App.toggleAllComplete();
  });
  
 });
  
})();


