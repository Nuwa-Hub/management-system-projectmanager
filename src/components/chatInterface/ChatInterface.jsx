import React, { useEffect, useState, useRef } from "react";
import "./chatInterface.css";
import SendIcon from "@mui/icons-material/Send";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { db, auth, storage } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Message from "../message/Message";
import Instruction from "../instruction/Instruction";
import TodoApp from "../instruction/Instruction";
import { addNotification } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const ChatInterface = (props) => {
  const { taskHolder,taskName,taskId, user1, user2,holder } = props;
  const distpatch =useDispatch()

  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [file, setfile] = useState("");
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const getmsg = async () => {
      const msgsRef = collection(db, "messages", taskId, "chat");
      const q = query(msgsRef, orderBy("createdAt", "asc"));

      onSnapshot(q, (querySnapshot) => {
        let msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMsgs(msgs);
      });

      // get last message b/w logged in user and selected user
      const docSnap = await getDoc(doc(db, "lastMsg", taskId));
      // if last message exists and message is from selected user
      if (docSnap.data() && docSnap.data().from !== user1) {
        // update last message doc, set unread to false
        await updateDoc(doc(db, "lastMsg", taskId), { unread: false });
      }
    };
    getmsg()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url;
    if (file) {
      const fileRef = ref(
        storage,
        `filess/${new Date().getTime()} - ${file.name}`
      );
      const snap = await uploadBytes(fileRef, file);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", taskId, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", taskId), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });
      //add notification whe  add a instruction
   
      const notification = {
        title: ` ${taskName} >added new message `,
        receiverId: taskHolder,
        taskId: taskId,
      };
      addNotification(notification,distpatch);
    setText("");
    setfile("");
  };

  return (
    <div className="chatInterface">
      <div id="frame">
        <div id="sidepanel">
          <div className="text">
            <Instruction taskId={taskId} taskHolder={taskHolder} taskName={taskName}/>
          </div>
        </div>
        <div class="content">
          <div class="contact-profile">
            <img className="holderdp" src={holder.img || "http://emilcarlsson.se/assets/harveyspecter.png"} alt="" />
            <p>Harvey Specter</p>
          </div>
          <div class="messages">
            <ul>
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </ul>
          </div>
          <form className="message_form" onSubmit={handleSubmit}>
            <div class="message-input">
              <div class="wrap">
                <input
                  type="text"
                  placeholder="Write your message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <input
                  onChange={(e) => setfile(e.target.files[0])}
                  type="file"
                  id="file-input"
                  accept=""
                  style={{ display: "none" }}
                />
                
                <label htmlFor="file-input">
                  <h6 className="sendfilename">{file.name}</h6>
                  <FileUploadIcon className="attachment" />
                </label>
                <button class="submit">
                  <SendIcon className="chatsendicon" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
