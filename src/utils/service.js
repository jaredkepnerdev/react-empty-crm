
import axios from 'axios';

const globalErrorHandler = (code, msg) => {
    toast(msg, 0);
}

var globalAuth;

export const setAuth = (auth) => {
    globalAuth = auth;
}

export const callAPI = (method, params, way) => {
    return new Promise(async (resolve, reject) => {
        try {
            params = params || {};
            if (method.indexOf('auth/') !== 0) {
                method = 'api/' + method;
            }
            if (method.indexOf("/:id") > 0) {
                method = method.replace("/:id", "/" + params.id);
                delete params["id"];
            }
            way = (way || 'post').toLowerCase();
            let url = `${window.Setting.api.gateway}/${method}`;
            console.log(url);
            let res = await axios({ 
                url:url, 
                params: way === 'get' ? params : {},
                data: params || {},
                headers:{
                    Authorization: `bearer ${globalAuth}`,
                },
                method: way
            });

            let err;

            if (res.status !== 200) {
                err = new Error("网络连接似乎出现了问题, 请重新尝试.");
                err.code = code;
                return reject(err);
            }

            if (res.code === 401 || res === 'Unauthorized') {
                err = new Error('Unauthorized');
                err.code = 0;
                return reject(err);
            }

            res = res.data || {};

            const code = Number(res.code);
            if (code !== 1) {
                err = new Error(res.msg || res.message);
                err.code = isNaN(code) ? 0 : code;
                return reject(err);
            }

            resolve(res.data);
        } catch (err) {
            err.code = 0;
            reject(err);
        }
    });
}