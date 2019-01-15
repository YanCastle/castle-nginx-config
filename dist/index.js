"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = require("ejs");
class nginxConfig {
    constructor() {
        this._server_name = [];
        this._root = "/var/html/www";
        this.index = "index.html";
        this._ssl = false;
        /**
         * self store
         */
        this._location = [];
    }
    get server_name() { return this._server_name.join(' '); }
    set server_name(value) { this._server_name = ('string' == typeof value ? value.split(' ') : value); }
    get root() { return this._root; }
    /**
     * set root path
     */
    set root(value) { this._root = value; }
    get ssl() {
        return this._ssl;
    }
    /**
     * set the ssl config
     */
    setSsl(certificate, certificate_key) {
        if (certificate && certificate_key) {
            this._ssl = { certificate, certificate_key };
        }
        else {
            this._ssl = false;
        }
    }
    /**
     * ejs render location object
     */
    get location() {
        return this._location;
    }
    /**
     * add location rule
     * @param path nginx location path,default /
     * @param rule
     */
    addLocation(rule, path = '/') {
        this._location.push({
            path,
            rule: rule instanceof Array ? rule.join("\r\n") : rule
        });
    }
    /**
     * remove location rule
     * @param path
     */
    removeLocation(path) {
        for (let i = 0; i < this._location.length; i++) {
            let l = this._location[i];
            if (l.path == path) {
                delete this._location[i];
                return true;
            }
        }
        return false;
    }
}
exports.nginxConfig = nginxConfig;
/**
 * generate nginx config file,return file content
 * @param config
 */
function gen_conf(config) {
    return ejs_render(__dirname + '/../nginx.ejs', config);
}
exports.default = gen_conf;
/**
 * ejs render
 * @param file
 * @param data
 */
function ejs_render(file, data) {
    return ejs.renderFile(file, data);
}
exports.ejs_render = ejs_render;
// (async () => {
//     let config = new nginxConfig();
//     config.addLocation('proxy_pass http://www.baidu.com/;')
//     config.addLocation('proxy_pass http://www.baidu.com/;', '/.well-known/acme-challenge/')
//     config.server_name = ['www.tansuyun.cn']
//     config.setSsl('./key', './key')
//     console.log(await gen_conf(config))
// })()
//# sourceMappingURL=index.js.map