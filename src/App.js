import { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./Component/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./Component/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-configure";
const cookie = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  let signUserOut= async ()=>{
      await signOut(auth);
      cookie.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
  }
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="Room">
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter chat
          </button>
        </div>
      )}
      <div className="sign-out">
        <button onClick={signUserOut}>Sign out</button>
      </div>
    </>
  );
}

export default App;
