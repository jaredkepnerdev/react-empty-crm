/**
 * Created by Jay on 04/12/2017.
 */
var queryParams = parseUrlQueryString();

try {
    var now = Date.now();
} catch (err) {
    Date.now = function() {
        return new Date().getTime();
    }
}

if (!Object.prototype.hasOwnProperty) {
    Object.prototype.hasOwnProperty = function(key) {
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
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
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
    Array.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;
        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from;
        }
        return -1;
    };
}

if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+/g, "");
    }
}

String.prototype.fillData = function(key, value) {
    return this.replace(new RegExp("\\{" + key + "\\}", "g"), value);
}

String.prototype.hasValue = function() {
    return this != "undefined" && this != "null" && this != "";
}

function checkIsIE() {
    try {
        var temp = navigator.userAgent.split(";")[1].replace(/[ ]/g,"");
        if (temp.indexOf("MSIE") === 0) {
            return true;
        } else {
            if (navigator.userAgent.indexOf('Trident') > 0 && navigator.userAgent.indexOf('rv:11') > 0) {
                return true;
            }
            return false;
        }
    } catch (err) {
        return false;
    }
}

window.isIE = checkIsIE();

function randomString(len) {
    var parts = [
        [ 48, 57 ], //0-9
        [ 65, 90 ], //A-Z
        [ 97, 122 ]  //a-z
    ];

    var pwd = "";
    for (var i = 0; i < len; i++)
    {
        var part = parts[Math.floor(Math.random() * parts.length)];
        //trace(part[0], part[1], Math.floor(Math.random() * (part[1] - part[0])));
        var code = part[0] + Math.floor(Math.random() * (part[1] - part[0]));
        var c = String.fromCharCode(code);
        pwd += c;
    }
    return pwd;
}

function randomNumber(len) {
    var parts = [
        [ 48, 57 ] //0-9
    ];

    var pwd = "";
    for (var i = 0; i < len; i++)
    {
        var part = parts[0];
        //trace(part[0], part[1], Math.floor(Math.random() * (part[1] - part[0])));
        var code = part[0] + Math.floor(Math.random() * (part[1] - part[0]));
        var c = String.fromCharCode(code);
        pwd += c;
    }
    return pwd;
}

function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function dec2bin(num){
    if(isNaN(num))return;
    return parseInt(num,10).toString(2);
}

function trace(str) {
    if (window.console && window.console.log) {
        window.console.log(str);
    }
}

