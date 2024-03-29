import { useState,useEffect } from "react";
import { queryChannels } from "../Utils/queryChannels.js";
import moment from "moment";
import "./style.css"


export default function RebuildingChatPage ({connectUser}){

      const userId = connectUser.me.id;

      const [channels, setChannels] = useState(null); // give me an array the channels that i participate
      const [channel, setChannel] = useState(null); // give me a specific channel
      const [sendMessage, setSendMessage] = useState("");
      const [messages, setMessages] = useState([]);
      const [members, setMembers] = useState(null);
      const [watchers, setWatchers] = useState(null);
      const [event, setEvent] = useState("");
  const [makeItRender, setmakeItRender] = useState("");

  useEffect(() => {
  
 
    queryChannels(setChannel, setChannels, userId);
  }, []);

//  console.log("what is channelss", channels);
//   console.log("what is channelllllll", channel);
  console.log(" the watchers!!!", watchers)

  //???
    useEffect(() => {
    
    channels?.map((channel) => {
      channel.on((event) => {
        console.log("what is event?", event);
        console.log("what is channel?", channel);
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
      setWatchers(channel?.state.watcher_count );
  }, [channel]);

  // Subscribe to listen events type: "new message" on channels
  useEffect(() => {
    console.log(`Start to listening new messages on channel: ${channel?.cid}`);

    channel?.on("message.new", (event) => {
      console.log("what's event.cid?", event.cid);
      console.log("what's event channel.cid?", channel.cid);
      setEvent(event);
      setmakeItRender(event);
    });
  }, [messages]);

    useEffect(() => {
    // Users online
    channel?.on((event) => {
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
    if (event?.cid === channel?.cid) {
      console.log("Cleaning unread messages");
      channel?.markRead();
      console.log("same channel, update messages!");
      setMessages([...messages, event?.message]);
    }
  }, [event]);

//

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
    // console.log("send message from chat page",sendMessage)
      console.log("CHANNEL from chat page",channel)
      console.log("my messages from chat page",messages)
  };


    return (
        <div className="mainContainer">
             <h1> CHAT PAGE TO RENDER CHAT</h1>
                          <h3>Welcome back <font size="5" color="blue" face="arial"> <i> {userId} !</i></font></h3>

        <div>
        <h3> LISTENING CHANNEL: {channel?.id}</h3>
        <h6> Watchers: {watchers ? `Users online ${watchers}` : null}</h6>
        </div>
                     
        <div>

            
  <h4 className="channel" >Channels</h4>
        
    <div >{!channels ? ("Loading ...") :(
        <div >   {channels.map((channel, index) => (   
       <div style={{border: '1px solid black'}}
       className="border"
       key={index}
       onClick={() => {
         setChannel(channel);
         setMembers(Object.values(channel.state.members));
        }}
        >
             <h1 style={{ fontSize: "25px" }}> {channel.id}</h1>
              <h2 style={{ fontSize: "15px" }}>Unread Count:{channel?.state.unreadCount}</h2>
               <h3 style={{ fontSize: "15px" }}>Last message sent:
              
                    {channel?.state.messages[
                     channel?.state.messages.length - 1
                    ]?.text.substring(0, 30)}
               </h3>
          </div>
        ))}
        </div>
      )}
    
            </div>
            </div>
            <div>
                
   <div style={{ fontSize: "20px" }}>  Memebers of the channel: {channel?.id}</div> 
      </div>
      <div className="text-center border" style={{ height: "150%"  }}>
        <div>
        {members?.[0]
          ? members.map((member, index) => (
              <div
                className="border my-1"
                key={index}
                style={{ fontSize: "15px" }}
              >
                {member.user_id}
              </div>
            ))
          : null}
      
      </div>

            </div>
            <div className="border  p-2" style={{ height: "93%" }}>

             <h2> messages from the channel should appear here</h2>
   <div>{!messages ? ("Loading ...") :(
    <div>
         {messages?.map((message, index) => (
        <div
        key={index}
        className={message?.user?.id === userId ? "text-right" : "text-left"}
        >
        {`${message?.user?.id} : ${message?.text} (${moment(
            message?.created_at
            ).format("ll")} at ${moment(message?.created_at).format(
                "HH:mm"
                )})`}
        <div>
            </div>
          </div>
                
        ))}
  </div>
        )}</div>
        
   <div className="border  p-2" style={{ height: "93%" }}>

<h1>Send Message</h1>
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
        </div></div>

         </div>
<a href="/">Logout</a> 
      </div>
  
 <div className="col-9 border">
      {/* Load messages box*/}
      <div className="border  p-2" style={{ height: "93%" }}>
        <h3> #{channel?.id}</h3>
        <h6> {watchers ? `Users online ${watchers}` : null}</h6>

        {messages.map((message, index) => (
          <div
            key={index}
            
            >
              {message?.user?.id === userId ? "text-right" : "text-left"}
              {/* {`${message?.user?.id} > ${message?.text} (${moment(
                message?.created_at
                ).format("ll")} at ${moment(message?.created_at).format(
                  "HH:mm"
                  )})`} */}
          
          </div>
        ))}
      </div>
</div>
    <div>

            </div>
        </div>
    )
}