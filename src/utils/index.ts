import { encrypt, decrypt } from './crypto';

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
        // tslint:disable-next-line: no-bitwise
        hash = hash & hash;
    }
    return hash;
}

export function generateRoomId(user1: string, user2: string): string {
    let roomId = '';
    if (hashString(user1) <= hashString(user2)) roomId = `${user2}$${user2}`;
    else roomId = `${user2}$${user2}`;
    return encrypt(roomId);
}
