(function () {
    ko.bindingHandlers.dateString = {
        update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = valueAccessor(),
                allBindings = allBindingsAccessor();
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            var pattern = allBindings.datePattern || 'MM/DD/YYYY';
            var dateValue = moment(valueUnwrapped);
            $(element).text(dateValue ? dateValue.format(pattern) : '');
        }
    };

    var UserListViewModel = function () {
        this.users = ko.observableArray([]);
        var that = this;

        this.getUsers = function () {
            this.users([]);
            $.get('/api/users').success(function (users) {
                for (var i = 0; i < users.length; i++) {
                    var userFromService = users[i];
                    var user = new User(userFromService.UserId, userFromService.FirstName, userFromService.LastName, userFromService.Username, userFromService.EmailAddress, userFromService.CreatedDate, userFromService.ModifiedDate);
                    that.users.push(user);
                }
            }).error(function (err) {

            });
        };

        this.removeUser = function (user) {
            $.ajax('/api/users/' + user.userId, {
                type:'DELETE'
            }).success(function(res) {
                that.users.remove(user);
            }).error(function(err) {
                
            });
        };

        this.selectUser = function(user) {
            location.hash = 'users/' + user.userId;
        };
    };

    var AddEditViewModel = function () {
        var that = this;
        this.user = ko.observable(new User());
        this.isUsernameTaken = ko.observable(false);
        this.saveUser = function () {
            var applyUser = function(user) {
                that.clearUser();
            };
            
            if (that.user()) {
                var user = that.user();
                if (that.user().userId) {
                    $.ajax('/api/users/' + user.userId, { type: 'PUT', data: ko.toJSON(that.user) }).success(function() {
                        applyUser(user);
                    });
                } else {
                    $.post('/api/users', ko.toJSON(that.user)).success(function(data) {
                        applyUser(data);
                    });
                }
            }
        };

        this.checkUsername = function (viewModel) {
            var username = viewModel.user().username();
            $.get('/api/users?username=' + username).success(function(data) {
                that.isUsernameTaken(data && data.length > 0 && username);
            }).error(function(err) {

            });
        };

        this.clearUser = function () {
            this.user(new User());
            location.hash = 'users';
        };

        this.getUser = function (id) {
            var that = this;
            //var user = new User()
            $.get('/api/users/' + id).success(function(data) {
                var user = new User(data.UserId, data.FirstName, data.LastName, data.Username, data.EmailAddress, data.createdDate, data.modifiedDate);
                that.user(user);
            }).error(function(err) {

            });
        };
    };

    var User = function (userId, firstName, lastName, username, emailAddress, createdDate, modifiedDate) {
        this.userId = userId;
        this.firstName = ko.observable(firstName);
        this.lastName = ko.observable(lastName);
        this.username = ko.observable(username);
        this.emailAddress = ko.observable(emailAddress);
        this.createdDate = ko.observable(createdDate);
        this.modifiedDate = ko.observable(modifiedDate);

        this.fullName = ko.computed(function() {
            return this.firstName() + " " + this.lastName();
        }, this);
    };

    var userListViewModel = new UserListViewModel();
    ko.applyBindings(userListViewModel, $('#content')[0]);

    var addEditViewModel = new AddEditViewModel();
    ko.applyBindings(addEditViewModel, $('#edit')[0]);

    Sammy(function () {
        this.get('#users', function() {
            userListViewModel.getUsers();
            addEditViewModel.clearUser();
        });

        this.get('#users/:id', function() {
            userListViewModel.getUsers();
            addEditViewModel.getUser(this.params.id);
        });
    }).run();
})();