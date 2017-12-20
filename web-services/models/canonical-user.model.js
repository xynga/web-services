var UpdateCanonicalUserRequest = /** @class */ (function () {
    function UpdateCanonicalUserRequest(user) {
        this.id = user.id;
        this.first = user.first;
        this.last = user.last;
        this.initials = user.initials;
        this.phone = user.phone;
    }
    return UpdateCanonicalUserRequest;
}());
export { UpdateCanonicalUserRequest };
var CanonicalUserResponse = /** @class */ (function () {
    function CanonicalUserResponse(user) {
        if (user instanceof CanonicalUserResponse) {
            // clone an instance of the UserResponse class
            Object.assign(this, user);
        }
        else {
            // create an instance of the UserResponse class from an instance of the Object class
            var object = user; // the response object has the UserResponse class structure
            this.id = object.id;
            this.first = object.first;
            this.middle = object.middle;
            this.last = object.last;
            this.initials = object.initials;
            this.phone = object.phone;
        }
    }
    return CanonicalUserResponse;
}());
export { CanonicalUserResponse };
var CanonicalUser = /** @class */ (function () {
    function CanonicalUser(user) {
        if (user) {
            if (user instanceof CanonicalUser) {
                Object.assign(this, user);
            }
            else if (user instanceof CanonicalUserResponse) {
                this.id = user.id;
                this.first = user.first;
                this.middle = user.middle;
                this.last = user.last;
                this.initials = user.initials;
                this.phone = user.phone;
            }
        }
        else {
            this.id = '';
            this.first = '';
            this.middle = '';
            this.last = '';
            this.initials = '';
            this.phone = '';
        }
    }
    return CanonicalUser;
}());
export { CanonicalUser };
//# sourceMappingURL=canonical-user.model.js.map