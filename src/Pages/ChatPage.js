import { useState,useEffect } from "react";
import ChannelCard from "../Components/ChannelCard";
import { queryChannels } from "../Utils/queryChannels";
import { newQueryChannels } from "../Utils/queryChannels";
export default function ChatPage ({connectUser}){
      const userId = connectUser.me.id;
        const [channels, setChannels] = useState(null);
        const [channel, setChannel] = useState(null);

  useEffect(() => {
    // The default queryChannels API returns channels and starts watching them.
    // There is no need to also use channel.watch on the channels returned from queryChannels
    queryChannels(setChannel, setChannels, userId);
  }, []);

  console.log("what is channels", channels);
    console.log("what is channelllllll", channel);

console.log("my user id from cha page",userId)
    return (
        <div>
            <h1> CHAT PAGE TO RENDER CHAT</h1>
             <h3>Welcome back <font size="5" color="blue" face="arial"> <i> {userId} !</i></font></h3>
                  <a href="/">Logout</a> 
                  <ChannelCard/>
        </div>
    )
}