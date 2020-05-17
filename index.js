const Tail = require('tail').Tail;
const axios = require('axios');

try {
const tail = new Tail('./error.log');

console.log('Tailing file => ');


tail.on('line',function(data){

    console.log('data => ',data);

    var username = 'Eve'
    var password = 'changeme'
    
    const body = {"action":"EventsRouter", "method":"add_event", "data": [{"summary":"test","device":"test","message":"msg","component":"testhost","severity":"5","evclasskey":"nxlog","evclass":"/nxlog/perf","monitor":"localhost"}],"type":"rpc","tid":2}
    
    var url = 'http://0.0.0.0:4000/api';
    
     axios({
            method:'post',
            url:url,
            headers: { 'Content-Type': 'application/json' },
            data: body,
            auth: {
                username: username,
                password: password
            }
        }).then((response)=>{
            console.log('response => ',response.data);
        }).catch((error)=>{
            console.log('error => ',error.message);
        })
});

tail.on('error',function(error){
console.log('error =>',error);
});

}
catch(exception){
    console.log('exception => ',exception);
}