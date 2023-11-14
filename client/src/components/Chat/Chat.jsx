import React, { useRef, useState, useEffect } from "react";
import style from "./Chat.module.css";

export default function Chat({ socket, username, image }) {
  const bottomRef = useRef();
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const [clients, setClients] = useState();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((current) => [...current, data]);
    });

    socket.on("user_count", (data) => {
      setClients(data);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_count");
    };
  }, [socket]);

  useEffect(() => {
    scrollDown();
  }, [messageList]);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit("message", message);
    clearInput();
    focusInput();
  };

  const clearInput = () => {
    messageRef.current.value = "";
  };

  const focusInput = () => {
    messageRef.current.focus();
  };

  const getEnterKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const scrollDown = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={style["main"]}>
      <div className={style["mainwindow"]} id="contacts">
        <div className={style["contacts-header"]}>
          <div className={style["titlebar"]}>
            <img src="assets/general/live_logo.png" alt="Windows Live Logo" />
            <img id="title" src="assets/general/title_text.png" />
          </div>
          <div className={style["user-info"]}>
            <span style={{ width: "48px", height: "48px" }}>
              <img
                id="avatar"
                src={image ? image : "assets/chat-window/1531.png"}
                alt={`${username}'s Profile`}
                className={style["profile-picture"]}
              />
            </span>
            <img id="frame" src="assets/background/frame_48.png" />
            <div className={style["profile"]}>
              <button className={style["aerobutton"]} id="user">
                <h3 className={style["user-h3"]}>{username}</h3>
                <p id="status">(Busy)</p>
                <img
                  className={style["arrowdown"]}
                  src="assets/general/small_arrow_lightblue.svg"
                />
              </button>
              <button className={style["aerobutton"]} id="message">
                <p style={{ margin: 0 }}>stayin alive</p>
                <img
                  className={style["arrowdown"]}
                  src="assets/general/small_arrow_lightblue.svg"
                />
              </button>
            </div>
          </div>
        </div>
        <div id="contactsnav">
          <ul className={style["iconbar"]} id="left">
            <button
              className={style["left-contactaction"]}
              style={{
                backgroundColor: "transparent",
                border: "2px solid transparent",
                background:
                  "url(assets/contacts-window/1480.png) no-repeat center",
              }}></button>
            <button
              className={style["contactaction"]}
              style={{
                backgroundColor: "transparent",
                border: "2px solid transparent",
                background:
                  "url(assets/contacts-window/978.png) no-repeat center",
              }}></button>
            <button
              className={style["contactaction"]}
              style={{
                backgroundColor: "transparent",
                border: "2px solid transparent",
                background:
                  "url(assets/contacts-window/1484.png) no-repeat center",
              }}></button>
          </ul>
          <ul className={style["iconbar"]} id="right">
            <button
              style={{
                backgroundColor: "transparent",
                border: "2px solid transparent",
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
                alignItems: "center",
              }}
              className={style["right-contactaction"]}
              id="moreoptions">
              <img
                src="assets/contacts-window/1489.png"
                style={{ height: "16px" }}
              />
              <img
                className={style["arrowdown"]}
                src="assets/general/small_arrow.svg"
              />
            </button>
            <button
              className={style["right-contactaction"]}
              style={{
                backgroundColor: "transparent",
                border: "2px solid transparent",
                background:
                  "url(assets/contacts-window/329.png) no-repeat center",
              }}></button>
          </ul>
        </div>
        <div className={style["search"]}>
          <input
            id="contact-search"
            type="text"
            placeholder="Find a contact..."
          />
          <button
            className={style["searchbar-btn"]}
            style={{
              background:
                "url(assets/contacts-window/1131.png) no-repeat center",
            }}></button>
          <button
            className={style["searchbar-btn"]}
            style={{
              background:
                "url(assets/contacts-window/1132.png) no-repeat center",
            }}></button>
        </div>
        <ul className={style["contact-list"]}>
          <button className={style["listitem headerlist"]}>
            <img
              className={style["arrow"]}
              src="assets/general/arrow_placeholder.png"
            />
            <b>Online ( {clients ?? "0"} )</b>
          </button>
          <button className={style["listitem contact"]}>
            <img
              className={style["aerobutton status-icon"]}
              src="assets/status/online.png"
              alt="Online"
            />
            <span className={style["contact-text name"]}>
              ThatXPUser&nbsp;-&nbsp;
            </span>
            <p
              className={style["contact-text message"]}
              style={{ color: "darkgray" }}>
              i'm sad all day until i get to talk with friends, online friends
              that is
            </p>
          </button>
          <button className={style["listitem contact"]}>
            <img
              className={style["aerobutton status-icon"]}
              src="assets/status/busy.png"
              alt="Busy"
            />
            <span className={style["contact-text name"]}>
              ctaetsh&nbsp;-&nbsp;
            </span>
            <img
              className={style["emoticon"]}
              src="assets/contacts-window/595.png"
            />
            <a
              href="http://notimplemented.lol"
              className={style["contact-text message"]}>
              Black Eyed Peas - I Gotta Feeling
            </a>
          </button>
          <button className={style["listitem contact"]}>
            <img
              className={style["aerobutton status-icon"]}
              src="assets/status/away.png"
              alt="Away"
            />
            <span className={style["contact-text name"]}>
              jake&nbsp;-&nbsp;
            </span>
            <p
              className={style["contact-text message"]}
              style={{ color: "darkgray" }}>
              working on writing for ao3!!
            </p>
          </button>
          <button className={style["listitem contact"]}>
            <img
              className={style["aerobutton status-icon"]}
              src="assets/status/online.png"
              alt="Online"
            />
            <span className={style["contact-text name"]}>
              ThatXPUser&nbsp;-&nbsp;
            </span>
            <p
              className={style["contact-text message"]}
              style={{ color: "darkgray" }}>
              i'm sad all day until i get to talk with friends, online friends
              that is
            </p>
          </button>
          <button className={style["listitem contact"]}>
            <img
              className={style["aerobutton status-icon"]}
              src="assets/status/online.png"
              alt="Busy"
            />
            <span className={style["contact-text name"]}>
              ctaetsh&nbsp;-&nbsp;
            </span>
            <p
              className={style["contact-text message"]}
              style={{ color: "darkgray" }}>
              i'm sad all day until i get to talk with friends, online friends
              that is
            </p>
          </button>
          <button className={style["listitem contact"]}>
            <img
              className={style["aerobutton status-icon"]}
              src="assets/status/away.png"
              alt="Away"
            />
            <span className={style["contact-text name"]}>
              glassofwater369&nbsp;-&nbsp;
            </span>
            <p
              className={style["contact-text message"]}
              style={{ color: "darkgray" }}>
              working on writing for ao3!!
            </p>
          </button>
          <button className={style["listitem contact"]}>
            <img
              className={style["aerobutton status-icon"]}
              src="assets/status/away.png"
              alt="Online"
            />
            <span className={style["contact-text name"]}>
              yellows47&nbsp;-&nbsp;
            </span>
            <p
              className={style["contact-text message"]}
              style={{ color: "darkgray" }}>
              i'm sad all day until i get to talk with friends, online friends
              that is
            </p>
          </button>
          <button className={style["listitem contact"]}>
            <img
              className={style["aerobutton status-icon"]}
              src="assets/status/online.png"
              alt="Busy"
            />
            <span className={style["contact-text name"]}>
              ctaetsh&nbsp;-&nbsp;
            </span>
            <p
              className={style["contact-text message"]}
              style={{ color: "darkgray" }}>
              i'm sad all day until i get to talk with friends, online friends
              that is
            </p>
          </button>
          <button className={style["listitem contact"]}>
            <img
              className={style["aerobutton status-icon"]}
              src="assets/status/away.png"
              alt="Away"
            />
            <span className={style["contact-text name"]}>
              jake&nbsp;-&nbsp;
            </span>
            <p
              className={style["contact-text message"]}
              style={{ color: "darkgray" }}>
              working on writing for ao3!!
            </p>
          </button>
        </ul>
        <div id="footer">
          <span style={{ color: "#9bb3d4" }}>Advertisement</span>
          <img id="ad" src="assets/ad.png" alt="" />
        </div>
      </div>
      <div className={style["mainwindow"]} id="chat">
        <div className={style["tabs"]}>
          <button className={style["tabbutton"]}>
            <img
              className={style["status-icon"]}
              src="assets/status/busy.png"
              alt="status"
            />
            <span className={style["name"]}>
              <b>Alto</b>
            </span>
          </button>
          <button className={style["tabbutton"]}>
            <img
              className={style["status-icon"]}
              src="assets/status/away.png"
              alt="status"
            />
            <span className={style["name"]}>Duck</span>
          </button>
          <button className={style["tabbutton"]}>
            <img
              className={style["status-icon"]}
              src="assets/status/online.png"
              alt="status"
            />
            <span className={style["name"]}>jake</span>
          </button>
        </div>
        <div className={style["header"]}>
          <div id="info">
            <img id="chaticon" src="assets/chat-window/61.ico" />
            <div id="text">
              <span id="name">Alto</span>
              <span id="message">
                Wow, this is cool =) &lt;root@altodev.pw&gt;
              </span>
            </div>
          </div>
          <div id="navbars">
            <ul className={style["chatnav"]} id="left">
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/1441.png) no-repeat center",
                }}></button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/1444.png) no-repeat center",
                }}></button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/1447.png) no-repeat center",
                }}></button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/1442.png) no-repeat center",
                }}></button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/1443.png) no-repeat center",
                }}></button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/326.png) no-repeat center",
                }}></button>
            </ul>
            <ul className={style["chatnav"]} id="right">
              <button
                className={style["aerobutton chataction smallarrowbtn"]}
                id="moreoptions">
                <img
                  src="assets/chat-window/1489.png"
                  style={{ height: "16px" }}
                />
                <img
                  className={style["arrowdown"]}
                  src="assets/general/small_arrow_black.svg"
                />
              </button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/329.png) no-repeat center",
                }}></button>
            </ul>
          </div>
        </div>
        <div className={style["conversation"]}>
          <div id="messages">
            <div id="recieve">
              <div className={style["alerts"]}>
                <img src="assets/chat-window/1539.png" alt="" />
                <p className={style["alerttext"]}>
                  Alto is Busy and may not reply
                </p>
              </div>
              <div ref={bottomRef} />
              <div
                className={style["chattext"]}
                id="display"
                readonly
                style={{ "background-color": "white" }}>
                {messageList.map((msg) => (
                  <p key={msg.time}>
                    <strong>{msg?.author}: </strong>
                    {msg?.text}
                    <br />
                    <span>{msg?.time}</span>
                  </p>
                ))}
              </div>
            </div>
            <div id="handle"></div>
            <div id="send">
              <ul id="options">
                <button
                  className={style["aerobutton textoption smallarrowbtn"]}>
                  <img src="assets/chat-window/412.png" />
                  <img
                    className={style["arrowdown"]}
                    src="assets/general/small_arrow_black.svg"
                  />
                </button>
                <button
                  className={style["aerobutton textoption smallarrowbtn"]}>
                  <img src="assets/chat-window/1487.png" />
                  <img
                    className={style["arrowdown"]}
                    src="assets/general/small_arrow_black.svg"
                  />
                </button>
                <button
                  className={style["aerobutton textoption noarrow"]}
                  style={{
                    background:
                      "url(assets/chat-window/414.png) no-repeat center",
                  }}></button>
                <button
                  className={style["aerobutton textoption noarrow"]}
                  style={{
                    background:
                      "url(assets/chat-window/992.png) no-repeat center",
                  }}></button>
                <button
                  className={style["textoption"]}
                  style={{
                    background:
                      "url(assets/chat-window/20204.png) no-repeat center",
                    border: "none",
                  }}></button>
                <button
                  className={style["aerobutton textoption noarrow"]}
                  style={{
                    background:
                      "url(assets/chat-window/411.png) no-repeat center",
                  }}></button>
              </ul>
              <textarea
                className={style["chattext"]}
                ref={messageRef}
                id="write"
                placeholder="Type your message here..."></textarea>
              <div id="bottomtabs">
                <button className={style["editortab selected"]}>
                  <img src="assets/chat-window/963.png" />
                </button>
                <button className={style["editortab unselected"]}>
                  <img src="assets/chat-window/961.png" />
                </button>
                <div>
                  <button
                    id="sendbutton"
                    onClick={() => {
                      handleSubmit();
                    }}>
                    Send
                  </button>
                  <button id="search" disabled></button>
                </div>
              </div>
            </div>
          </div>
          <div id="avatars">
            <div id="topavatar">
              <img
                className={style["avatar"]}
                src="assets/chat-window/1531.png"
                alt=""
              />
              <img
                className={style["frame"]}
                src="assets/background/frame_96.png"
              />
              <div className={style["avatarnav"]}>
                <button
                  className={style["aerobutton avataraction"]}
                  style={{
                    background:
                      "url(assets/chat-window/268.png) no-repeat center",
                  }}></button>
                <button
                  className={style["aerobutton avataraction"]}
                  style={{
                    background:
                      "url(assets/chat-window/1457.png) no-repeat center",
                    float: "right",
                  }}></button>
              </div>
            </div>
            <div id="bottomavatar">
              <img
                className={style["avatar"]}
                style={{ width: "96px", height: "96px", objectFit: "cover" }}
                src={image ? image : "assets/chat-window/1531.png"}
                alt=""
              />
              <img
                className={style["frame"]}
                src="assets/background/frame_96.png"
              />
              <div className={style["avatarnav"]}>
                <button
                  className={style["aerobutton avataraction"]}
                  style={{
                    background:
                      "url(assets/chat-window/1457.png) no-repeat center",
                    float: "right",
                  }}></button>
              </div>
            </div>
          </div>
          <div id="expand">
            <button className={style["expandbutton"]}></button>
          </div>
        </div>
      </div>
    </div>
  );
}
