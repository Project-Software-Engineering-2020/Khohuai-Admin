class User {
    constructor(uid ,firstname,lastname, displayName,photoURL,email,role,provider,token)
    {
        this.uid = uid
        this.firstname = firstname;
        this.lastname = lastname;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.email = email;
        this.role = role;
        this.provider = provider;
        this.token = token;
    }
}

module.exports = User;