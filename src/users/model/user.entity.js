// src/model/user.entity.js
export default class User {
    constructor({ id = null, email = '', password = '', role = '', profileId = null }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profileId = profileId;
    }
}
