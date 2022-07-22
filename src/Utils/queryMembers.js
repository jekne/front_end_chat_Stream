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

// await channel.queryMembers({}, sort, {});

// // returns up to 100 members ordered by created_at descending
// let sort = {created_at: -1};
// await channel.queryMembers({}, sort, {});

// // returns up to 100 members ordered by user_id descending
// sort = {user_id: -1};
// await channel.queryMembers({}, sort, {});

// // paginate by user_id in descending order
// sort = {user_id: 1};
// let options = {user_id_lt: lastMember.user_id};
// await channel.queryMembers({}, sort, options);

// // paginate by created at in ascending order
// sort = {created_at: -1};
// options = {created_at_before: lastMember.created_at};
// await channel.queryMembers({}, sort, options);

// // paginate using offset
// options = {offset: 20}
// await channel.queryMembers({}, sort, {});
