define(['jquery', 'backbone'], function($,Backbone) {
    var User = Backbone.Model.extend({
        idAttribute: 'UserId',
        urlRoot: '/api/users',
        defaults: {
            'Username': '',
            'EmailAddress': '',
            'FirstName': '',
            'LastName': '',
            'UsernameTaken': false,
            'UserId': null
        },
        validate: function(attrs, options) {
            var errors = {};
            var isValid = true;
            if (!attrs.FirstName) {
                errors["FirstName"] = "error";
                isValid = false;
            }
            if (!attrs.LastName) {
                errors["LastName"] = "error";
                isValid = false;
            }
            if (!attrs.EmailAddress) {
                errors["EmailAddress"] = "error";
                isValid = false;
            }
            if (!attrs.Username) {
                errors["Username"] = "error";
                isValid = false;
            }
            
            if (attrs.UsernameTaken && !attrs.UserId) {
                errors["UsernameTaken"] = "error";
                isValid = false;
            }

            if (!isValid) {
                return errors;
            }
        },
        clone: function() {
            var user = new User(this.toJSON());

            return user;
        }
    }, {
        urlRoot: '/api/users',
        usernameExists: function (username) {
            var that = this;
            return $.Deferred(function (deferred) {
                if (!username) {
                    deferred.resolve(false);
                    return;
                }

                $.get(that.urlRoot + "?username=" + username).done(function (results) {
                    deferred.resolve(results && results.length > 0);
                }).fail(function (err) {
                    deferred.reject(err);
                });
            }).promise();
        }
    });

    return User;
});
