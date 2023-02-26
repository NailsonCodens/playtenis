import io from "socket.io-client";

const socketio = io("https://playtenis.qosit.com.br/");

export { socketio };
