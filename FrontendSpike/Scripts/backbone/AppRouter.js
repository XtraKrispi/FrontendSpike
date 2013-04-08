define(['backbone', 'jquery', 'underscore', 'users/models/User', 'users/collections/Users', 'users/views/UserPageView'], function (Backbone, $, _, User, Users, UserPageView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'users': 'userIndex',
            'users/:id': 'userEdit'
        },
        home: function () {
            $('#content').empty();
        },
        uerPageView: null,
        userIndex: function () {
            document.title = "User Management";
            var that = this;
            return $.Deferred(function(deferred) {
                var users = new Users();
                users.fetch()
                    .success(function () {
                        that.userPageView = new UserPageView({ collection: users, editingUser: new User() });
                        $('#content').html(that.userPageView.render().el);
                        deferred.resolve(users);
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });

            }).promise();
        },
        userEdit: function (id) {
            var that = this;
            if (!this.userPageView) {
                this.userIndex().done(function(users) {
                    var user = _(users.models).find(function(u) {
                        return u.get('UserId') == id;
                    });

                    if (user) {
                        that.userPageView.updateModel(user);
                    }
                });
            } else {
                that.userPageView.editUser(id);
            }
        }
    });

    return AppRouter;
});