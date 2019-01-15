import * as ejs from 'ejs'
import { join, resolve } from 'path';
export class nginxConfig {
    private _server_name: string[] = [];
    get server_name() { return this._server_name.join(' ') }
    set server_name(value: string | string[]) { this._server_name = ('string' == typeof value ? value.split(' ') : value) }
    private _root: string = "/var/html/www";
    public index: string = "index.html";
    public get root() { return this._root; }
    /**
     * set root path
     */
    public set root(value: string) { this._root = value; }
    private _ssl: { certificate: string, certificate_key: string } | false = false;
    get ssl() {
        return this._ssl;
    }
    /**
     * set the ssl config
     */
    setSsl(certificate: string, certificate_key: string) {
        if (certificate && certificate_key) {
            this._ssl = { certificate, certificate_key };
        } else {
            this._ssl = false;
        }
    }
    /**
     * self store
     */
    private _location: any[] = [];
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
    addLocation(rule: string | string[], path: string = '/') {
        this._location.push({
            path,
            rule: rule instanceof Array ? rule.join("\r\n") : rule
        })
    }
    /**
     * remove location rule
     * @param path 
     */
    removeLocation(path: string) {
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
/**
 * generate nginx config file,return file content
 * @param config 
 */
export default function gen_conf(config: nginxConfig): Promise<string> {
    return ejs_render(__dirname + '/../nginx.ejs', config)
}
/**
 * ejs render
 * @param file 
 * @param data 
 */
export function ejs_render(file: string, data: any): Promise<any> {
    return ejs.renderFile(file, data);
}
// (async () => {
//     let config = new nginxConfig();
//     config.addLocation('proxy_pass http://www.baidu.com/;')
//     config.addLocation('proxy_pass http://www.baidu.com/;', '/.well-known/acme-challenge/')
//     config.server_name = ['www.tansuyun.cn']
//     config.setSsl('./key', './key')
//     console.log(await gen_conf(config))
// })()