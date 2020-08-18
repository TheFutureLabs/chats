import firebase, { firestore } from 'firebase';
import initializeFirebase from '../config';
import { APP_STRINGS } from '../strings';
import { generateRoomId } from '../utils';
import { IMsgObj, IUser } from '../interfaces';

class Chats {
    private readonly myFirebase: firebase.app.App;
    private readonly myFirestore: firestore.Firestore;
    private readonly myStorage: firebase.storage.Storage;

    public activeUser?: IUser;
    public allUser: IUser[] = [];
    public allMessages: IMsgObj[] = [];

    public constructor(config: { [key: string]: string }) {
        const { myFirebase, myFirestore, myStorage } = initializeFirebase(config);

        this.myFirebase = myFirebase;
        this.myFirestore = myFirestore;
        this.myStorage = myStorage;
    }

    private async createRoomId(users: string[]) {
        const [user1, user2] = users;
        return generateRoomId(user1, user2);
    }

    // TODO: Change the user array
    public async createRoom(users: IUser[]) {
        const userIds = users.map(u => u._id);
        const roomId = await this.createRoomId(userIds);
        try {
            await this.myFirestore
                .collection(APP_STRINGS.ROOMS)
                .doc(roomId)
                .set({ roomId, users, userIds }, { merge: true });
        } catch (error) {
            return error;
        }
    }

    public async getAllRooms() {
        try {
            const docSnapshot: firestore.DocumentData = await this.myFirestore.collection(APP_STRINGS.ROOMS).get();
            const rooms = docSnapshot.docs.map((room: firestore.DocumentSnapshot) => {
                console.log('room => ', room.ref.path);
                return room.data();
            });
            return rooms;
        } catch {
            return [];
        }
    }

    public async getAllMessages(roomId: string, userId?: string) {
        if (!roomId) throw new Error('roomId required.');

        try {
            const docSnapshot: firestore.DocumentData = await this.myFirestore
                .doc(`${APP_STRINGS.ROOMS}/${roomId}`)
                .collection(APP_STRINGS.HISTORY)
                .orderBy(APP_STRINGS.TIMESTAMP, 'desc')
                .get();
            // const docSnapshot: firestore.DocumentData = await this.myFirestore
            //     .collection(APP_STRINGS.MESSAGES)
            //     .where('senderId', '==', '11')
            //     .where('receiverId', '==', '22')
            //     .orderBy(APP_STRINGS.TIMESTAMP, 'desc')
            //     .limit(1)
            //     .get();
            this.allMessages = docSnapshot.docs.map((message: firestore.DocumentSnapshot) => {
                const data = message.data() || {};
                if (userId) data.receiptType = userId === data.receiverId ? 'received' : 'sent';
                return data;
            });
            console.log('all messages : ', this.allMessages);
            return this.allMessages;
        } catch (error) {
            console.log('Error getting message: ', error);
        }
    }

    public onNewMessage(userId: string, cb: (newMessage: { changeType: any; data: any }) => void) {
        if (!userId) throw new Error('userId required.');
        if (!cb) throw new Error('callback required.');

        return this.myFirestore
            .collection(APP_STRINGS.ROOMS)
            .where('userIds', 'array-contains', userId)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    console.log('new message received: ', change.type, change.doc.data());
                    const update = {
                        changeType: change.type,
                        data: change.doc.data(),
                    };
                    cb(update);
                    return update;
                });
            });
    }

    private async uploadMedia(data: any, userId: string) {
        if (!userId) throw new Error('userId required.');

        if (!data) throw new Error('upload data required.');

        try {
            const uploadTask: firebase.storage.UploadTaskSnapshot = await this.myStorage
                .ref()
                .child(userId)
                .putString(data);

            return uploadTask.ref.getDownloadURL();
        } catch (error) {
            return '';
        }
    }

    public async sendMessage(roomId: string, msgObj: IMsgObj) {
        if (!roomId) throw new Error('roomId required.');

        try {
            if (msgObj.attachment) {
                const media = await this.uploadMedia(msgObj.attachment, msgObj.senderId);
                console.log('media url => ', media);
            }

            // await this.myFirestore.collection(APP_STRINGS.MESSAGES).add(msgObj);
            await this.myFirestore
                .doc(`${APP_STRINGS.ROOMS}/${roomId}/${APP_STRINGS.HISTORY}/${msgObj.timeStamp}`)
                .set(msgObj, { merge: true });

            // update recent message
            await this.myFirestore.doc(`${APP_STRINGS.ROOMS}/${roomId}`).set({ lastMessage: msgObj }, { merge: true });
            return {};
        } catch (error) {
            return error;
        }
    }
}

export default Chats;
