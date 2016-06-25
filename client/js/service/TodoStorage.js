/**
 * todo stoage
 */
angular.module("todomvc").factory('todoStorage', function ($http) {
    var storage = {
        /**
         * 완료된 것들 삭제
         */
        destroyCompleted: function () {
            var incompletedTodos = storage.todos.filter(function (t) {
                return t.completed === false;
            });

            angular.copy(incompletedTodos, storage.todos);
        },
        /**
         * 삭제
         * @param todo
         */
        destroy: function (todo, callback) {
            $http.delete('/api/todos/' + todo.id).then(function success(response) {
                console.log(response.data);
                storage.todos = response.data;
                callback(response.data);
            });
        },
        /**
         * 생성
         * @param newTodoTitle
         */
        post: function (newTodoTitle) {
            var body = {
                title: newTodoTitle
            };
            $http.post('/api/todos', body).then(function success(response) {
                storage.todos.push(response.data);
            });
        },
        /**
         * 조회
         * @param callback
         * @returns {Array}
         */
        get: function (callback) {
            $http.get('/api/todos').then(function success(response) {
                storage.todos = response.data;
                callback(response.data);
            });
            return storage.todos;
        },
        /**
         * 수정
         * @param id
         * @param title
         */
        put: function (todo) {
            console.log(todo.completed);
            var body = {
                title: todo.title
                , completed: todo.completed
            };
            $http.put('/api/todos/' + todo.id, body).then(function success(response) {
                console.log(storage.todos);
            });
        },
        todos: []
    };

    return storage;
});