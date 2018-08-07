import { setDefaultValidators, setDefaultMessages } from './validator';
import _get from 'lodash/get';
import _set from 'lodash/set';
import NP from 'number-precision';

export const extend = () => {

    const dotProp = {
        get: _get,
        set: _set
    };
    window.dotProp = dotProp;

    global.__defineGetter__('dotProp', function() {
        return dotProp;
    });

    window.NP = NP;

    global.__defineGetter__('NP', function() {
        return NP;
    });

    const sleep = (time) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    global.__defineGetter__('sleep', function() {
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

    global.__defineGetter__('wrapperOSSPrivateUrl', function() {
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

    global.__defineGetter__('wrapperOSSPrivateImageUrl', function() {
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

    global.__defineGetter__('wrapperOSSPublicUrl', function() {
        return wrapperOSSPublicUrl;
    });
    
    Promise.prototype.finally = function(cb) {
        const res = () => this;
        const fin = () => Promise.resolve(cb()).then(res);
        return this.then(fin, fin);
    };

    Array.prototype.without = function(filter, func) {
        var copy = [];
        this.forEach((element) => {
            for (var i = 0; i < filter.length; i++) {
                if (func(element, filter[i])) {
                    return;
                }
            }
            copy.push(element);
        });
        return copy;
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