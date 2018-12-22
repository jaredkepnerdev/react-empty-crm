import { setDefaultValidators, setDefaultMessages } from './validator';
import _get from 'lodash/get';
import _set from 'lodash/set';
import NP from 'number-precision';
import dayjs from 'dayjs';
import cash from 'cash-dom';

export const randomString = (len) => {
    let parts = [
        [48, 57], //0-9
        [65, 90], //A-Z
        [97, 122]  //a-z
    ];

    let pwd = "";
    for (let i = 0; i < len; i++) {
        let part = parts[Math.floor(Math.random() * parts.length)];
        //trace(part[0], part[1], Math.floor(Math.random() * (part[1] - part[0])));
        let code = part[0] + Math.floor(Math.random() * (part[1] - part[0]));
        let c = String.fromCharCode(code);
        pwd += c;
    }
    return pwd;
}

export const randomNumber = (len) => {
    let parts = [
        [48, 57] //0-9
    ];

    let pwd = "";
    for (let i = 0; i < len; i++) {
        let part = parts[0];
        //trace(part[0], part[1], Math.floor(Math.random() * (part[1] - part[0])));
        let code = part[0] + Math.floor(Math.random() * (part[1] - part[0]));
        let c = String.fromCharCode(code);
        pwd += c;
    }
    return pwd;
}

export const extend = () => {

    global.__defineGetter__('$', function () {
        return cash;
    });

    global.__defineGetter__('moment', function () {
        return dayjs;
    });

    const cloneObject = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    }

    global.__defineGetter__('cloneObject', function () {
        return cloneObject;
    });

    const parseUrlQueryString = () => {
        let vars = {}, hash;
        let url = window.location.href;
        if (url.indexOf('#') > 0) {
            url = url.substring(0, url.lastIndexOf('#'));
        }
        let index = url.indexOf('?');
        if (index < 0) return vars;


        let hashes = url.slice(index + 1).split('&');
        for (let i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            //vars.push(hash[0]);
            if (!hash[0] || hash[0] == "" || hash[0] == "null") continue;
            vars[hash[0]] = decodeURIComponent(hash[1]);
        }
        return vars;
    }

    global.__defineGetter__('parseUrlQueryString', function () {
        return parseUrlQueryString;
    });

    const dotProp = {
        get: _get,
        set: _set
    };
    window.dotProp = dotProp;

    global.__defineGetter__('dotProp', function () {
        return dotProp;
    });

    window.NP = NP;

    global.__defineGetter__('NP', function () {
        return NP;
    });

    const sleep = (time) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    global.__defineGetter__('sleep', function () {
        return sleep;
    });

    const wrapperOSSPrivateUrl = (file, option) => {
        let url = Setting.oss.private + file + '?jwt_token=' + Model.user.token;
        if (option && option.args) {
            for (let key in option.args) {
                url += "&" + key + "=" + option.args[key];
            }
        }
        if (option && option.pic) {
            if (option && option.pic.size) {
                url += `&attach=imageMogr2/thumbnail/${option.pic.size.w || ''}x${option.pic.size.h || ''}`;
            }
        }
        return url;
    }

    global.__defineGetter__('wrapperOSSPrivateUrl', function () {
        return wrapperOSSPrivateUrl;
    });

    const wrapperOSSPrivateImageUrl = (file, option) => {
        let opt = option;
        if (opt) {
            opt = {
                pic: { ...opt }
            };
        }
        return wrapperOSSPrivateUrl(file, opt);
    }

    global.__defineGetter__('wrapperOSSPrivateImageUrl', function () {
        return wrapperOSSPrivateImageUrl;
    });

    const wrapperOSSPublicUrl = (file, option) => {
        let url = Setting.oss.public + file;
        if (option && option.args) {
            for (let key in option.args) {
                url += "&" + key + "=" + option.args[key];
            }
        }
        if (option && option.pic) {
            if (option && option.pic.size) {
                url += `&attach=imageMogr2/thumbnail/${option.pic.size.w || ''}x${option.pic.size.h || ''}`;
            }
        }
        return url;
    }

    global.__defineGetter__('wrapperOSSPublicUrl', function () {
        return wrapperOSSPublicUrl;
    });

    Promise.prototype.finally = function (cb) {
        const res = () => this;
        const fin = () => Promise.resolve(cb()).then(res);
        return this.then(fin, fin);
    };

    Array.prototype.without = function (filter, func) {
        let copy = [];
        this.forEach((element) => {
            for (let i = 0; i < filter.length; i++) {
                if (func(element, filter[i])) {
                    return;
                }
            }
            copy.push(element);
        });
        return copy;
    }

    try {
        let now = Date.now();
    } catch (err) {
        Date.now = function () {
            return new Date().getTime();
        }
    }

    if (!Object.prototype.hasOwnProperty) {
        Object.prototype.hasOwnProperty = function (key) {
            return this[key] != null && this[key] != undefined;
        }
    }

    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
                'use strict';
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                let to = Object(target);

                for (let index = 1; index < arguments.length; index++) {
                    let nextSource = arguments[index];

                    if (nextSource != null) { // Skip over if undefined or null
                        for (let nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }

    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback, thisArg) {
            let T, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            let O = Object(this);
            let len = O.length >>> 0; // Hack to convert O.length to a UInt32
            if ({}.toString.call(callback) != "[object Function]") {
                throw new TypeError(callback + " is not a function");
            }
            if (thisArg) {
                T = thisArg;
            }
            k = 0;
            while (k < len) {
                let kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt /*, from*/) {
            let len = this.length >>> 0;
            let from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0) from += len;
            for (; from < len; from++) {
                if (from in this && this[from] === elt) return from;
            }
            return -1;
        };
    }

    if (!Array.prototype.shuffle) {
        Array.prototype.shuffle = function () {
            for (let j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
            return this;
        };
    }

    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+/g, "");
        }
    }

    String.prototype.fillData = function (key, value) {
        return this.replace(new RegExp("\\{" + key + "\\}", "g"), value);
    }

    String.prototype.hasValue = function () {
        return this != "undefined" && this != "null" && this != "";
    }

    setDefaultValidators({
        match_pwd: (pwd2, target, input, form) => {
            let pwd1 = form.getData()[target];
            return pwd1 === pwd2;
        },
        validate_pwd: (value) => {
            //开发阶段暂时只对密码长度进行判断
            return value.length >= 6 && value.length <= 28;
            // let re = /^(?=.*[a-zA-Z])(?=.*[0-9]).*$/;
            // return re.test(value);
        }
    });

    setDefaultMessages({
        match_pwd: '两次密码输入不一致',
        validate_pwd: '密码长度至少为6位到28位'
    });
}