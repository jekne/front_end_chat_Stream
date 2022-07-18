import { useState, useEffect } from "react";
import { queryMembers } from "../../Utils/queryMembers";

export default function ChatList({ channels, setChannel }) {
  const [makeItRender, setmakeItRender] = useState("");
  const [members, setMembers] = useState(null);

  useEffect(() => {
    channels.map((channel) => {
      channel.on((event) => {
        // console.log("what is event?", event);
        // console.log("what is channel?", channel);
        if (event.type === "message.read") {
          setmakeItRender(event);
        }
      });
    });
  }, [channels]);

  console.log("channels", channels);
  // console.log("what is members?", members[0]);
  // console.log("makeItRender", makeItRender);
  return (
    <div className="col-3 p-2 " style={{ height: "100%" }}>
      <div className="text-center border" style={{ height: "50%" }}>
        <h4>Channels</h4>
        {channels.map((channel, index) => (
          <div
            className="border"
            key={index}
            onClick={() => {
              setChannel(channel);
              setMembers(Object.values(channel.state.members));
            }}
          >
            <div style={{ fontSize: "14px" }}> {channel.id}</div>
            <div style={{ fontSize: "10px" }}>{channel.state.unreadCount}</div>
            <div style={{ fontSize: "10px" }}>
              {/* (
              {channel.state.messages[
                channel.state.messages.length - 1
              ].text.substring(0, 10)}
              ) */}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center border" style={{ height: "50%" }}>
        {members?.[0]
          ? members.map((member, index) => (
              <div
                className="border my-1"
                key={index}
                style={{ fontSize: "10px" }}
              >
                {member.user_id}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
