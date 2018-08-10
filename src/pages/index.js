let COMMON_ROUTER_MAP = {

};

let ALL_ROUTER_MAP = {
    'default':{
        '/dashboard': () => import('./subpages/Dashboard'),
        '/table': () => import('./subpages/DemoTablePage'),
        '/form': () => import('./subpages/DemoFormPage')
    }
};

let ROUTER_MAP = {};

export const SubPages = [];

export const WHITE_LIST = {};
(function() {
    var tmp = [
        "/", "/login", "/404", "/no_permission", "/about"
    ];
    tmp.forEach(function(page) {
        WHITE_LIST[page] = true;
    });
})();

export const Home = () => import('./Home');
export const Login = () => import('./Login');
export const About = () => import('./About');
export const NoPermission = () => import('./NoPermission');
export const NotFound = () => import('./Error_404');

export function init(role) {
    ROUTER_MAP = {
        ...COMMON_ROUTER_MAP,
        ...ALL_ROUTER_MAP[role] || {}
    };
    SubPages.length = 0;
    for (var key in ROUTER_MAP) {
        SubPages.push(key);
    }
}

export function router(page) {
    let generator = ROUTER_MAP[page];
    if (generator) {
        return generator();
    }
    return null;
}

export function checkIsSubPage(page) {
    return ROUTER_MAP[page] ? true : false;
}

export function checkIsWhitelist(page) {
    return WHITE_LIST[page] ? true : false;
}
