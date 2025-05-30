export default function socket(socketIo) {
  const userSocketMap = new Map(); // userId -> socketId 매핑

  socketIo.on('connection', (socket) => {
    console.log('소켓이 연결됐습니다.');

    // 로그인 이벤트 처리
    socket.on('login', (userId) => {
      userSocketMap.set(userId, socket.id);
      console.log(`사용자 ${userId}가 소켓 ${socket.id}로 로그인했습니다.`);
    });

    socket.on('disconnect', (reason) => {
      console.log(`연결이 해제됐습니다. ${reason}`);
      // 연결 해제 시 매핑 제거
      for (const [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          break;
        }
      }
    });

    // Message 추가
    socket.on('messageS', (message) => {
      console.log('받은 메시지:', message);
      const targetSocketId = userSocketMap.get(message.targetUserId);

      if (targetSocketId) {
        console.log('메시지 전송 시도:', {
          message,
        });
        socketIo.to(targetSocketId).emit('messageC', message);
      } else {
        socket.emit('messageC', {
          sender: 'SYSTEM',
          targetUserId: message.sender,
          data: '수신자를 찾을 수 없습니다.',
        });
      }
    });
  });
}
