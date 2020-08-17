import Chats from './app';

const config = {
    apiKey: 'AIzaSyDZIya5TikDNOHea5adozQ515lVwdz690U',
    authDomain: 'project-0927.firebaseapp.com',
    databaseURL: 'https://project-0927.firebaseio.com',
    projectId: 'project-0927',
    storageBucket: 'project-0927.appspot.com',
    messagingSenderId: '215710443383',
    appId: '1:215710443383:web:b363cd15aab1f589722372',
};

// const chatService = new Chats(config);

// chatService.createRoom([{_id: "33", name: 'aaaassss' }, { _id: "44", name: 'bbb' }]);

// chatService.getAllRooms();

const msgObj = {
    body: 'kkkk ya ',
    sender: { _id: '11' },
    receiver: { _id: '22' },
    senderId: '11',
    receiverId: '22',
    roomId: 'e358770d6ff52541b078689f5afba5b2',
    isRead: false,
    timeStamp: Date.now(),
    // attachment: 'This is my message.',
};

// chatService.sendMessage('e358770d6ff52541b078689f5afba5b2', msgObj);

// chatService.getAllMessages('e358770d6ff52541b078689f5afba5b2');

// chatService.onNewMessage("33");
const initChatService = (firebaseConfig: { [key: string]: string }) => new Chats(firebaseConfig);

export default initChatService;
