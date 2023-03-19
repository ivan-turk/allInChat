// Context folder stvoren za spremanje funkcija login-a,logout-a i trenutnog usera

import { createContext, useState, useContext, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

// creating context: da bi napravio globalni state (kreiramo hook)
const AuthContext = createContext();

// provider context -- children -- sve što je unutra u komponenti prima context, to je PROP
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); //globalni stateovi za trenutnog usera
  // stavljeno je null jer početna vrijednost nema korisnika!

  //-------------------LOADING----------
  const [loading, setLoading] = useState(true);

  //-> state koji je zadužen da se nakon autentifikacije loada odmah "/chat"

  //sign in sa google:
  const signinWithGoogle = () => {
    const provider = new GoogleAuthProvider(); // ovo je klasa koja kreira novog korisnika
    signInWithRedirect(auth, provider); //auth autentificira novog usera i sprema u provider
  };

  //sign out:

  const logout = () => signOut(auth); //dolazi iz Firebase-a

  //brisanje svih poruka:
  const deleteAllMessages = async () => {
    const messagesRef = collection(db, "messages");
    const querySnapshot = await getDocs(messagesRef);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  const value = {
    //value je važan, jer u njega ide sve što ćeš prebacivati u druge komponente
    currentUser,
    setCurrentUser,
    signinWithGoogle,
    logout,
    deleteAllMessages,
  };

  //set current user:

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); //kada dođe do promjene napravi novoga usera
      setLoading(false);
    });

    return unsubscribe; //pozvana je unsubscribe varijabla da bi se izvršila funkcija
  }, []); //prazan array ide u ponovni render

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
  // preko value šalje prop svim drugim komponentama, a children prima od drugih komponenti
};

export const UserAuth = () => {
  //imenovani context koji koristimo u drugim komponentama
  return useContext(AuthContext);
};
