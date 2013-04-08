define(['backbone', 'jquery', 'underscore', 'users/models/User'], function (Backbone, $, _, User) {
    var AddEditUserView = Backbone.View.extend({
        template: _.template($('#user-add-edit-template').html()),
        usernameInput: '#txtUsername',
        emailInput: '#txtEmailAddress',
        firstNameInput: '#txtFirstName',
        lastNameInput: '#txtLastName',
        initialize: function () {
            var that = this;
            this.model.on('invalid', function (errors) {
                var validationErrors = errors.validationError;
                
                $(that.usernameInput).closest('.control-group').removeClass('error');
                $(that.emailInput).closest('.control-group').removeClass('error');
                $(that.firstNameInput).closest('.control-group').removeClass('error');
                $(that.lastNameInput).closest('.control-group').removeClass('error');

                if (validationErrors.Username) {
                    $(that.usernameInput).closest('.control-group').addClass('error');
                }
                if (validationErrors.EmailAddress) {
                    $(that.emailInput).closest('.control-group').addClass('error');
                }
                if (validationErrors.FirstName) {
                    $(that.firstNameInput).closest('.control-group').addClass('error');
                }
                if (validationErrors.LastName) {
                    $(that.lastNameInput).closest('.control-group').addClass('error');
                }
            });

            this.model.on('sync', function() {
                that.trigger('added', that.model);
                that.reset();
            });

            this.model.on('changed', function () {
                that.render();
            });
        },
        events: {
            'click #save': 'save',
            'click #clear': 'reset',
            'blur #txtUsername': 'checkUsername'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        save: function () {
            this.model.set('Username', $(this.usernameInput).val());
            this.model.set('EmailAddress', $(this.emailInput).val());
            this.model.set('FirstName', $(this.firstNameInput).val());
            this.model.set('LastName', $(this.lastNameInput).val());
            this.model.set('UsernameTaken', $(this.usernameInput).data('is-taken'));
            this.model.save();
        },
        reset: function () {
            this.setModel(new User());
            this.render();
            Backbone.history.navigate("/users", { trigger: true });
        },
        checkUsername: function () {
            var username = $(this.usernameInput).val();
            var that = this;
            User.usernameExists(username).done(function (result) {
                if (result) {
                    that.markUsernameTaken();
                } else {
                    that.markUsernameNotTaken();
                }
            });
        },
        markUsernameTaken: function () {
            $(this.usernameInput).closest('.control-group').addClass('info');
            $(this.usernameInput).data('is-taken', true);
            $(this.usernameInput).siblings('.help-inline').show();
        },
        markUsernameNotTaken: function () {
            $(this.usernameInput).closest('.control-group').removeClass('info');
            $(this.usernameInput).data('is-taken', false);
            $(this.usernameInput).siblings('.help-inline').hide();
        },
        setModel: function(model) {
            this.model.set('Username', model.get('Username'));
            this.model.set('FirstName', model.get('FirstName'));
            this.model.set('LastName', model.get('LastName'));
            this.model.set('EmailAddress', model.get('EmailAddress'));
            this.model.set('UserId', model.get('UserId'));
            this.model.set('UsernameTaken', model.get('UsernameTaken'));

            this.model.trigger('changed');
        }
    });

    return AddEditUserView;
});