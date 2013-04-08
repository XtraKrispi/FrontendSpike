define(['backbone', 'jquery', 'underscore', 'users/views/UserView'], function (Backbone, $, _, UserView) {
    var UsersView = Backbone.View.extend({
        tagName: 'table',
        className: 'table table-striped',
        template: $('#users-table-template').html(),
        initialize: function () {
            var that = this;
            this.collection.on('reset', function() {
                that.render();
            });
            this.collection.on('add', function(model) {
                that.add(model);
            });
        },
        render: function () {
            this.renderList(this.collection.models);
            return this;
        },
        add: function (model) {
            var userView = new UserView({ model: model });
            this.$el.find('tbody').append(userView.render().el);
        },
        search: function (username) {
            this.renderList(this.collection.search(username));
        },
        renderList: function (list) {
            var that = this;
            this.$el.find('tbody').empty();
            that.$el.append(this.template);
            _(list).each(function (item) {
                var userView = new UserView({ model: item });
                that.$el.find('tbody').append(userView.render().el);
            });
        },
        renderOne: function(model, index) {
            var userView = new UserView({ model: model });
            this.$el.find('tbody tr:eq(' + index + ')').remove();
            this.$el.find('tbody tr:eq(' + (index - 1) + ')').after(userView.render().el);
        },
        added: function(model) {
            this.collection.add(model.clone());
        },
        updated: function(model) {
            var user = _(this.collection.models).find(function(u) {
                return u.id == model.id;
            });

            var index = _(this.collection.models).indexOf(user);
            
            if (user) {
                user.set('FirstName', model.get('FirstName'));
                user.set('LastName', model.get('LastName'));
                user.set('EmailAddress', model.get('EmailAddress'));
            }

            this.renderOne(user, index);

        }
    });

    return UsersView;
});