import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  doc,
  orderBy,
} from "firebase/firestore";
import "../Style/Chat.css";
import { auth, db } from "../firebase-configure";
export const Chat = (props) => {
  const { room } = props;
  let [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState([]);
  const messagesRef = collection(db, "message");

  useEffect(() => {
    const queryMessage = query(messagesRef, where("room", "==", room),orderBy("createdAt"));
    const unSuscribe = onSnapshot(queryMessage, (snapShot) => {
         let message = [];
      snapShot.forEach((doc) => {
        message.push({ ...doc.data(), id: doc.id });
      });
      console.log(message);
      setMessage(message);
    });

    return () => unSuscribe();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">WELCOME TO :{room.toUpperCase()}</div>
      <div className="messages">
        {message.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message...."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
