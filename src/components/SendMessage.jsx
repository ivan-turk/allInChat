import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

const SendMessage = () => {
  const [value, setValue] = useState(""); // useState, prazan string na initial
  const { currentUser } = UserAuth();

  const handleSendMessage = async (e) => {
    e.preventDefault(); //zaustavljamo defaultno ponašanje browsera da se ne refresh-a

    if (value.trim() === "") {
      alert("Upišite valjanu poruku!");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      await addDoc(collection(db, "messages"), {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
    } catch (error) {
      console.log(error);
    }

    setValue(""); // nakon submit-a vraćamo vrijednost na prazan string!
  };

  return (
    <div className="bg-gray-200 fixed bottom-0 w-full py-10 shadow-lg">
      <form onSubmit={handleSendMessage} className="containerWrap flex px-2">
        <input
          value={value} // postavljena vrijednost na prazan string
          onChange={(e) => setValue(e.target.value)} //onChange event mjenjaj vrijednost
          className="input w-full focus:outline-none bg-gray-100 rounded-r-none font-medium text-black"
          type="text"
        />
        <button
          type="submit"
          className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm"
        >
          Pošalji
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
