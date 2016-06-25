angular.module("todomvc").factory('todoStorage', function ($http) {
    var storage = {
        destroyCompleted: function () {
            var incompletedTodos = storage.todos.filter(function (t) {
                return t.completed === false;
            });

            angular.copy(incompletedTodos, storage.todos);
        },
        destroy: function (todo) {
            // find index
            var index = storage.todos.findIndex(function (t) {
                return t.id === todo.id;
            });

            // remove
            if (index > -1) {
                storage.todos.splice(index, 1);
            }
        },
        post: function (newTodoTitle) {
            var body = {
                title: newTodoTitle
            };
            $http.post('/api/todos', body).then(function success(response) {
                storage.todos.push(response.data);
            });
        },
        get: function (callback) {
            $http.get('/api/todos').then(function success(response) {
                storage.todos = response.data;
                callback(response.data);
            });
            return storage.todos;
        },
        put: function (id,title) {
            var body = {
                title: title
            };
            $http.put('/api/todos/' + id, body).then(function success(response) {
                // storage.todos = response.data;
                // callback(response.data);
            });
        },
        todos: []
    };

    return storage;
});