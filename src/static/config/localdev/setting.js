(function() {
    var Setting = {
        domain: "localhost",
        site: "http://localhost:9090",
        cdn: "http://localhost:9090",
        oss: {
            private: "http://localhost:3300/oss/private/",
            public: ""
        },
        api: {
            gateway: "http://localhost:3300",
            compress: false
        },
        upload: {
            tokenUrl: "http://localhost:7102/utils/upload/token",
            url: "http://localhost:7102/utils/upload"
        },
        map: {
            key: "aTfKTQCMLkMbBw2sZkHG1xEQeL2NEFbj"
        }
    };
    window.Setting = Setting;

    document.domain = Setting.domain;
})();