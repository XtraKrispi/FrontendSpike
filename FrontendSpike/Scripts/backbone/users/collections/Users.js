define(['backbone', 'underscore', 'users/models/User'], function (Backbone, _, User) {
    var Users = Backbone.Collection.extend({
        model: User,
        url: '/api/users',
        search: function (username) {
            if (username == "") return this;

            var pattern = new RegExp(username, "gi");
            return _(this.filter(function (data) {
                return pattern.test(data.get("Username"));
            }));
        }
    });

    return Users;
});