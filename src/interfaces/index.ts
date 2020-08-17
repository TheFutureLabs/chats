export interface IUser {
    _id: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    profileImg?: string;
}

export interface IMsgObj {
    body: string;
    sender: IUser;
    receiver: IUser;
    senderId: string;
    receiverId: string;
    roomId: string;
    isRead: boolean;
    timeStamp: number;
    attachment?: any;
}
