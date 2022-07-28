import { useState,useEffect } from "react";
import { queryChannels } from "../Utils/queryChannels.js";
import moment from "moment";



export default function ChatPage ({connectUser}){

      const userId = connectUser.me.id;

      const [channels, setChannels] = useState(null); // give me an array the channels that i participate
      const [channel, setChannel] = useState(null); // give me a specific channel
      const [sendMessage, setSendMessage] = useState("");
      const [messages, setMessages] = useState(channel);
      const [members, setMembers] = useState(null);
      const [watchers, setWatchers] = useState(null);
      const [event, setEvent] = useState("");

  useEffect(() => {
  
 
    queryChannels(setChannel, setChannels, userId);
  }, []);

  // console.log("what is channelss", channels);
  // console.log("what is channelllllll", channel);

  //  console.log("my members from chat page",members)

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


  //
    const [makeItRender, setmakeItRender] = useState("");
  // const [members, setMembers] = useState(null);

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
    setWatchers(channel?.state.watcher_count + 1);
  }, []);


  // Subscribe to listen events type: "new message" on channels
  useEffect(() => {
    console.log(`Start to listening new messages on channel: ${channel?.cid}`);

    channel?.on("message.new", (event) => {
      // console.log("what's event.cid?", event.cid);
      // console.log("what's event channel.cid?", channel.cid);
      setEvent(event);
      setmakeItRender(event);
    });
  }, [messages]);

//


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

  console.log(" the watchers!!!", watchers)
    return (
   <div className="col-3 p-2 " style={{ height: "100%" }}>
      <div className="text-center border" style={{ height: "50%" }}>
            <h1> CHAT PAGE TO RENDER CHAT</h1>
             <h3>Welcome back <font size="5" color="blue" face="arial"><strong> <i> {userId} !</i></strong></font></h3>
             <h4>role: {userId?.me?.role}</h4>
                  {/* <div>{!channels ? ("Loading ..."):(
                    <div>{channels.map((x)=>{
                      return (<div key={x.id}>
                        <h1>some information:{x?.id}</h1> 
                        <h1>channel type:{x?.type}</h1> 
                        <h1>Number of members:{x?.data.member_count}</h1>
                        <h6>Channel id: {x.cid}</h6>
                        </div>)
                        
                      } )}</div>
                    )} </div> */}
                 <div className="text-center border" style={{ height: "50%" }}>
        <h4 className="channel">Channels</h4>
   <div>{!channels ? ("Loading ...") :(
     <div>   {channels.map((channel, index) => (
       <div
       className="border"
       key={index}
       onClick={() => {
         setChannel(channel);
         setMembers(Object.values(channel.state.members));
          // setChannel(Object.values(channel.state.messageSets.messages))
        }}
        >
            <h1 style={{ fontSize: "25px" }}> {channel.id}</h1>
              <h3 style={{ fontSize: "15px" }}>Unread Count:{channel.state.unreadCount}</h3>
               <div style={{ fontSize: "15px" }}>Last message sent:
              
              {channel?.state.messages[
                channel?.state.messages.length - 1
              ]?.text.substring(0, 30)}
              
            </div>
          </div>
        ))}
        </div>
)}
  <h3> #{channel?.id}</h3>
        <h6> Watchers: {watchers ? `Users online ${watchers}` : null}</h6>

<h2> messages from the channel should appear here</h2>
   <div>{!messages ? ("Loading ...") :(
    <div>
         {messages?.map((message, index) => (
        <div
        key={index}
        className={message?.user.id === userId ? "text-right" : "text-left"}
        >
        <div>
        {`${message?.user.id} : ${message?.text} (${moment(
            message?.created_at
            ).format("ll")} at ${moment(message?.created_at).format(
                "HH:mm"
                )})`}
            </div>
          </div>
                
        ))}
  </div>
        )}</div>
        
      </div > 
      
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
         <div>

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
    {/* <div><ChatBox/></div> */}

    <div>


</div>
      
    </div>
        </div>
        
    )
}

