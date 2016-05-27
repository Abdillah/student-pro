var Event = _.clone(Backbone.Events);
var apiurl = '//api.hackathon.project/';

var passionFilter = new (Backbone.View.extend({
    el: '#passion-filter-input',
    events: {
        'keyup': 'onKeyUp'
    },

    onKeyUp: function(ev) {
        console.log(ev.which);
        // On enter
        if (ev.which == 13) {
            passionText = this.$el.val();
            console.log('passion text: ', passionText);
            Event.trigger('passion:filter', passionText);
        }
    },
}))();

var Course = Backbone.Model.extend({
    defaults: {
        id: '',
        name: '',
        description: '',
    }
});

var courses = new (Backbone.Collection.extend({
    model: Course,
    events: {
        'sync': 'onCoursesLoaded'
    },

    initialize: function() {

    },
    onCoursesLoaded: function() {
        Event.trigger('courses:loaded');
        console.log('[EVENT] courses:loaded');
    },
}))([]);

var courseList = new (Backbone.View.extend({
    el: '.course-list',
    collection: courses,
    events: {
        'click .course-item': 'toggleDetail'
    },

    initialize: function() {
        this.collection.on('sync', function() {
            this.render();
        }, this);

        Event.on('passion:filter', function(text) {
            console.log('[EVENT] on passion:filter');
            this.collection.url = apiurl + 'courses/skill/' + text;
            this.collection.fetch();
        }, this);

        Event.on('courses:loaded', function() {
            console.log('[EVENT] on courses:loaded');
            this.render();
        }, this);
    },
    render: function() {
        var tmpl = _.template($('#tpl-course-list').text());

        this.$el.html('');
        var courses = this.collection.toJSON();
        for (var i = 0; i < courses.length; i++) {
            var view = tmpl(courses[i]);
            // console.log('Course: ', courses[i], view);
            this.$el.append(view);
        }
    },
    toggleDetail: function(ev) {
      var target = ev.target;
      $(target).parents('.course-item').find('.course-extra-info').toggleClass('hidden');
      console.log($(target).parents('.course-item').find('.course-extra-info'));
    },
}))();