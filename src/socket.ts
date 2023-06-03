import { io } from 'socket.io-client';

const uri = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const socket = io(uri);