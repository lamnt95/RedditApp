import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import styled from "styled-components";
import { connect } from "react-redux";
import { selectors as postSelectors } from "../store/reducers/postDuck";

const Item = styled.li``;

const mapStateToProps = (state, ownProps) => ({
  postDetail: state.post.posts[ownProps.id]
});

const mapDispatchToProps = () => ({});

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { postDetail } = this.props;
    console.log(postDetail);
    if (_.isUndefined(postDetail)) return null;
    const title = _.get(this, "props.postDetail.title");
    return <Item>{title}</Item>;
  }
}

Post.propTypes = {
  id: PropTypes.string
};

Post.defaultProps = {
  id: undefined
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
