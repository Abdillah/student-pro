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

var Book = Backbone.Model.extend({
    defaults: {
        id: '',
        name: '',
        description: '',
    }
});

var books = new (Backbone.Collection.extend({
    model: Book,
    events: {
        'sync': 'onBooksLoaded'
    },

    initialize: function() {

    },
    onBooksLoaded: function() {
        Event.trigger('books:loaded');
        console.log('[EVENT] books:loaded');
    },
}))(dummyBook);

var filteredBooks = new (Backbone.Collection.extend({
    model: Book,
}))(dummyBook);

var booksToRead = localStorage.getItem('book-to-read-list');
var toReadBooks = new (Backbone.Collection.extend({
    model: Book,
}))(booksToRead || []);

var bookList = new (Backbone.View.extend({
    el: '.book-list',
    collection: filteredBooks,
    events: {
        'click .checkbook-to-read': 'toggleToRead'
    },

    initialize: function() {
        this.collection.on('sync', function() {
            this.render();
        }, this);

        var sourceBooks = books;
        Event.on('passion:filter', function(text) {
            text = text.toLowerCase()
                .replace(' ', '-');
            var filteredBooksArr = sourceBooks.filter(function(book, list, a) {
              console.log('book', book, list, a);
              return (book.toJSON()['passions'].indexOf(text) != -1);
            });
            console.log('[EVENT] on passion:filter ', filteredBooksArr);
            this.collection.reset(filteredBooksArr);
            this.collection.trigger('sync');
        }, this);

        Event.on('books:loaded', function() {
            console.log('[EVENT] on books:loaded');
            this.render();
        }, this);
    },
    render: function() {
        var tmpl = _.template($('#tpl-book-list').text());

        this.$el.html('');
        var books = this.collection.toJSON();
        for (var i = 0; i < books.length; i++) {
          console.log('Iter ', books[i]);
            var view = tmpl(books[i]);
            // console.log('Book: ', books[i], view);
            this.$el.append(view);
        }
    },
    toggleToRead: function(ev) {
        var target = ev.target;

        var ids = [];
        $('input.checkbook-to-read[type=checkbox]:checked').each(function(id, model) { ids.push(parseInt($(model).attr('name'))); });

        var booksToRead = this.collection.filter(function(model, i) {
            console.log('Model, does it read? ', model);
            return ids.indexOf(model['id']) != -1;
        });
        localStorage.setItem('book-to-read-list', JSON.stringify(booksToRead));

        toReadBooks.set(booksToRead);
    },
}))();

var toReadList = new (Backbone.View.extend({
    el: '.book-reading-list',
    collection: toReadBooks,

    initialize: function() {
        this.collection.on('update', function() {
            this.render();
        }, this);
    },
    render: function() {
        var tmpl = _.template($('#tpl-book-to-read').text());

        this.$el.html('');
        var books = this.collection.toJSON();
        for (var i = 0; i < books.length; i++) {
            console.log('Book: ', books[i]);
            var view = tmpl(books[i]);
            console.log('Book: ', books[i], view);
            this.$el.append(view);
        }
    },
    toggleToRead: function(ev) {
        var target = ev.target;
        var id = $(target).data('id');
        console.log(this.collection.filter(function(i, model) {
            return model['id'] == id;
        }));
        toReadBooks.set([this.collection.filter(function(i, model) {
            return model['id'] == id;
        })]);
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

  $('#profesion-suggest').text(biggest);
});
