
import { loadState, saveState } from '../utils/localStorage';
import { callAPI, setAuth } from '../service';

class User {
    constructor() {
        this.id = undefined;
        this.username = undefined;
        this.name = undefined;
        this.phone = undefined;
        this.email = undefined;
        this.token = undefined;
    }

    get isLogined() {
        return this.id && this.token ? true : false;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            name: this.name,
            phone: this.phone,
            email: this.email,
            token: this.token
        };
    }

    async login(username, password) {
        const data = await callAPI('auth/signin', { username, password });
        for (let key in data) {
            this[key] = data[key];
        }
        
        setAuth(this.token);

        await saveState('user', this.toJSON());
    }

    async logout(username, password) {
        await callAPI('auth/signout', {});
        
        setAuth(undefined);

        let dataValues = this.toJSON();
        for (let key in dataValues) {
            this[key] = undefined;
        }

        await saveState('user', undefined);
    }
}

const user = new User();
let menus = [];

export default {
    user: user,
    getMenus: ()=> {
        return menus;
    },
    getUserRole: () => {
        return 'default';
    },
    init: async () => {
        let tmp = await loadState('user');
        tmp = tmp || {};
        user.username = tmp.username;
        user.id = tmp.id;
        user.token = tmp.token;
        user.name = tmp.name;
        user.phone = tmp.phone;
        user.email = tmp.email;
        
        setAuth(user.token);

        // await callAPI('auth/check');
        if (tmp.token) {
            menus = []; //await callAPI('auth/menus');
        }
        menus = [
            { name: '首页', icon:'Home', key: '/dashboard' },
            { name: '我的账户', icon:'PlayerSettings', key: '/me' },
            { name: '账户管理', icon:'Family', key: '/user' },
        ];
    },
    clean: () => {
        menus = [];
    }
}


