# Chat SDK

A package which supports different types of ready to use chat features

Currently we only support realtime chat using [firebase][https://console.firebase.google.com]

## Features

-   Create rooms
-   Get list of available rooms
-   Send a message to a room
-   Listen for realtime message updates
-   Attachment (string, image)

---

### Installation

`npm install @amitkumarnagar/chats`

---

## Usage

You can get you firebase config by following these steps: [Firebase Config][https://firebase.google.com/docs/web/setup]

**firebase config example**

```javascript
var firebaseConfig = {
    apiKey: 'api-key',
    authDomain: 'project-id.firebaseapp.com',
    databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'project-id',
    storageBucket: 'project-id.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
};
```

```javascript
import Chats from '@amitkumarnagar/chats';

// initialize chatService
const chatService = Chats(firebaseConfig);

// get all chat rooms
const chatRooms = await chatService.getAllRooms();
```

> **Create a chat room**

```javascript
const user1 = { _id: '33', name: 'user1' };
const user2 = { _id: '44', name: 'user2' };

// create a chat room with 2 users
await chatService.createRoom([user1, user2]);
```

> **Send a message**

```javascript
const content = {
    body: 'Hi, how are you?',
    sender: { _id: '11' },
    receiver: { _id: '22' },
    senderId: '11',
    receiverId: '22',
    roomId: 'e358770d6ff52541b078689f5afba5b2',
    isRead: false,
    timeStamp: Date.now(),
    attachment: '',
};

// send a message to a chat room represented by roomId
await chatService.sendMessage(roomId, content);
```

> **Listen for realtime message updates**

```javascript
chatSetvice.onNewMessage(userId, payload => {
    console.log('[New message received]', payload);
});
```

> **Get all message of a room**

```javascript
await chatService.getAllMessages(roomId);
```

_To get message for a specific user, pass second parameter `userId`_

```javascript
await chatService.getAllMessages(roomId, userId);
```

_Easily render message to left or right based on `receiptType`_

```javascript
message = { ..., receiptType: 'received' | 'sent'}
```

---

**Message Content**
| Property | Type | Description |
| --------- | --------- | ----------- |
| body | `string` | message content
| sender/receiver | `object` | A user object for chat rooms
| senderId/receiverId | `string` | A unique id for a user
| roomId | `string` | chat room's unique Id
| attachment | `string | base64` | attachment to be sent

---

<br />

**User**
| Property | Type | Required | Description |
| --------- | --------- | -------- | ----------- |
| \_id | `string` | true | A unique user Id
| name | `string` | false | name of the user
| firstName | `string` | false | first name of the user
| lastName | `string` | false | last name of the user
| fullName | `string` | false | full name of the user
| profileImg | `string` | false | user profile image url
