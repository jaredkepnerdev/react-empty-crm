import HtmlHelper from './html';

export const ValidatorClass = class Validator {
    //验证长度
    length_range(str, min, max) {
        var flag = String(str).hasValue();
        if (flag) {
            str = String(str);
            if (str.length < min || str.length > max) flag = false;
        }
        return flag;
    }
    //验证长度
    min_length(str, min) {
        var flag = String(str).hasValue();
        if (flag) {
            str = String(str);
            if (str.length < min) flag = false;
        }
        return flag;
    }
    //验证长度
    max_length(str, max) {
        var flag = String(str).hasValue();
        if (flag) {
            str = String(str);
            if (str.length > max) flag = false;
        }
        return flag;
    }
    //验证姓名
    cn_name(str) {
        var flag = String(str).hasValue();
        if (flag) {
            flag = flag && !/\d+/.test(str);
            flag = flag && str.length > 1;
        }
        return flag;
    }
    //验证邮箱地址
    email(str) {
        var flag = String(str).hasValue();
        if (flag) {
            var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            flag = flag && re.test(str);
        }
        return flag;
    }
    //验证电话号码，手机或座机
    phone(str) {
        var flag = String(str).hasValue();
        if (flag) {
            var re = /^1\d{10}$/;
            if (!re.test(str)) {
                re = /^0\d{2,3}-?\d{7,8}$/;
                flag = flag && re.test(str);
            } else {
                flag = flag && true;
            }
        }
        return flag;
    }
    //验证中国大陆手机号码
    cn_cell_phone(str) {
        var flag = String(str).hasValue();
        if (flag) {
            var re = /^1\d{10}$/;
            flag = flag && re.test(str);
        }
        return flag;
    }

    id_card(str) {
        var flag = typeof str == 'string';
        if (flag) {
            var sigma = 0;
            var a = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var w = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
            for (var i = 0; i < 17; i++) {
                var ai = parseInt(str.substring(i, i + 1));
                var wi = a[i];
                sigma += ai * wi;
            }
            var number = sigma % 11;
            var check_number = w[number];
            if (str.substring(17) != check_number) {
                flag = flag && false;
            } else {
                flag = flag && true;
            }
        }
        return flag;
    }
}

let Validator = new ValidatorClass();

export class Limit {
    static inputIntOnly(input, maxLength) {
        if (maxLength) {
            input.attr('maxLength', maxLength);
        }
        input.css('IME-MODE', 'disabled');
        input.on('keyup', function () {
            this.value = this.value.replace(/\D/g, '');
        });
        input.on('afterpaste', function () {
            this.value = this.value.replace(/\D/g, '');
        });
    }
    static inputNumberOnly(input, maxLength) {
        var format = function (obj) {
            //先把非数字的都替换掉，除了数字和.
            obj.value = obj.value.replace(/[^\d.]/g, "");
            //必须保证第一个为数字而不是.
            obj.value = obj.value.replace(/^\./g, "");
            //保证只有出现一个.而没有多个.
            obj.value = obj.value.replace(/\.{2,}/g, ".");
            //保证.只出现一次，而不能出现两次以上
            obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        };
        if (maxLength) {
            input.attr('maxLength', maxLength);
        }
        input.css('IME-MODE', 'disabled');
        input.on('keyup', function () {
            format(this);
        });
        input.on('afterpaste', function () {
            format(this);
        });
    }
}

export function setDefaultValidators(validators) {
    for (var key in validators) {
        ValidatorClass.prototype[key] = validators[key];
    }
}

let defaultMessages = {
    required: 'Field is required',
    length_range: 'The length should be more than {0} and less than {1}',
    min_length: 'The length can\'t less than {0}',
    max_length: 'The length can\'t more than {0}',
    phone: 'Invalid phone number',
    email: 'Invalid email',
    cn_cell_phone: 'Invalid phone number',
    cn_name: 'Invalid name',
    id_card: 'Invalid IDCard number'
};

let globalDefaultMessages = {...defaultMessages};

export function setDefaultMessages(messages) {
    defaultMessages = {...defaultMessages, ...messages};
    globalDefaultMessages = {...defaultMessages};
}

const stringFormat = (str, ...args) => {
    if (args.length == 0) return str;
    var param = args[0];
    if (typeof (param) == 'object') {
        for (var key in param)
        str = str.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
        return str;
    } else {
        for (var i = 0; i < args.length; i++) {
            str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
        }
        return str;
    }
}

//Resolve promises one after another (i.e. in sequence)?
//https://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence
const serial = funcs =>
funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]));

export class FormValidator {
    constructor(form, options) {
        options = options || {};
        this.messages = {...globalDefaultMessages, ...options.messages};
        this.form = form;
        this.components = {};
        this.limit = Limit;
        this.validator = new ValidatorClass();
        if (options.rules) {
            for (var key in options.rules) {
                this.addRule(key, options.rules[key]);
            }
        }
    }

    dispose() {
        for (var name in this.components) {
            let item = this.components[name];
            if (item.target && item.onCheckInput) {
                item.target.off('blur', item.onCheckInput);
            }
        }
        this.form = null;
        this.components = null;
        this.disposed = true;
    }

    addRule(name, func) {
        this.validator[name] = func;
    }
    
    removeRule(name, func) {
        delete this.validator[name];
    }

