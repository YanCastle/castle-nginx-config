# castle-nginx-config
castle`s nginx config file generate
```typescript
(async () => {
    let config = new nginxConfig();
    config.addLocation('proxy_pass http://www.baidu.com/;')
    config.server_name = ['www.tansuyun.cn']
    config.setSsl('./key', './key')
    console.log(await gen_conf(config))
})()
```