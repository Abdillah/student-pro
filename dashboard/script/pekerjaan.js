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

var dummyCourse = [
  {
    'id': 1,
    'name': 'Algoritma dan Struktur Data',
    'description': 'Pembelajaran algoritma dan struktur data.',
    'lecturer': 'Dr. Alba',
    'schedule': 'Kamis, 13.00',
    'location': 'DSDI',
    'score': 'A',
    'weight': {
      'web-programmer': 0,
      'security-engineer': 0,
      'bussiness-analyst': 0,
      'system-analyst': 1,
      'designer': 0,
    },
  },
  {
    'id': 2,
    'name': 'Teknik Pengolahan Citra',
    'description': 'Pembelajaran citra dan pengolahannya.',
    'lecturer': 'Dr. Alba',
    'schedule': 'Kamis, 13.00',
    'location': 'DSDI',
    'score': 'B',
    'weight': {
      'web-programmer': 0,
      'security-engineer': 0,
      'bussiness-analyst': 0,
      'system-analyst': 0,
      'designer': 1,
    },
  },
  {
    'id': 3,
    'name': 'Topik Khusus Teknologi Informasi',
    'description': 'Pembelajaran algoritma dan struktur data.',
    'lecturer': 'Dr. Alba',
    'schedule': 'Kamis, 13.00',
    'location': 'DSDI',
    'score': 'A',
    'weight': {
      'web-programmer': 0,
      'security-engineer': 0,
      'bussiness-analyst': 0,
      'system-analyst': 1,
      'designer': 0,
    },
  },
  {
    'id': 4,
    'name': 'Pemrograman Jaringan dan Web',
    'description': 'Pembelajaran algoritma dan struktur data.',
    'lecturer': 'Dr. Alba',
    'schedule': 'Kamis, 13.00',
    'location': 'DSDI',
    'score': 'C',
    'weight': {
      'web-programmer': 1,
      'security-engineer': 0,
      'bussiness-analyst': 0,
      'system-analyst': 0,
      'designer': 0,
    },
  },
  {
    'id': 5,
    'name': 'Rekayasa Perangkat Lunak',
    'description': 'Pembelajaran rekayasa perangkat lunak.',
    'lecturer': 'Dr. Alba',
    'schedule': 'Kamis, 13.00',
    'location': 'DSDI',
    'score': 'A',
    'weight': {
      'web-programmer': 0,
      'security-engineer': 0,
      'bussiness-analyst': 0,
      'system-analyst': 1,
      'designer': 0,
    },
  },
  {
    'id': 6,
    'name': 'Ekonomi dan Bisnis Teknologi Informasi',
    'description': 'Pembelajaran Ekonomi Bisnis Teknologi Informasi.',
    'lecturer': 'Dr. Alba',
    'schedule': 'Kamis, 13.00',
    'location': 'DSDI',
    'score': 'A',
    'weight': {
      'web-programmer': 0,
      'security-engineer': 0,
      'bussiness-analyst': 1,
      'system-analyst': 0,
      'designer': 0,
    },
  },
  {
    'id': 7,
    'name': 'Aplikasi Berbasis Web',
    'description': 'Pembelajaran Aplikasi Berbasis Web.',
    'lecturer': 'Dr. Alba',
    'schedule': 'Kamis, 13.00',
    'location': 'DSDI',
    'score': 'A',
    'weight': {
      'web-programmer': 1,
      'security-engineer': 0,
      'bussiness-analyst': 0,
      'system-analyst': 0,
      'designer': 0,
    },
  },
  {
    'id': 8,
    'name': 'Jaringan Komputer',
    'description': 'Pembelajaran algoritma dan struktur data.',
    'lecturer': 'Dr. Alba',
    'schedule': 'Kamis, 13.00',
    'location': 'DSDI',
    'score': 'A',
    'weight': {
      'web-programmer': 0,
      'security-engineer': 1,
      'bussiness-analyst': 0,
      'system-analyst': 0,
      'designer': 0,
    },
  },
  {
    'id': 9,
    'name': 'Sistem Operasi',
    'description': 'Pembelajaran Sistem Operasi.',
    'lecturer': 'Dr. Alba',
    'schedule': 'Kamis, 13.00',
    'location': 'DSDI',
    'score': 'B',
    'weight': {
      'web-programmer': 0,
      'security-engineer': 0,
      'bussiness-analyst': 0,
      'system-analyst': 1,
      'designer': 0,
    },
  },
  {
    'id': 10,
    'name': 'Proyek Mahasiswa',
    'description': 'Pembelajaran pembuatan proyek mahasiswa.',
    'lecturer': 'Dr. Alba',
    'schedule': 'Kamis, 13.00',
    'location': 'DSDI',
    'score': 'C',
    'weight': {
      'web-programmer': 0,
      'security-engineer': 0,
      'bussiness-analyst': 1,
      'system-analyst': 0,
      'designer': 0,
    },
  },
];