    registerCheck(inputs) {
        /*
        if (inputs instanceof HTMLElement) {
            if (inputs.tagName == 'form' || inputs.tagName == 'div') {
                inputs = $(inputs).find('input');
            } else {
                inputs = $(inputs);
            }
        }

        this.inputs = inputs;
        inputs.on('blur', this.checkInput);
        inputs.bind('focus', function(evt) {
            var ele = $(evt.currentTarget);
            this.cleanUpTip(ele);
        }.bind(this));
        */
    }

    addComponent(input, targetSelector) {
        const ele = HtmlHelper.queryByComponent(input);
        const item = {
            react: input,
            dom: ele,
            name: input.props.name
        };
        item.onCheckInput = this.onCheckInput.bind(this);
        if (targetSelector) {
            const target = ele.find(targetSelector);
            item.target = target;
            target.on('blur', item.onCheckInput);
        } else if (input.onDetect) {
            input.onDetect(item.onCheckInput);
        }
        this.components[input.props.name] = item;
    }

    removeComponent(input) {
        if (!this.components) return;
        const item = typeof input == 'string' ? this.components[input] : this.components[input.props.name];
        if (item) {
            delete this.components[item.name];
            item.target && item.target.off('blur', item.onCheckInput);
        }
    }

    check(fields, callBack) {
        var ins = this;
        return new Promise((resolve) => {
            var components = ins.components;
            if (!components || components.length <= 0) return true;
            var tasks = [];
            for (let name in components) {
                if (fields && fields.indexOf(name) < 0) continue;
                (function (name) {
                    let input = ins.getReactComponent(name);
                    let value = input.getValue ? input.getValue() : null;
                    tasks.push(ins.checkInput(input, value, (err) => {
                        input.validate(err);
                    }));
                })(name);
            }
            Promise.all(tasks).then(function (results) {
                if (ins.disposed) return;
                var flag = true;
                results.forEach((err) => {
                    flag = flag && (err ? false : true);
                });
                if (callBack) return callBack(flag);
                resolve(flag);
            });
        });
    }

    validate(ele, err) {
        ele = this.components[ele];
        if (!ele) return;
        ele.react.validate(err);
    }

    getReactComponent(input) {
        if (typeof input == 'string') input = this.components[input];
        return input ? input.react : null;
    }

    runValidationRule(input, rule, value, callBack) {
        var ins = this;
        return new Promise((resolve, reject) => {

            const def = typeof rule == 'string' ? rule.split(',') : [].concat(rule);
            rule = def.shift();
            const args = def;
            args.push(input, this.form);
            let func = ins.validator[rule];
            if (!func) return resolve();

            let done = (err) => {
                if (err) {
                    err = stringFormat.apply(null, [ err ].concat(args));
                    
                    if (callBack) return callBack(err);
                    return reject(err);
                }
                if (callBack) return callBack();
                return resolve();
            }

            input.props.onStartValidate && input.props.onStartValidate(rule, value, args);

            console.log('run validation ---> ', rule, '   value:', value);
            let result = func.apply(ins.validator, [ value ].concat(args));
            if (result instanceof Promise) {
                result.then(flag => {
                    if (ins.disposed) return;
                    console.log('validated ---> ', rule, '   value:', value, '   result:', flag);
                    input.props.onEndValidate && input.props.onEndValidate(flag, rule, value, args);
                    if (flag) return done();
                    return done(ins.messages[rule] || 'Invalid');
                });
            } else {
                console.log('validated ---> ', rule, '   value:', value, '   result:', result);
                input.props.onEndValidate && input.props.onEndValidate(result, rule, value, args);
                if (result) return done();
                done(ins.messages[rule] || 'Invalid');
            }
        });
    }

    checkInput(input, value, callBack) {
        var ins = this;
        return new Promise((resolve) => {
            let done = (err) => {
                if (this.disposed) return;
                if (callBack) callBack(err);
                resolve(err);
            }
            //onGetErrorMessage
            var err;
            callBack = callBack || function () { };
            if (typeof input == 'string') input = this.getReactComponent(input);
            if (!input) {
                return done();
            }
            const props = input.props;
            if (props.required && props.required != false && props.required != 'false') {
                //requried
                if (String(value) == '' || !value) {
                    err = ins.messages.required || '';
                    return done(err);
                }
            }
            const rule = props.rule;
            if (rule) {
                if (rule instanceof Array && rule[0] && rule[0] instanceof Array) {
                    //multi validation rules
                    const verifies = rule.map(subRule => {
                        return () => {
                            return ins.runValidationRule(input, subRule, value);
                        }
                    });
                    // execute them serially
                    serial(verifies).then(() => {
                        done();
                    }).catch(err => {
                        done(err);
                    });
                } else {
                    //single validation rule
                    return ins.runValidationRule(input, rule, value, (err) => {
                        done(err);
                    });
                }
                return;
            }
            done();
        });
    }

    onCheckInput(evt) {
        let input;
        if (evt instanceof Event || evt instanceof $.Event) {
            const name = $(evt.currentTarget).attr('name');
            input = this.getReactComponent(name);
        } else {
            input = evt;
        }
        let value = input.getValue ? input.getValue() : null;
        this.checkInput(input, value, (err) => {
            input.validate(err);
        })
    }
}