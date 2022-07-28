import { useState, useEffect } from "react";
import { queryChannels } from "../Utils/queryChannels.js";
import moment from "moment";
import "./style.css";

export default function FormingChat({ connectUser }) {
  const userId = connectUser.me.id;

  const [channels, setChannels] = useState(null); // give me an array the channels that i participate
  const [channel, setChannel] = useState(null); // give me a specific channel
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState(null);
  const [watchers, setWatchers] = useState(null);
  const [event, setEvent] = useState("");
  const [makeItRender, setmakeItRender] = useState("");
  const [upload, setUpload] = useState("");

  useEffect(() => {
    queryChannels(setChannel, setChannels, userId);
  }, []);

  //  console.log("what is channelss", channels);
  //   console.log("what is channelllllll", channel);
  //   console.log(" the watchers!!!", watchers)

  //???
  useEffect(() => {
    channels?.map((channel) => {
      channel.on((event) => {
        // console.log("what is event?", event);
        // console.log("what is channel?", channel);
        if (event.type === "message.read") {
          setmakeItRender(event);
        }
      });
    });
  }, [channels]);

  //

  // Set messages at first render and every time channel changes.
  useEffect(() => {
    console.log("Loading channel messages...");
    setMessages(channel?.state.messages);
    console.log("Cleaning unread messages");
    channel?.markRead();
  }, [channel]);

  useEffect(() => {
    console.log("Starting count users online");
    // setWatchers(channel?.state.watcher_count + 1);
    setWatchers(channel?.state.watcher_count);
  }, [channel]);

  // Subscribe to listen events type: "new message" on channels
  useEffect(() => {
    console.log(`Start to listening new messages on channel: ${channel?.cid}`);

    channel?.on("message.new", (event) => {
      //   console.log("what's event.cid?", event.cid);
      //   console.log("what's event channel.cid?", channel.cid);
      setEvent(event);
      setmakeItRender(event);
    });
  }, [messages]);

  useEffect(() => {
    // Users online
    channel?.on((event) => {
      //   console.log("what's event", event);
      //   console.log("what's channel", channel);
      if (
        event.type === "user.watching.start" ||
        event.type === "user.watching.stop"
      ) {
        console.log("User online updated!");
        setWatchers(event.watcher_count);
      }
    });
  }, [channel]);

  // Check if the event is related to the current channel
  useEffect(() => {
    if (event?.cid === channel?.cid) {
      console.log("Cleaning unread messages");
      channel?.markRead();
      console.log("same channel, update messages!");
      setMessages([...messages, event?.message]);
    }
  }, [event]);

  //

  // Function to sending messages. It makes an API call.
  const toSendMessage = async () => {
    try {
      await channel.sendMessage({
        text: sendMessage,
        attachments: [
          {
            type: "image",
            image_url: upload,
            thumb_url: upload,
          },
        ],
      });
    } catch (error) {
      console.log("send message failed > ", error);
    }
  };

  // Function to handle submit form.
  const handleSubmit = (e) => {
    e.preventDefault();
    toSendMessage();
    setSendMessage("");
    // console.log("send message from chat page",sendMessage)
    // console.log("CHANNEL from chat page", channel);
    // console.log("my messages from chat page", messages);
  };

  //Upload Images
  async function getUrl(event) {
    const files = event.target.files;
    const response = await channel.sendImage(files[0]);
    response && setUpload(response.file);
    console.log(upload);
  }

  return (
    <div className="containerFormingMain">
      <div className="topOftheChat">
        <h3>
          Welcome back{" "}
          <p>
            {" "}
            <i> {userId} !</i>
          </p>
        </h3>

        <h3> LISTENING CHANNEL: {channel?.id}</h3>
        <h4> Watchers: {watchers ? `Users online ${watchers}` : null}</h4>
      </div>

      <div className="containerChannelAndDisplay">
        {/* <div className="holdingChannels"> */}
        <div>
          {!channels ? (
            "Loading ..."
          ) : (
            <div>
              {" "}
              {channels.map((channel, index) => (
                <div
                  className="channelBoxes"
                  key={index}
                  onClick={() => {
                    setChannel(channel);
                    setMembers(Object.values(channel.state.members));
                  }}
                >
                  <h1 style={{ fontSize: "25px" }}> {channel.id}</h1>
                  <h2 style={{ fontSize: "15px" }}>
                    Unread Count:{channel?.state.unreadCount}
                  </h2>
                  <h3 style={{ fontSize: "15px" }}>
                    Last message sent:
                    {channel?.state.messages[
                      channel?.state.messages.length - 1
                    ]?.text.substring(0, 30)}
                  </h3>
                </div>
              ))}
            </div>
          )}

          {/* </div> */}
        </div>

        <div className="messageAndDisplaychat">
          <div className="textMessages">
            {messages?.map((message, index) => (
              <div
                key={index}
                className={
                  message?.user?.id === userId ? "text-right" : "text-left"
                }
              >
                {message?.attachments.map((att, index) => {
                  return <img key={index} src={att.image_url} />;
                })}
                {`${message?.user?.id} : ${message?.text} (${moment(
                  message?.created_at
                ).format("ll")} at ${moment(message?.created_at).format(
                  "HH:mm"
                )})`}
              </div>
            ))}
          </div>

          <div className="sendMessages">
            <h1>SEND MESSAGE</h1>
            <div className="border py-1 row">
              <div className="col-9 ">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="type your message..."
                    value={sendMessage}
                    onChange={(e) => setSendMessage(e.target.value)}
                  />
                </form>
              </div>
              <input type="file" id="real-file" hidden="hidden" />
              <input type="file" onChange={getUrl}></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function FormingChat (){
//     return(
//         <div className="containerFormingMain">

//             <div>Hello name </div>

//             <div className="containerChannelAndDisplay">

//                 <div className="holdingChannels">channels</div>

//                 <div className="messageAndDisplaychat">
//                 <div>display chat</div>
//                 <div>messages</div>
//                 </div>
//             </div>
//         </div>
//     )
// }
