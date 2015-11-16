var users = require("../models/user.mock.json");
var uuid = require('node-uuid');

module.exports = function(app) {
    var userApi = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
    }
    return userApi;

    function Create(user) {
        user.id = uuid.v1();
        users.push(user);
        return users;
    }

    function FindAll() {
        return users;
    }

    function FindById(id) {
        for(var i = 0; i< users.length; i++) {
            if(users[i].id == id) {
                return users[i];
            }
        }
        return null;
    }

    function Update(id, newUser) {
        var user = FindById(id)
        for(var key in newUser) {
            user[key] = newUser[key];
        }
        return user;
    }

    function  Delete(id) {
        var index = -1;
         for(var i = 0; i< users.length; i++) {
               if(users[i].id == id) {
                    index = i;
          }
         }
         if(index != -1) {
            users.splice(index,1);
         }
         return users;
    }

    function findUserByUsername(username) {
        for(var i = 0; i< users.length; i++) {
            if(users[i].username == username) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {
        for(var i = 0; i< users.length; i++) {
            if((users[i].username == username) &&
                    (users[i].password == password)) {
                return users[i];
            }
        }
        return null;
    }

};