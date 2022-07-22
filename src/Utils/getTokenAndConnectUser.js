import axios from "axios";
import { StreamChat } from "stream-chat";
import { apiUrl } from "../Config/constants.js";


const API_KEY = "9q8cp29sk4fh";
const client = StreamChat.getInstance(API_KEY);

export async function getTokenAndConnectUser(userId, setConnectUser, setError) {
  try {
    const response = await axios.get(
   
       `${apiUrl}/token?userId=${userId}`
    );

    const connectUser = await client.connectUser(
      { id: userId },
      response.data.token
    );
    // console.log("what is connectUser?", connectUser);
    setConnectUser(connectUser);
    // return response.data.token;
  } catch (error) {
    // console.error("fetch token failed", error);
    setError(error.message);
    await client.disconnectUser();
  }
}
