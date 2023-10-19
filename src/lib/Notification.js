import { io } from "socket.io-client";

export const socket = io("http://192.168.10.18:9000");

export const getAdminNotification = () => {
    return new Promise((resolve) => {
        socket.on("admin-notification", (data) => {
            resolve(data);
        });
    });
};
