import axios from "axios";
import _ from "lodash";

const requestPost = subreddit => {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  return axios.get(url).then(res => {
    const data = _.get(res, "data.data.children");
    const dataMap = data.map(item => ({
      subreddit: item.data.subreddit,
      title: item.data.title,
      id: item.data.name
    }));
    return dataMap;
  });
};

export default {
  requestPost
};
