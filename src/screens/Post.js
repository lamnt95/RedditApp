import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  selectors as postSelectors,
  actions as postActions
} from "../store/reducers/postDuck";

const TabWrapper = styled.ul``;

const Tab = styled.li`
  cursor: pointer;
`;

const mapStateToProps = state => ({
  post: postSelectors.getPost(state),
  subreddits: postSelectors.getSubredditsDetail(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(postActions, dispatch)
});

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderTab = this.renderTab.bind(this);
    this.onClickTab = this.onClickTab.bind(this);
  }

  onClickTab(tabName) {
    const { actions } = this.props;
    actions.requestPostStart({ subreddit: tabName });
  }

  renderTab() {
    return (
      <TabWrapper>
        <Tab onClick={() => this.onClickTab("reactjs")}>View posts ReactJS</Tab>
        <Tab onClick={() => this.onClickTab("frontend")}>
          View post Frontend
        </Tab>
      </TabWrapper>
    );
  }

  render() {
    return <div>{this.renderTab()}</div>;
  }
}

Post.propTypes = {
  post: PropTypes.object,
  subreddits: PropTypes.array,
  actions: PropTypes.shape({})
};

Post.defaultProps = {
  post: undefined,
  subreddits: undefined,
  actions: {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
