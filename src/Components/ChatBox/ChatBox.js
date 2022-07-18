import { useState, useEffect } from "react";
import moment from "moment";

export default function ChatBox({ setmakeItRender, channel, userId }) {
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState(channel.state.messages);
  const [event, setEvent] = useState("");
  const [watchers, setWatchers] = useState(null);

  // Set messages at first render and every time channel changes.
  useEffect(() => {
    console.log("Loading channel messages...");
    setMessages(channel.state.messages);
    console.log("Cleaning unread messages");
    channel.markRead();
  }, [channel]);

  useEffect(() => {
    console.log("Starting count users online");
    setWatchers(channel.state.watcher_count + 1);
  }, []);

  // Subscribe to listen events type: "new message" on channels
  useEffect(() => {
    console.log(`Start to listening new messages on channel: ${channel.cid}`);

    channel.on("message.new", (event) => {
      // console.log("what's event.cid?", event.cid);
      // console.log("what's event channel.cid?", channel.cid);
      setEvent(event);
      // setmakeItRender(event);
    });
  }, [messages]);

  useEffect(() => {
    // Users online
    channel.on((event) => {
      console.log("what's event", event);
      console.log("what's channel", channel);
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
    if (event.cid === channel.cid) {
      console.log("Cleaning unread messages");
      channel.markRead();
      console.log("same channel, update messages!");
      setMessages([...messages, event.message]);
    }
  }, [event]);

  // Function to sending messages. It makes an API call.
  const toSendMessage = async (message) => {
    try {
      await channel.sendMessage({ text: message });
    } catch (error) {
      console.log("send message failed > ", error);
    }
  };

  // Function to handle submit form.
  const handleSubmit = (e) => {
    e.preventDefault();
    toSendMessage(sendMessage);
    setSendMessage("");
  };

  // console.log("chatbox render");
  // console.log("what's channel.cid?", channel.cid);
  // console.log("what's event?", event);
  console.log("what's watchers?", watchers);
  console.log("actual chanel watchers", channel.state.watcher_count);

  return (
    <div className="col-9 border">
      {/* Load messages box*/}
      <div className="border  p-2" style={{ height: "93%" }}>
        <h3> #{channel.id}</h3>
        <h6> {watchers ? `Users online ${watchers}` : null}</h6>

        {messages.map((message, index) => (
          <div
            key={index}
            className={message.user.id === userId ? "text-right" : "text-left"}
          >
            <div>
              {`${message.user.id} > ${message.text} (${moment(
                message.created_at
              ).format("ll")} at ${moment(message.created_at).format(
                "HH:mm"
              )})`}
            </div>
          </div>
        ))}
      </div>

      {/* Send message input */}
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
      </div>
    </div>
  );
}
