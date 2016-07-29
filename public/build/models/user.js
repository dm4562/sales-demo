"use strict";
var User = (function () {
    function User() {
        this.authHeaders = [
            this.uid,
            this.accessToken,
            this.client,
            this.expiry
        ];
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map