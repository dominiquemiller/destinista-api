exports.join = (ws, req) => {

    ws.on('message', function(msg) {
        const ip = req.connection.remoteAddress;
        console.log(`from client app ${msg} from ip: ${ip}`);
        ws.send(msg);
    }); 

}