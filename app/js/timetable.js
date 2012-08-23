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
		
		localStorage : new Store("slots")
	});
	
	
	var Slots = new SlotList;
	
	var SlotView = Backbone.View.extend({
		
		tagName : 'li',
		
		slotTemplate : null,
		
		initialize : function() {
		  alert('start Slotview 1');
		  this.slotTemplate = _.template($('#slot-template').html());
		  alert('start Slotview 2');
		  this.model.bind('change', this.render, this);
		  alert('start Slotview 3');
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

			$.each(slots, function(j, s){
				// alert("test : " + s.ModuleCode + s.LessonType + s.StartTime + s.EndTime + s.DayText +  s.WeekText + s.Venue);
				
				slot = new Slot({
					'moduleCode' : s.ModuleCode,
					'lessonType' : s.LessonType,
					'startTime' : s.StartTime,
					'endTime' : s.EndTime,
					'dayText' : s.DayText,
					'weekText' : s.WeekText,
					'venue' : s.Venue
				});
				Slots.add(slot, { at: j});
				// alert(Slots.at(j).get('lessonType'));
				slot.save({
					moduleCode : s.ModuleCode,
					lessonType : s.LessonType,
					startTime : s.StartTime,
					endTime : s.EndTime,
					dayText : s.DayText,
					weekTex : s.WeekText,
					venue : s.Venue
				});
			});
			alert("fetch: " + Slots.length);
//			this.timetableTemplate = _.template($('#timetable-template').html());
			Slots.bind('add', this.showOne, this);
			Slots.bind('all', this.render, this);
			Slots.bind('reset', this.showAll, this);
//			Slots.fetch();
			this.showAll();
			alert('Slots: ' + Slots.length);
		},
		
		
		render : function() {
			
		},
		
		showOne : function(slot) {
		  alert('2');
		  var view = new SlotView({model : slot});
		  alert('3');
		  $('#slots-list').append(view.render().el);
		  alert('4');
		},
		
		showAll : function() {
		  alert('1')
			Slots.each(this.showOne);
		}
	});

	nusivle.timetable = TimetableView;
})();
