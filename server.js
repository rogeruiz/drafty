/*jshint unused:false*/

var express = require('express');
var fs = require('fs');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var marked = require('marked');
var hljs = require('highlight.js');

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

var app = module.exports = express();

app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

hbs.registerHelper('list', function (context, options) {
  var list = '<ul>';
  for (var i = 0, j = context.length; i < j; i++) {
    list = list + '<li>' + options.fn(context[i]) + '</li>';
  }
  return list + '</ul>';
});
hbs.registerPartials(__dirname + '/views/partials');

var humanizeDraft = function (name) {
  var draft = {};
  var title = name.split('.')[0].replace(/-/g, ' ');
  draft.title = title.replace(/\w\S*/g, function (text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  });
  draft.url = name.split('.')[0];
  return draft;
};

var listDrafts = function () {
  var drafts = fs.readdirSync(__dirname + '/drafts');
  drafts = drafts.map(function (file) {
    return humanizeDraft(file);
  });
  return drafts;
};

app.get('/', function (req, res) {
  res.locals = {
    pageTitle: 'All : Drafty',
    drafts: listDrafts()
  };
  res.render('partials/index');
});

app.get('/drafts', function (req, res) {
  res.redirect('/');
});

app.get('/drafts/:title', function (req, res) {
  var title = req.params.title;
  var path = __dirname + '/drafts/' + title + '.markdown';
  var draft = humanizeDraft(title);
  fs.readFile(path, 'utf8', function (err, str) {
    if (err) {
      res.locals = {
        pageTitle: '"' + draft.title + '" Not Found',
        title: draft.title
      };
      res.render('partials/404');
    } else {
      res.locals = {
        pageTitle: draft.title + ' : Drafty',
        draft: marked(str)
      };
      res.render('partials/draft');
    }
  });
});

app.get('*', function (req, res) {
  console.log(req);
  res.locals = {
    pageTitle: '404 Error',
    title: req.url.substr(1)
  };
  res.render('partials/404');
});

if (!module.parent) {
  app.listen('1337');
  console.log('Express started on port %d', 1337);
}
