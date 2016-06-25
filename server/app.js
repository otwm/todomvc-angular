var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//body parser 미들웨어 추가
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


//static 설정
app.use('/', express.static(path.join(__dirname, '../client')));

//node module 설정
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

var todos = [
    {
        id: 1,
        title: 'code Lab',
        completed: true
    },
    {
        id: 2,
        title: 'study',
        completed: false
    },
    {
        id: 3,
        title: '수영',
        completed: true
    }
];

/**
 * 라우팅
 */
app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.get('/api/todos', function (req, res) {
    res.json(todos);
});

app.post('/api/todos', function (req, res) {
    console.log(req.body);
    var newTodoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    var newTodo = {
        id: newTodoId,
        title: req.body.title,
        completed: false
    };
    todos.push(newTodo);

    res.json(newTodo);
});

app.del('/api/todos/:id', function (req, res) {
    var index = todos.findIndex(function (t) {
        return t.id === parseInt(req.params.id);
    });

    // remove
    if (index > -1) {
        todos.splice(index, 1);
    }
    res.json(todos);
});


app.put('/api/todos/:id', function (req, res) {
    var index = todos.findIndex(function (t) {
        return t.id === parseInt(req.params.id);
    });
    todos[index].title = req.body.title;
    res.json(todos[index]);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});