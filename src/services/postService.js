import axios from "axios";

const requestPost = subreddit => {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  return axios.get(url);
};

export default {
  requestPost
};
