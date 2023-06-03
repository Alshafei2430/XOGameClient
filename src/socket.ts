import { io } from "socket.io-client";

const uri = import.meta.env.VITE_SERVER_URL;

export const socket = io(uri);
