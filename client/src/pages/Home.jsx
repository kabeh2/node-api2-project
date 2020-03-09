import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { getRequest, getComments } from "../redux/actions/actionCreators";
import PostTable from "../components/PostTable";
import CommentTemplate from "../components/CommentTemplate";
import CommentForm from "../components/forms/CommentForm";

const HeaderMain = styled.h1`
  font-family: Montserrat, sans-serif;
`;

function Home({ posts, comments, error, getRequest, getComments }) {
  const [user, setUser] = useState(null);
  const [commentAdded, setCommentAdded] = useState(false);
  const match = useRouteMatch();

  const commentDidUpdate = () => {
    setCommentAdded(!commentAdded);
  };

  useEffect(() => {
    getRequest(match.params.id);
  }, [getRequest, match]);

  useEffect(() => {
    if (match.params.id) {
      setUser(match.params.id);
      getComments(match.params.id);
    } else {
      setUser(null);
    }
  }, [getComments, match, commentAdded]);

  return (
    <>
      <HeaderMain>Guess Who?!?!</HeaderMain>
      <Row className="justify-content-center mt-4"></Row>
      {posts[0] ? (
        <Row className="justify-content-center mt-4">
          <Col>
            <PostTable posts={posts} user={user} />
          </Col>
        </Row>
      ) : (
        <h1>Loading...</h1>
      )}
      {user && (
        <CommentForm postId={match.params.id} commentAdded={commentDidUpdate} />
      )}
      {user && <CommentTemplate comments={comments} />}
      {error && <h2>{error}</h2>}
    </>
  );
}

const mapStateToProps = ({ fetchReducer: { posts, comments, error } }) => ({
  posts,
  comments,
  error
});

const mapDispatchToProps = dispatch => ({
  getRequest: id => dispatch(getRequest(id)),
  getComments: id => dispatch(getComments(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
