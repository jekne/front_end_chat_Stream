import { useState,useEffect } from "react";
import ChannelCard from "../Components/ChannelCard.js";
import { queryChannels } from "../Utils/queryChannels.js";
import { newQueryChannels } from "../Utils/queryChannels.js";



export default function ChatPage ({connectUser}){

      const userId = connectUser.me.id;

      const [channels, setChannels] = useState(null); // give me an array the channels that i participate
      const [channel, setChannel] = useState(null); // give me a specific channel

  useEffect(() => {
    // The default queryChannels API returns channels and starts watching them.
 
    queryChannels(setChannel, setChannels, userId);
  }, []);

  console.log("what is channelss", channels);
    console.log("what is channelllllll", channel);

// console.log("my user id from chat page",userId)
    return (
        <div>
            <h1> CHAT PAGE TO RENDER CHAT</h1>
             <h3>Welcome back <font size="5" color="blue" face="arial"> <i> {userId} !</i></font></h3>
             <h4>role{userId.role}</h4>
                  <a href="/">Logout</a> 
                  <div>{!channels ? ("Loading ..."):(
                  <div>{channels.map((x)=>{
                   return (<div key={x.id}>
                    <h1>some information::::::::{x?.id}</h1> 
                      <h1>channel type::::::::{x?.type}</h1> 
                      <h1>Number of members:{x?.data.member_count}</h1>
                      <h6>Created by: {x.cid}</h6>
                      </div>)
                  
                  } )}</div>
                 )} </div>
                  <ChannelCard />
        </div>
    )
}

{/* <div className="levelsAllPage">
        {!levels ? (
          "Loading..."
        ) : (
          <div className="levels">
            {levels.map((x) => {
              return (
                <div key={x.id} style={{ margin: 10 }}>
                  <Card style={{ width: "30rem" }}>
                    <h2> Level {x.levelRateFixed}</h2>
                  </Card>
                  <Card style={{ width: "30rem" }}>
                    <h5>{x.description}</h5>
                  </Card> */}

      //  <h5>Name: {props.name} </h5>
      //   <h6>id: {props.id}</h6>
      //   <h6>type: {props.type}</h6>
      //   <h6>Created by: {props.createdBy}</h6>