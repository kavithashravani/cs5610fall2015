(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var current_users = [
            {username: "Bob", password: "Bob123", email: "Bob@gmail.com"},
            {username: "Alice", password: "Alice123", email: "Alice@gmail.com"},
            {username: "Mike", password: "Mike123", email: "Mike@gmail.com"}
        ];

        var user_service = {
            findAllUsers: findAllUsers,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            createUser: createUser,
            updateUser: updateUser
        };
        return user_service;

        function findUserByUsernameAndPassword(username, password, userCallback) {
            var cur_user = null;
            for(var i = 0; i < current_users.length; i++) {
                if(current_users[i].username == username && current_users[i].password == password) {
                    cur_user = current_users[i];
                }
            }
            userCallback(cur_user);
        }

        function findAllUsers(allUsersCallback) {
            allUsersCallback(current_users);
        }

        function createUser(user, userCallback) {
            user.id = guid;
            current_users.push(user);
            userCallback(user);
        }

        function deleteUserById(id, userCallback) {
            var index = 0;
            for(var user in current_users) {
                if(user.id == id) {
                    current_users.splice(index, 1);
                }
                index += 1;
            }
            userCallback(current_users);
        }

        function updateUser(id, updateUser, userCallback) {
            var updatedUser = null;
            for(var user in current_users) {
                if(user.id == id) {
                    user.name = updateUser.name;
                    user.password= updateUser.password;
                    user.email = updateUser.email;
                    user.firstName = updateUser.firstName;
                    user.lastName = updateUser.lastName;
                    userCallback(user);
                }
            }
        }

        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }
    }

})();