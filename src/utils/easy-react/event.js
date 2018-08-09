/**
 * Created by jay on 5/17/16.
 */

const EventDispatcher = function (dispatcher) {
    var instance = this;
    this.dispatcher = dispatcher;
    this.handlers = {};
    //  监听对应的事件，将监听到的事件的回调函数存入this的handlers中
    this.on = function(event, handler) { return instance.listen(event, handler) };
    this.listen = function(event, handler) {
        if (event == '') { return; }
        if (!instance.handlers[event]) {
            instance.handlers[event] = [];
        }
        instance.handlers[event].push(handler);
    };
    this.dispatch = function(event, data) {
        data = data || '';
        //  从this的handlers中遍历方法来处理接收到的数据
        var funcs = instance.handlers[event] || [];
        funcs.forEach(function(func) {
            if (func) {
                func(data);
            }
        });
    };



    this.off = function(event, handler) { return instance.remove(event, handler) };
    this.remove = function(event, handler) {
        var funcs = instance.handlers[event];
        if (!funcs || funcs.length == 0) return;
        var index = funcs.indexOf(handler);
        if (index < 0) return;
        funcs.splice(index, 1);
    };

    this.removeAll = function(event) { delete instance.handlers[event] };

    if (dispatcher) {
        if (!dispatcher.addListener) {
            dispatcher.addListener = function(event, handler) { instance.listen(event, handler); } ;
        }
        if (!dispatcher.removeListener) {
            dispatcher.removeListener = function(event, handler) { instance.remove(event, handler); } ;
        }
        if (!dispatcher.fireEvent) {
            dispatcher.fireEvent = function(event, data) { instance.dispatch(event, data); } ;
        }
    }
};

export default EventDispatcher;
