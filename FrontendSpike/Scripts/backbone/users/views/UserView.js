define(['backbone', 'jquery', 'underscore', 'sugar'], function (Backbone, $, _, sugar) {
    var UserView = Backbone.View.extend({
        tagName: 'tr',
        className: 'selectable',
        template: _.template($('#user-template').html()),
        events: {
            'click .remove': 'remove',
            'click': 'selected'
        },
        initialize: function () {
        },
        render: function () {
            this.$el.attr('data-id', this.model.id);
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        selected: function () {
            Backbone.history.navigate('users/' + this.model.id, { trigger: true });
        },
        remove: function (event) {
            var that = this;
            event.stopImmediatePropagation();
            var confirmation = confirm('Are you sure you want to delete?');
            
            if (confirmation) {
                this.model.destroy({
                    success: function (model, response) {
                        that.trigger('removed', model);
                    }});
            }

            this.$el.remove();
        }
    });

    return UserView;
});
