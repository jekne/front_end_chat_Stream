export const queryMembers = async (channel, setMembers) => {
  console.log("queryMembers called");
  try {
    // returns up to 100 members ordered by user_id descending
    const sort = { user_id: -1 };
    const result = await channel.queryMembers({}, sort, {});
    console.log("what's queryMembers?", result);
    setMembers(result);
  } catch (error) {
    console.log("query members failed", error);
  }
};
