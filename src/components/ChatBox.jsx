import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import Message from "./Message";

const ChatBox = () => {
  const messagesEndRef = useRef(); //hookica potrebna za scroll
  const [messages, setMessages] = useState([]);

  const scroll = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scroll, [messages]); //useEffect za scroll svaki put kad se promjeni

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"), // slaganje poruka po vremenu objave
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe;
  }, []);

  return (
    <div className="pb-44 pt-20 containerWrap">
      {messages.map(
        (
          poruka // mapiramo kroz messages i uzimamo individualni objekt 1po1
        ) => (
          <Message key={poruka.id} imepropa={poruka} /> //vraćamo cijelu komponentu Message
          // key koristimo kad ide map - kao identifikator svakog objekta
          // poruka.id --> samo za key da zna koji je objekt prošao, možemo staviti bilo koji property za ID,ali mora biti unikatan!
          //
        )
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;
