module.exports = (socket, io) => {
    let chatRoom;
    console.log('socket connected!');

    //  join a chat room
    socket.on('joinRoom', (data) => {
        socket.join(data.network);
        chatRoom = data.network;
    });

    // leave a chat room
    socket.on('leaveRoom', (data) => {
        socket.leave(data.network);
    });

    socket.on('chatText', (msg) => {
      io.in(chatRoom).emit('chatText', msg);
    })

    
}