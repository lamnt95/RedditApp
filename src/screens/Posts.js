import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import styled from "styled-components";
import { connect } from "react-redux";
import { selectors as postSelectors } from "../store/reducers/postDuck";
import Post from "./Post";

const PostsWrapper = styled.ul``;

const mapStateToProps = (state, ownProps) => {
  return {
    state,
    subreddits: state.post.subreddit[ownProps.subredditName]
  };
};

const mapDispatchToProps = () => ({});

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { subreddits, subredditName, state } = this.props;
    if (_.isUndefined(subreddits)) return null;
    return (
      <div>
        <div>Post data</div>
        <PostsWrapper>
          {subreddits.map(item => (
            <Post key={item} id={item} />
          ))}
        </PostsWrapper>
      </div>
    );
  }
}

Posts.propTypes = {
  subreddits: PropTypes.array,
  subredditName: PropTypes.string
};

Posts.defaultProps = {
  subreddits: undefined,
  subredditName: undefined
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
