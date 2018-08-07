(function() {
    var Setting = {
        domain: "ugeez.cn",
        site: "http://sprt.ugeez.cn",
        cdn: "@cdn",
        oss: {
            private: "http://sprt-service.ugeez.cn/oss/private/",
            public: ""
        },
        api: {
            gateway: "http://sprt-service.ugeez.cn",
            compress: false
        },
        upload: {
            tokenUrl: "http://sprt.ugeez.cn/utils/upload/token",
            url: "http://sprt.ugeez.cn/utils/upload"
        },
        map: {
            key: "aTfKTQCMLkMbBw2sZkHG1xEQeL2NEFbj"
        }
    };
    window.Setting = Setting;

    document.domain = Setting.domain;
})();