import { StreamChat } from "stream-chat";

const API_KEY = "9q8cp29sk4fh";

const chatClient = StreamChat.getInstance(API_KEY);
const client = StreamChat.getInstance(API_KEY);
//WE NEED TOKEN AND KEY
//Query Channels
export const queryChannels = async (setChannel, setChannels, userId) => {
  try {
    // console.log("getChannels called");
    console.log("what is userId !!!!!!!!!!!!!", userId);
    // console.log("what is chatClient", chatClient);

    // const filter = {
    //   $or: [
    //     { type: "team",members:{ $in: ["new"]} },
    //     { type: "messaging", members: { $in: [userId] } },
    //   ],
    // };

    const filter = { members: { $in: [userId] } };

    const sort = { last_message_at: -1 };

    const result = await chatClient.queryChannels(filter, sort, {
      offset: 0,
      limit: 30,
      message_limit: 300,
    });
    ///change for ten and have less message
    console.log("queryChannels called result", result);
    setChannels(result);
    setChannel(result[0]);
  } catch (error) {
    console.log("query channels failed", error);
  }
};

// export const newQueryChannels = async(setChannel, setChannels, userId)=>{
//   try {
//     const filter = { type: 'messaging', members: { $in: ['thierry'] } };
// const sort = [{ last_message_at: -1 }];

// const channels = await chatClient.queryChannels(filter, sort, {
//     watch: true, // this is the default
//     state: true,
// });

// channels.map((channel) => {
//         console.log(channel.data.name, channel.cid)
//     })
//     const result = await chatClient.queryChannels(filter, sort);
//     console.log("queryChannels called");
//     setChannels(result);
//     setChannel(result[0]);

//   } catch (error) {
//       console.log("query channels failed", error);

//   }
// }

queryChannels("johann").then((r) => console.log(r));
