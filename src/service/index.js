import axios from 'axios';

const globalErrorHandler = (code, msg) => {
    toast(msg, 0);
}

var globalAuth;

export const setAuth = (auth) => {
    globalAuth = auth;
}

export const callAPI = (method, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            params = params || {};
            const way = 'post';
            let url = `${window.Setting.api.gateway}`;
            let res = await axios({ 
                url:url, 
                params: way === 'get' ? params : {},
                data: params || {},
                headers:{
                    Authorization: `Bearer ${globalAuth}`,
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
                err = new Error('没有权限访问相关资源.');
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

            resolve(res.data.data);
        } catch (err) {
            err.code = 0;
            reject(err);
        }
    });
}

export const mockFetchTableData = (option) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = [
                {
                    "company": "Johnson, Macejkovic and Kohler",
                    "username": "Nya.Williamson56",
                    "password": "fVSKKoPM9nvRAHE",
                    "role": "guest",
                    "phone": "(707) 596-6987",
                    "cell": "(214) 675-7001"
                  },
                  {
                    "company": "Runte Group",
                    "username": "Louie_Lindgren12",
                    "password": "5HjB3zzcNmIsNDc",
                    "role": "user",
                    "phone": "(410) 103-3793",
                    "cell": "(972) 323-3752"
                  },
                  {
                    "company": "Ernser LLC",
                    "username": "Clemmie_Hayes11",
                    "password": "XUOhDkFwFXORf3O",
                    "role": "administrator",
                    "phone": "(299) 698-9489",
                    "cell": "(972) 599-3674"
                  },
                  {
                    "company": "Kozey, Brown and Buckridge",
                    "username": "Ciara48",
                    "password": "oQ35DYNdLvxh4q_",
                    "role": "user",
                    "phone": "(063) 644-0432",
                    "cell": "(469) 317-3758"
                  },
                  {
                    "company": "Luettgen, Murray and Koss",
                    "username": "Rodrick44",
                    "password": "zRwtb3Uk33C8xyY",
                    "role": "guest",
                    "phone": "(501) 212-5859",
                    "cell": "(972) 321-9594"
                  }
            ];
            let list = [].concat(data);
            if (option.pagination) {
                list = list.slice(option.pagination.index * option.pagination.num, (option.pagination.index + 1) * option.pagination.num);
            }
            resolve({
                list: list,
                total: data.length
            });
        }, 500 + Math.random() * 1000);
    });
}