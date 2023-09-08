import { SOCKET_SERVER } from './config';
import { io } from "socket.io-client";

const socket = io(SOCKET_SERVER);
export default socket;