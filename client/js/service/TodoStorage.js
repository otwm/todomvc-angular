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
        put: function (id, title) {
            var body = {
                title: title
            };
            $http.put('/api/todos/' + id, body).then(function success(response) {
                console.log(storage.todos);
            });
        },
        todos: []
    };

    return storage;
});