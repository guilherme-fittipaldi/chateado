import { useState } from "react";
import "./App.css";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

function App() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      {chatVisibility ? (
        <Chat socket={socket} username={username} />
      ) : (
        <Join
          setSocket={setSocket}
          setChatVisibility={setChatVisibility}
          setUsername={setUsername}
        />
      )}
    </div>
  );
}

export default App;