function parseUrlQueryString(){
    var vars = {}, hash;
    var url = window.location.href;
    if (url.indexOf('#') > 0) {
        url = url.substring(0, url.lastIndexOf('#'));
    }
    var index = url.indexOf('?');
    if (index < 0) return vars;


    var hashes = url.slice(index + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        //vars.push(hash[0]);
        if (!hash[0] || hash[0] == "" || hash[0] == "null") continue;
        vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
}

function $getCookie(key) {
    var opt = { };
    if (window.COOKIE_PATH) opt.path = window.COOKIE_PATH;
    return $.cookie(key, undefined, opt);
}

function $setCookie(key, val, expire) {
    var opt = { };
    if (window.COOKIE_PATH) opt.path = window.COOKIE_PATH;
    if (Number(expire) > 0) {
        opt.expires = expire;
    }
    $.cookie(key, val, opt);
}

function $delCookie(key) {
    var opt = { };
    if (window.COOKIE_PATH) opt.path = window.COOKIE_PATH;
    $.removeCookie(key, opt);
}

function $callAPILazy(method, data, onSuccess, onError, delay) {
    setTimeout(function() {
        $callAPI(method, data, onSuccess, onError);
    }, delay || (300 + Math.random() * 700));
}

function $callAPIStack(reqs, onSuccess, onError, errorStop) {
    var CODE;
    var MSG;

    var doNext = function() {
        if (reqs.length == 0) {
            if (CODE > 1) {
                if (onError) onError(CODE, MSG);
            } else {
                if (onSuccess) onSuccess();
            }
        } else {
            var workingReq = reqs.shift();
            if (!workingReq[1]) workingReq[1] = {};
            $callAPI(workingReq[0], workingReq[1], function(data) {
                if (workingReq[2]) workingReq[2](data);
                doNext();
            }, function(code, msg) {
                CODE = code;
                MSG = msg;
                if (workingReq[3]) workingReq[3](code, msg);
                if (!errorStop) doNext();
            });
        }
    }
    doNext();
}

function $callAPI(method, data, onSuccess, onError) {
    trace('>> request send ==> ' + method);

    var auth = data._auth;
    if (!auth) {
        auth = {};
        // var userid = $getCookie("userid");
        // if (userid) auth.userid = userid;
        //
        // var token = $getCookie("token");
        // if (token) auth.token = token;
        //
        // var tokentimestamp = $getCookie("tokentimestamp");
        // if (tokentimestamp) auth.tokentimestamp = tokentimestamp;
    } else {
        delete data['_auth'];
    }

    var params = {};
    params.method = method;
    params.data = data;
    params.auth = auth;

    var config = (window.Setting || {}).api || {};

    var gateway = config.gateway;
    var compress = config.compress || false;
    setTimeout(function() {
        $.ajax({
            type: "post",
            url: gateway,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "P3P": 'CP="ALL IND DSP COR ADM CONo CUR CUSo IVAo IVDo PSA PSD TAI TELo OUR SAMo CNT COM INT NAV ONL PHY PRE PUR UNI"'
            },
            xhrFields : {
                responseType : compress ? 'arraybuffer' : 'text'
            },
            crossdomain: true,
            data: JSON.stringify(params),
            success: function (data, status, xhr) {
                if (data instanceof ArrayBuffer) data = msgpack.decode(new Uint8Array(data));
                if (data.code == 1) {
                    if (onSuccess) {
                        onSuccess(data.data);
                    }
                } else {
                    var err = 'API调用错误 ==> [' + data.code + '] - ' + data.msg;
                    trace(err);
                    if (data.code < 1000) {
                        if (window.__callAPIFatalError) {
                            window.__callAPIFatalError(data.msg, data.code);
                        }
                    }
                    if (onError && typeof onError == 'function') {
                        onError(data.code, data.msg);
                    } else if (window.__callAPIError) {
                        window.__callAPIError(err);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                trace('API调用错误 ==> status: ' + textStatus + '      error: ' + errorThrown);

                if (onError && typeof onError == 'function') {
                    var flag = onError(-1, 'network connection error');
                    if (flag != true && window.__callAPIFatalError) {
                        window.__callAPIFatalError('API调用错误 ==> status: ' + textStatus + '      error: ' + errorThrown);
                    }
                }
            }
        });
    }, 1);
}


function getUploadToken(fileName, ext, type, callBack) {
    var url = Setting.upload.tokenUrl + '?filename=' + (fileName || '') + '&type=' + (type || 'public');
    if (ext) {
        url += ('&ext=' + ext);
    }
    $.get(url, function(result) {
        callBack && callBack(result);
    });

}

function onWindowResize(func) {
    if (!window.__resizeHandlers) window.__resizeHandlers = [];
    var index = window.__resizeHandlers.indexOf(func);
    if (index >= 0) window.__resizeHandlers.splice(index, 1);
    window.__resizeHandlers.push(func);
}

function offWindowResize(func) {
    if (!window.__resizeHandlers) return;
    var index = window.__resizeHandlers.indexOf(func);
    if (index >= 0) window.__resizeHandlers.splice(index, 1);
}

function onWindowClick(func) {
    if (!window.__clickHandlers) window.__clickHandlers = [];
    var index = window.__clickHandlers.indexOf(func);
    if (index >= 0) window.__clickHandlers.splice(index, 1);
    window.__clickHandlers.push(func);

    if (window.__clickHandlers.length === 1) {
        window.onclick = function(e) {
            window.__clickHandlers && window.__clickHandlers.forEach(function(handler) {
                handler(e);
            });
        }
    }
}

function offWindowClick(func) {
    if (!window.__clickHandlers) return;
    var index = window.__clickHandlers.indexOf(func);
    if (index >= 0) window.__clickHandlers.splice(index, 1);
    if (window.__clickHandlers.length === 0) {
        window.onclick = undefined;
    }
}

window.onresize = function() {
    window.__resizeHandlers && window.__resizeHandlers.forEach(function(handler) {
        handler();
    });
}