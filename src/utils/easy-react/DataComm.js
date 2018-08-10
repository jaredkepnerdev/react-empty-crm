import EventDispatcher from "./event";

//  基础方法集，其他方法集继承于这个类，实现不同功能
function BaseAction() {
    var instance = this;
    //  注册事件安排
    this.eventDispatcher = new EventDispatcher(instance);
    //  注入数据发布器
    this.injectDataComm = function(instance) {
        this.dc = instance;
    }
    this.getInfo = function(name, gender, age) {
        this.update("*", {name:name, gender: gender, age:age});
    }
    //  更新数据
    this.update = function(property, newValue) {
        if (property != "*") {
            property = this.type + "." + property;
        } else {
            property = this.type
        }
        //  通知数据管理器更新全局storage
        this.dc.updateStorage(property, newValue);
    }
    //  获取数据
    this.fetch = function(property) {
        if (property != "*") {
            property = this.type + "." + property;
        } else {
            property = this.type;
        }
        return this.dc.fetchStorage(property);
    }

    this.exec = function(action) {
        //  将传递的参数action，拆解传递给对应的方法
        var group = arguments[0].split(".")[0];
        var cmd = arguments[0].split(".")[1];
        var act = this.dc.actions[group];
        //  传递给user-->login方法的参数，此处为空
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        return act[cmd].apply(act, args);
    }
}
//  数据管理器
class DataComm {
    constructor() {
        this.actions = {};
        this.storage = {};
        this.dataHandlers = {};
    }
    //  注册action，将已有的方法添加到当前的actions中
    registerAction(actionClass) {
        var action = new actionClass();
        BaseAction.call(action);
        action.injectDataComm(this);
        var actionType = action.type;
        this.actions[actionType] = action;
        //  获取方法设置的默认值，存入全局的storage
        if (action.getDefaultStorage) {
            var data = action.getDefaultStorage();
            if (data) {
                this.storage[actionType] = {};
                for (var key in data) {
                    this.storage[actionType][key] = data[key];
                }
            }
        }
    }

    //  数据订阅方法
    subscribe(property, handler) {
        //  特定的订阅的数据的处理方法
        var temp = property.split(".");
        var group = this.dataHandlers[temp[0]];
        if (!group) {
            group = {};
            this.dataHandlers[temp[0]] = group;
        }
        var actProperty = temp.length > 1 ? property.replace(temp[0] + ".", "") : "*";
        var list = group[actProperty];
        if (!list) {
            list = [];
            group[actProperty] = list;
        }
        if (typeof handler == "function" && list.indexOf(handler) < 0) {
            list.push(handler);
        }

        return this.fetchStorage(property);
    };
    
    //  数据取消订阅方法
    unSubscribe(property, handler) {
        //  特定的订阅的数据的处理方法
        var temp = property.split(".");
        var group = this.dataHandlers[temp[0]];
        if (!group) return;

        var actProperty = temp.length > 1 ? property.replace(temp[0] + ".", "") : "*";
        var list = group[actProperty];
        if (!list) return;

        if (typeof handler == "function") {
            list.splice(list.indexOf(handler), 1);
        }
    };

    //  更新数据到storage
    updateStorage(property, newValue) {
        var properties = property.split(".");
        //  将数据提交到storage
        if (properties.length > 1) {
            var propLen = properties.length - 1;
            var val = this.storage;
            for (var i = 0; i < propLen; i++) {
                val = val[properties[i]];
            }
            val[properties[propLen]] = newValue;
        } else {
            this.storage[property] = newValue;
        }

        var ins = this;
        var groupName = properties[0];
        var group = this.dataHandlers[groupName];
        if (!group) {
            group = {};
            this.dataHandlers[groupName] = group;
        }
        //console.log('update: ', groupName, properties, group);
        //  从storage中获取数据，并由回调函数来进行处理
        if (properties.length == 1) {
            for (var p in group) {
                var list = group[p];
                if (list && list.length > 0) {
                    list.forEach(function(handler) {
                        var val = ins.fetchStorage(p == "*" ? groupName : (groupName + "." + p));
                        handler(val);
                    });
                }
            }
        } else {
            var p = properties.slice(1).join(".");
            var list = group[p];
            if (list && list.length > 0) {
                list.forEach(function(handler) {
                    var val = ins.fetchStorage(property);
                    handler(val);
                });
            }


        }
    }

    //  从storage中获取数据
    fetchStorage(property) {
        var properties = property.split(".");
        if (properties.length > 1) {
            var val = this.storage;
            for (var i = 0; i < properties.length; i++) {
                val = val[properties[i]];
            }
            return val;
        } else {
            return this.storage[property];
        }
    }
}

DataComm.sharedInstance = new DataComm();

export default DataComm;