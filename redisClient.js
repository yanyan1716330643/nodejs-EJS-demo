// redis 链接配置
var redis   = require('redis');
var redisConfigYan = {
    ip:'39.109.127.189',
    port:'6379',
    db:8,
    auth:'123456'
};
var redisConfigDev = {
    ip:'192.168.1.37',
    port:'6379',
    db:8,
    auth:''
};
var redisConfig = redisConfigDev;
console.log("redis config:")
console.log(redisConfig);
var redisClient  = redis.createClient(redisConfig.port, redisConfig.ip);
redisClient.on("error", function(error) {
    console.log("redis链接失败"+error);
    console.log(error);
});
redisClient.auth(redisConfig.auth);
redisClient.select(redisConfig.db, function(error){
    if(error) {
        console.log("redis链接失败"+error);
    }
});
//todo this is a test
var user = {
    name:"yanyan",
    password:"123456",
    description:"super man,lalala ...."
};

var user1 = {
    name:"yanyan1",
    password:"123456",
    description:"super man,lalala ...."
};
var user2 = {
    name:"yanyan2",
    password:"123456",
    description:"super man,lalala ...."
};

redisClient.hmset('nodejs:user:AllUsers',{
   'yanyan1':JSON.stringify(user1),
   'yanyan2':JSON.stringify(user2)
});



redisClient.set('nodejs:user:superUser',JSON.stringify(user),redis.print);
redisClient.get('nodejs:user:superUser',function(err,value){
    if(err) throw err;
    console.log('get:'+value);
});

var explode = {
    hget:function (key,subkey,callback) {
        console.log("before");
        var hget = redisClient.hget(key,subkey,callback);
        console.log("after");
        return hget;
    }
};
explode.prototype = redisClient;


module.exports = explode;