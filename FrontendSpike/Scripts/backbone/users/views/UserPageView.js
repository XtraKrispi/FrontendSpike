define(['backbone', 'jquery', 'underscore', 'users/models/User', 'users/collections/Users', 'users/views/AddEditUserView', 'users/views/UsersView'], function (Backbone, $, _, User, Users, AddEditUserView, UsersView) {
    var UserPageView = Backbone.View.extend({
        template: $('#user-page-view-template'),
        addEditUserView: null,
        usersView: null,
        initialize: function () {
            var that = this;
            if (!this.editingUser) {
                this.editingUser = new User();
            }
            
            if (this.collection) {
                this.usersView = new UsersView({ collection: this.collection });
            } else {
                this.usersView = new UsersView({ collection: new Users() });
            }
            
            if (this.editingUser) {
                this.addEditUserView = new AddEditUserView({ model: this.editingUser });
            } else {
                this.addEditUserView = new AddEditUserView({ model: new User() });
            }

            this.addEditUserView.on('added', function (user) {
                that.usersView.added(user);
            });

            this.addEditUserView.on('updated', function(user) {
                that.usersView.updated(user);
            });
        },
    render: function () {
        this.$el.html(this.template.html());
        this.renderUsers();
        this.renderEdit();
        return this;
    },
    renderUsers: function() {
        this.$el.find('#content').html(this.usersView.render().el);
    },
    renderEdit: function() {
        this.$el.find('#edit').html(this.addEditUserView.render().el);
    },
    updateModel: function(model) {
        this.editingUser = model;
        this.addEditUserView.setModel(model);
    },
    editUser: function(id) {
        var user = _(this.usersView.collection.models).find(function(u) {
            return u.id == id;
        });

        this.updateModel(user || new User());
    }
});

return UserPageView;
});