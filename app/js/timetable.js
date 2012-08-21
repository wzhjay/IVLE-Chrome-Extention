//imetablr

(function(){
	// time table model
	var Slot = Backbone.Model.extend({
		
		defaults : {
			moduleCode : "unknown module code",
			lessonType : "unknown type",
			startTime : "unknown start time",
			endTime : "unknown end time",
			dayText : "unknown day text",
			weekText : "unknown week text",
			venue : "unknown venue",
		},
		
		
		initialize : function() {
			
		}
		
	});
	
	var slot = new Slot;
	
	var SlotList = Backbone.Collection.extend({
		
		model : Slot,
		
		slotsStorage : new Store("slots")
	});
	
	
	var Slots = new SlotList;
	
	var SlotView = Backbone.View.extend({
		
		tagName : 'li',
		
		slotTemplate : null,
		
		initialize : function() {
			this.slotTemplate = _.template(('#slot-template').html());
			this.model.bind('change', this.render, this);
		},
		
		render : function() {
			this.$el.html(this.slotTemplate(this.model.toJSON()));
			this.$el.addClass('mySlot', this.model.get('moduleCode'))
		}
	});
	
	var TimetableView = Backbone.View.extend({
		
		el : ('#timetable'),
		
		timetableTemplate: null,
		
		initialize : function() {
			var slots = nusivle.user.slots;
			alert(slots.length);
			$.each(slots, function(j, s){
				alert("test : " + s.ModuleCode + s.LessonType + s.StartTime + s.EndTime + s.DayText +  s.WeekText + s.Venue);
				
				slot.set({
					'moduleCode' : s.ModuleCode,
					'lessonType' : s.LessonType,
					'startTime' : s.StartTime,
					'endTime' : s.EndTime,
					'dayText' : s.DayText,
					'weekText' : s.WeekText,
					'venue' : s.Venue
				});
				
				Slots.add(slot);

				// this.model.save({moduleCode : s.ModuleCode,
						// lessonType : s.LessonType,
						// startTime : s.StartTime,
						// endTime : s.EndTime,
						// dayText : s.DayText,
						// weekText : s.WeekText,
						// venue : s.Venue});
			});
			alert(Slots.length);
			alert(Slots.at(0).get('moduleCode'));
			
			this.timetableTemplate = _.template($('#timetable-template').html());
			
			Slots.bind('add', this.showOne, this);
			Slots.bind('all', this.render, this);
			Slots.bind('reset', this.render, this);
			
			Slots.fetch();
		},
		
		
		render : function() {
			
		},
		
		showOne : function() {
			var view = new SlotView({model : Slot});
			$('#slots-list').append(view.render().el);
		},
		
		showAll : function() {
			Slot.each(this.showOne);
		},
	});
	
	nusivle.timetable = TimetableView;
})();
