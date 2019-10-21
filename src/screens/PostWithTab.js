import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as postActions } from "../store/reducers/postDuck";
import Posts from "./Posts";

const TabWrapper = styled.ul``;

const Tab = styled.li`
  cursor: pointer;
`;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(postActions, dispatch)
});

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditName: undefined
    };
    this.renderTab = this.renderTab.bind(this);
    this.onClickTab = this.onClickTab.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.requestPostStart({ subredditName: "reactjs" });
    actions.requestPostStart({ subredditName: "frontend" });
  }

  onClickTab(subredditName) {
    this.setState({ subredditName });
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
    const { subredditName } = this.state;
    return (
      <div>
        {this.renderTab()}
        <Posts subredditName={subredditName} />
      </div>
    );
  }
}

Post.propTypes = {
  actions: PropTypes.shape({})
};

Post.defaultProps = {
  actions: {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
