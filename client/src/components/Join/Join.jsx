import React, { useRef } from "react";
import { io } from "socket.io-client";
import style from "./Join.module.css";
import { Input, Button } from "@mui/material";

export default function Join({
  setChatVisibility,
  setSocket,
  setUsername,
  setImage,
}) {
  const usernameRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;

    const socket = io("https://localhost:3001", {
      rejectUnauthorized: false,
    });

    socket.on("connect", () => {
      socket.emit("set_username", username);
    });

    setSocket(socket);
    setChatVisibility(true);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className={style["join-container"]}>
        <h2>Chat em tempo real</h2>
        <Input inputRef={usernameRef} placeholder="Nome de usuário" />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <Button
          sx={{ mt: 2 }}
          onClick={() => handleSubmit()}
          variant="contained"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
