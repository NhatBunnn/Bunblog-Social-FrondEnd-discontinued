export default class user{
    constructor(id, username, avatar) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
    }

    setId(id) {
        this.id = id;
    }
    setUsername(username) {
        this.username = username;
    }
    setAvatar(avatar) {
        this.avatar = avatar;
    }
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getAvatar() {
        return this.avatar;
    }

    getUserInfo() {
        return {
            id: this.id,
            username: this.username,
            avatar: this.avatar
        };
    }
}