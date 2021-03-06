import Immutable from "seamless-immutable";
import _ from "lodash";
import { Observable } from "rxjs";
import postServices from "../../services/postService";

export const types = {
  REQUEST_POST_START: "POST/REQUEST_POST_START",
  REQUEST_POST_SUCCESS: "POST/REQUEST_POST_SUCCESS",
  REQUEST_POST_FAIL: "POST/REQUEST_POST_FAIL",
  ADD_MANY_POST: "POST/ADD_MANY_POST",
  ADD_MANY_POST_SUBREDDIT: "POST/ADD_MANY_POST_SUBREDDIT",
  REMOVE_POST: "POST/REMOVE_POST"
};

export const actions = {
  requestPostStart: (payload, meta) => ({
    type: types.REQUEST_POST_START,
    payload,
    meta
  }),
  requestPostSuccess: (payload, meta) => ({
    type: types.REQUEST_POST_SUCCESS,
    payload,
    meta
  }),
  requestPostFail: (error, meta) => ({
    type: types.REQUEST_POST_FAIL,
    error,
    meta
  }),
  receivePost: payload => ({
    type: types.RECEIVE_POST,
    payload
  }),
  selectSubreddit: payload => ({
    type: types.INVALIDATE_SUBREDDIT,
    payload
  }),
  invalidateSubreddit: payload => ({
    type: types.REQUEST_POST,
    payload
  }),
  addManyPost: payload => ({
    type: types.ADD_MANY_POST,
    payload
  }),
  removePost: payload => ({
    type: types.REMOVE_POST,
    payload
  }),
  addManyPostSubReddit: payload => ({
    type: types.ADD_MANY_POST_SUBREDDIT,
    payload
  })
};

const getPost = state => _.get(state, "post.posts");
const getPostDetail = (state, id) => _.get(state, ["post.posts", id]);
const getSubredditsDetail = (state, subredditName) =>
  _.get(state, ["post.subreddit", subredditName]);

export const selectors = {
  getPost,
  getPostDetail,
  getSubredditsDetail
};

const _initialState = Immutable.from({
  posts: Immutable.from({}),
  subreddit: Immutable.from({
    reactjs: Immutable.from([]),
    frontend: Immutable.from([])
  })
});

export default (state = _initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_MANY_POST:
      const posts = _.get(payload, "posts");
      const postsKeyby = _.keyBy(posts, "id");
      const currentState = _.get(state, "posts");
      const newState = Immutable.merge(currentState, postsKeyby, {
        deep: true
      });
      return Immutable.setIn(state, ["posts"], newState);

    case types.ADD_MANY_POST_SUBREDDIT: {
      const posts = _.get(payload, "posts");
      const subreddit = _.get(payload, "posts[0].subreddit").toLowerCase();
      const subredditIDs = _.map(posts, item => _.get(item, "id"));
      return Immutable.setIn(state, ["subreddit", subreddit], subredditIDs);
    }

    case types.REMOVE_POST: {
      const subreddit = _.get(payload, "posts[0].subreddit").toLowerCase();
      const idRemove = _.get(payload, "posts[0].id");
      const currentState = _.get(state, `subreddit.${subreddit}`);
      const newState = currentState.filter(({ id }) => id !== idRemove);
      return Immutable.setIn(state, ["subreddit", subreddit], newState);
    }

    default:
      return state;
  }
};

const requestPostStartEpic = action$ =>
  action$.ofType(types.REQUEST_POST_START).mergeMap(
    ({ payload }) =>
      new Observable(observer => {
        const subreddit = _.get(payload, "subredditName") || "";
        postServices
          .requestPost(subreddit)
          .then(posts => {
            observer.next(actions.requestPostSuccess({ posts }));
            observer.next(actions.addManyPost({ posts }));
            observer.next(actions.addManyPostSubReddit({ posts }));
          })
          .catch(error => observer.next(actions.requestPostFail(error)));
      })
  );

export const epics = [requestPostStartEpic];
