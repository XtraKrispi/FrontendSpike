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
        $.get('/api/users').success(function (users) {
            for (var i = 0; i < users.length; i++) {
                var userFromService = users[i];
                var user = new User(userFromService.UserId, userFromService.FirstName, userFromService.LastName, userFromService.Username, userFromService.EmailAddress, userFromService.CreatedDate, userFromService.ModifiedDate);
                that.users.push(user);
            }
        }).error(function(err) {

        });

        this.removeUser = function (user) {
            $.ajax('/api/users/' + user.userId, {
                type:'DELETE'
            }).success(function(res) {
                that.users.remove(user);
            }).error(function(err) {
                
            });
        };

        this.selectUser = function(user) {

        };
    };

    var AddEditViewModel = function() {
        this.user = ko.observable();
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
})();