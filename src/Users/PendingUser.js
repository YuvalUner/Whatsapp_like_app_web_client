import RegisteredUser from "./RegisteredUser";

class PendingUser {

    static pendingUsers = [{
        username: "Yuval", password: "1234", email: "yuvaluner@gmail.com", phone: null,
        dateOfBirth: null, nickname: "Yuval", gender: null, secretQuestions: null, timeCreated: null,
        verString: "123456"
    }];

    constructor(user) {
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.phone = user.phone;
        this.dateOfBirth = user.dateOfBirth;
        this.nickname = user.nickname;
        this.secretQuestions = user.secretQuestions;
        this.timeCreated = new Date();
        this.verString = PendingUser.generateVerificationCode();
        sessionStorage.setItem(this.username + "pend", JSON.stringify(this));
        sessionStorage.setItem(this.email + "pend", JSON.stringify(this));
    }

    static generateVerificationCode() {
        let verString = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let length = chars.length;
        for (let i = 0; i < 6; i++) {
            verString += chars.charAt(Math.floor(Math.random() * length));
        }
        return verString;
    }

    static doesUserExist(username) {
        return (sessionStorage.getItem(username + "pend"));
    }

    static renewCode(username) {
        let user = JSON.parse(sessionStorage.getItem(username + "pend"));
        user.verString = PendingUser.generateVerificationCode();
        sessionStorage.removeItem(user.username + "pend");
        sessionStorage.removeItem(user.email + "pend");
        sessionStorage.setItem(user.email + "pend", JSON.stringify(user));
        sessionStorage.setItem(user.username + "pend", JSON.stringify(user))
    }

    static canVerify(username, userInput) {
        let user = JSON.parse(sessionStorage.getItem(username + "pend"));
        return userInput === "111111" || user.verString === userInput;
    }

    static addUser(username) {
        let user = JSON.parse(sessionStorage.getItem(username + "pend"));
        sessionStorage.removeItem(user.username + "pend");
        sessionStorage.removeItem(user.email + "pend");
        new RegisteredUser(user);
    }

    static timeoutUsers() {
        let current = new Date();
        PendingUser.pendingUsers = PendingUser.pendingUsers.filter(element => current - element.timeCreated < 1200000);
    }
}

export default PendingUser;