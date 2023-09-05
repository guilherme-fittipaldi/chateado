import React, { useRef, useState, useEffect } from "react";
import { Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import style from "./Chat.module.css";

export default function Chat({ socket }) {
  const bottomRef = useRef();
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off("receive_message");
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
            <img id="avatar" src="assets/01CAT.jpg" alt="Profile Picture" />
            <img id="frame" src="assets/background/frame_48.png" />
            <div className={style["profile"]}>
              <button className={style["aerobutton"]} id="user">
                <h3 className={style["user-h3"]}>AndroidWG</h3>
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
              }}
            ></button>
            <button
              className={style["contactaction"]}
              style={{
                backgroundColor: "transparent",
                border: "2px solid transparent",
                background:
                  "url(assets/contacts-window/978.png) no-repeat center",
              }}
            ></button>
            <button
              className={style["contactaction"]}
              style={{
                backgroundColor: "transparent",
                border: "2px solid transparent",
                background:
                  "url(assets/contacts-window/1484.png) no-repeat center",
              }}
            ></button>
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
              id="moreoptions"
            >
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
              }}
            ></button>
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
            }}
          ></button>
          <button
            className={style["searchbar-btn"]}
            style={{
              background:
                "url(assets/contacts-window/1132.png) no-repeat center",
            }}
          ></button>
        </div>
        <ul className={style["contact-list"]}>
          <button className={style["listitem headerlist"]}>
            <img
              className={style["arrow"]}
              src="assets/general/arrow_placeholder.png"
            />
            <b>Online ( 4 )</b>
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
              style={{ color: "darkgray" }}
            >
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
              className={style["contact-text message"]}
            >
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
              style={{ color: "darkgray" }}
            >
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
              style={{ color: "darkgray" }}
            >
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
              style={{ color: "darkgray" }}
            >
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
              style={{ color: "darkgray" }}
            >
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
              style={{ color: "darkgray" }}
            >
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
              style={{ color: "darkgray" }}
            >
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
              style={{ color: "darkgray" }}
            >
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
                }}
              ></button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/1444.png) no-repeat center",
                }}
              ></button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/1447.png) no-repeat center",
                }}
              ></button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/1442.png) no-repeat center",
                }}
              ></button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/1443.png) no-repeat center",
                }}
              ></button>
              <button
                className={style["aerobutton chataction"]}
                style={{
                  background:
                    "url(assets/chat-window/326.png) no-repeat center",
                }}
              ></button>
            </ul>
            <ul className={style["chatnav"]} id="right">
              <button
                className={style["aerobutton chataction smallarrowbtn"]}
                id="moreoptions"
              >
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
                }}
              ></button>
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
              {/* // {messageList.map((message, index) => (
              //   <div
              //     className={`${style["message-container"]} ${
              //       message.authorId === socket.id && style["message-mine"]
              //     }`}
              //     key={index}
              //   >
              //     <div className={style["message-author">
              //       <strong>{message.author}</strong>
              //     </div>
              //     <div className={style["message-text">{message.text}</div>
              //   </div>
              // ))} */}
              <div ref={bottomRef} />
              <textarea className={style["chattext"]} id="display" readonly>
                Lorem ipsum dolor sit amet, dicta dolor instructior no ius,
                congue melius qualisque in sed. Ne impedit accusam assueverit
                duo. Ex pro sumo eros offendit. Quo iriure salutandi at. His
                dicta viris dolores cu, ut sed recusabo elaboraret. At volutpat
                consulatu sed, cum id munere atomorum. Albucius antiopam et pro,
                has semper iracundia ne. Cu sed utamur molestiae. Duis novum
                omittam pri ne. Ex sadipscing temporibus pri, assum utamur
                diceret mei no. Clita splendide eu vel, sumo dicta graeco has
                ut. Et nulla expetenda pertinacia vim, pri elit inciderint ea.
                Ad facer percipitur voluptatibus cum. Id vis reque consetetur,
                ludus tollit urbanitas id sit, usu dicunt regione scriptorem ne.
                Copiosae sapientem ne pri, assum tempor facete vel no. Et justo
                impedit referrentur his, ne mel prima prodesset vituperata. Ne
                posse mundi expetenda eam, iisque omittam ea has. Suas affert
                iudicabit cu vix, verear interesset te sea. An est nusquam
                ancillae, cetero imperdiet et eam, tale meliore ea sea. Dicit
                labores ne mel, ne qui paulo intellegat. Quo laudem fabulas
                phaedrum ea, mel te persecuti honestatis. Duo eu prima legere
                sadipscing. Ei assentior gloriatur expetendis mea, an mea
                fuisset eloquentiam consequuntur. Nisl iracundia ne quo. Quo
                dicat concludaturque ut, graeci tractatos an eam. Libris latine
                persius in eos, eu dicit elitr quidam quo, at debet ignota
                adolescens ius. An diam debitis mel, est te indoctum
                complectitur. Id libris praesent interesset vim, has tamquam
                aliquam ne, suas debitis et duo. Molestie expetendis at vel.
                Esse veniam his id, mucius placerat ne nec, ne nam possim
                reprehendunt. Dictas sanctus eos te. Mel elaboraret
                mediocritatem ne, nec eu tritani moderatius. Saperet laboramus
                id mea, zril libris urbanitas mei id, ius at nobis oportere
                consetetur. Modo signiferumque cu quo, cu quo prima albucius
                rationibus. Mel id minimum delicatissimi. Usu ignota nonumes
                civibus at, at tempor patrioque moderatius nam, postulant
                gloriatur mel no. Sed fabellas maiestatis cu, cu per impedit
                epicuri, cu vim utroque impedit quaerendum. Ut eam aeterno
                vivendum vituperata, pri utroque placerat no, cum et latine
                voluptua. Eam veniam dignissim id. Audiam prodesset nec te. At
                sit clita officiis intellegat. Facete verear invenire sed ad. No
                diam perfecto appellantur vix, ne cum malis option mnesarchum,
                sit in decore eripuit epicuri. Ipsum summo eirmod ex has. His
                habeo reprehendunt at, duo ei elitr imperdiet. Per in quaeque
                veritus facilisis. Duo ea duis definiebas repudiandae, per
                nemore meliore comprehensam ei. Mel recusabo consulatu ut.
                Timeam definitionem duo id, cu nam elitr admodum explicari. Pro
                delenit senserit convenire id, nec ad iisque aliquip eripuit.
                Est ut dicta disputando, postea legimus eos eu. Est ea harum
                platonem, cu docendi reprehendunt his. Has ubique nostrud at,
                vix doming iracundia ne. Summo primis inciderint duo at, vim ex
                tantas apeirian abhorreant. Te posse nominavi est, decore
                expetenda in cum, has constituto elaboraret et. Ut appetere
                conclusionemque quo, an option fuisset efficiendi vel, dicant
                copiosae usu an.
              </textarea>
            </div>
            <div id="handle"></div>
            <div id="send">
              <ul id="options">
                <button
                  className={style["aerobutton textoption smallarrowbtn"]}
                >
                  <img src="assets/chat-window/412.png" />
                  <img
                    className={style["arrowdown"]}
                    src="assets/general/small_arrow_black.svg"
                  />
                </button>
                <button
                  className={style["aerobutton textoption smallarrowbtn"]}
                >
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
                  }}
                ></button>
                <button
                  className={style["aerobutton textoption noarrow"]}
                  style={{
                    background:
                      "url(assets/chat-window/992.png) no-repeat center",
                  }}
                ></button>
                <button
                  className={style["textoption"]}
                  style={{
                    background:
                      "url(assets/chat-window/20204.png) no-repeat center",
                    border: "none",
                  }}
                ></button>
                <button
                  className={style["aerobutton textoption noarrow"]}
                  style={{
                    background:
                      "url(assets/chat-window/411.png) no-repeat center",
                  }}
                ></button>
              </ul>
              <textarea
                className={style["chattext"]}
                id="write"
                placeholder="Type your message here..."
              ></textarea>
              <div id="bottomtabs">
                <button className={style["editortab selected"]}>
                  <img src="assets/chat-window/963.png" />
                </button>
                <button className={style["editortab unselected"]}>
                  <img src="assets/chat-window/961.png" />
                </button>
                <div>
                  <button id="sendbutton" disabled>
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
                  }}
                ></button>
                <button
                  className={style["aerobutton avataraction"]}
                  style={{
                    background:
                      "url(assets/chat-window/1457.png) no-repeat center",
                    float: "right",
                  }}
                ></button>
              </div>
            </div>
            <div id="bottomavatar">
              <img className={style["avatar"]} src="assets/01CAT.jpg" alt="" />
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
                  }}
                ></button>
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

//{" "}
{
  /* // <div>
    // //   <div className={style['chat-container']}>
    // //     <div className={style["chat-body"]}>'
    // //     {
    // //       messageList.map((message,index) => (
    // //         <div className={`${style["message-container"]} ${message.authorId === socket.id && style["message-mine"]}`} key={index}>
    // //           <div className={style["message-author"><strong>{message.author}</strong></div>
    // //           <div className={style["message-text">{message.text}</div>
    // //         </div>
    // //       ))
    // //     }
    // //     <div ref={bottomRef} />
    // //     </div>
    // //     <div className={style["chat-footer"]}>
    // //       <Input inputRef={messageRef} placeholder='Mensagem' onKeyDown={(e)=>getEnterKey(e)} fullWidth />
    // //       <SendIcon sx={{m:1, cursor: 'pointer'}} onClick={()=>handleSubmit()} color="primary" />
    // //     </div>
    // //   </div>*/
}
//  </div>