var courses = new (Backbone.Collection.extend({
    model: Course,
}))(dummyCourse);

var courseList = new (Backbone.View.extend({
    el: '.course-list',
    collection: courses,
    events: {
        'click .course-item': 'toggleDetail'
    },

    initialize: function() {
        this.render();
    },
    render: function() {
        var tmpl = _.template($('#tpl-course-list').text());
        console.log('render');

        this.$el.html('');
        var courses = this.collection.toJSON();
        for (var i = 0; i < courses.length; i++) {
            var view = tmpl(courses[i]);
            // console.log('Course: ', courses[i], view);
            this.$el.append(view);
        }
    },
    checkbox: function(ev) {
      var target = ev.target;
      $(target).parents('.course-item').find('.course-extra-info').toggleClass('hidden');
      console.log($(target).parents('.course-item').find('.course-extra-info'));
    },
}))();

var Job = Backbone.Model.extend({
  defaults: {
    'name': ''
  }
});

var jobs = new (Backbone.Collection.extend({
    model: Job,
}))(dummyJob);

var jobList = new (Backbone.View.extend({
    el: '.job-vacancy-list',
    collection: jobs,

    initialize: function() {
        this.render();

        Event.on('job-selected', function() {
          this.render();
        }, this);
    },
    render: function() {
        var tmpl = _.template($('#tpl-job-list').text());

        this.$el.html('');
        var jobs = this.collection.toJSON();
        for (var i = 0; i < jobs.length; i++) {
            var job = jobs[i];
            var profesion = job['profesion'];
            var recommendType = localStorage.getItem('career-recommendation');
            console.log('Job: ', job, profesion, recommendType, (profesion == recommendType));
            if (profesion == recommendType) {
                var view = tmpl(job);
                // console.log('Course: ', jobs[i], view);
                this.$el.append(view);
            }
        }
    },
}))();

$('input.course-check[type=checkbox]').on('change', function(ev) {
  console.log('Checkbox change');
  window.profesion = {
    'web-programmer'    : 0,
    'security-engineer' : 0,
    'bussiness-analyst' : 0,
    'system-analyst'    : 0,
    'designer'          : 0,
  };

  var inputChecked = $('input.course-check[type=checkbox]:checked');
  if (inputChecked.length == 0) {
      $('#profesion-suggest').text('...');
      return false;
  }

  inputChecked.each(function(i, element) {
    console.log('Checkbox iterate');
    var id = $(this).attr('name');
    var course = dummyCourse[id-1];
    var scoring = {
      'A': 4,
      'B': 3,
      'C': 2,
      'D': 1,
    };

    for (var p in profesion) {
      var score = scoring[course['score']];
      profesion[p] += (course['weight'][p] * score);
    }
  });

  var biggest, max = 0;
  for (var p in profesion) {
    if (profesion[p] > max) {
      max = profesion[p];
      biggest = p;
    }
  }

  localStorage.setItem('career-recommendation', biggest);

  function toCamelCase(str) {
    return str.split(' ').map(function(word){
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  Event.trigger('job-selected', biggest);

  $('#profesion-suggest').text(toCamelCase(biggest.replace('-', ' ')));
});
