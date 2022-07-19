import { useState, useEffect } from "react";
import ChatBox from "../Components/ChatBox/ChatBox";
import ChatList from "../Components/ChatList/ChatList";

// Functions
// import { queryChannels } from "../../Utils/queryChannels";
import { queryChannels } from "../Utils/queryChannels.js";
import { newQueryChannels } from "../Utils/queryChannels.js";

export default function Lobby({ connectUser }) {
  const userId = connectUser.me.id;
    // const userId = connectUser;
  console.log("what it is the userId",userId)
  const [channels, setChannels] = useState(null);
  const [channel, setChannel] = useState(null);
  // const [makeItRender, setmakeItRender] = useState("");

  useEffect(() => {
    // The default queryChannels API returns channels and starts watching them.
    // There is no need to also use channel.watch on the channels returned from queryChannels
    queryChannels(setChannel, setChannels, userId);
  }, []);

  console.log("what is channels", channels);
  console.log("what is channel", channel);

  return (
    <div className="container border my-3">
      <h3>Hello {userId}</h3>
      <a href="/">Logout</a> 
      <div className="row border" style={{ height: "85vh" }}>
        {channels && <ChatList channels={channels} setChannel={setChannel} />}
        {channel?.data.id && <ChatBox channel={channel} userId={userId} />}
      </div>
    </div>
  );
}
