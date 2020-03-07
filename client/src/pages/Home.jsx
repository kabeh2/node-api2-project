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

function Home({ posts, comments, getRequest, getComments }) {
  const [user, setUser] = useState(null);
  const match = useRouteMatch();

  useEffect(() => {
    getRequest(match.params.id);
    if (match.params.id) {
      setUser(match.params.id);
      getComments(match.params.id);
    } else {
      setUser(null);
    }
  }, [getRequest, getComments, match]);

  console.log(comments);

  return (
    <>
      <HeaderMain>Guess Who?!?!</HeaderMain>
      {posts[0] ? (
        <Row className="justify-content-center mt-4">
          <Col>
            <PostTable posts={posts} user={user} />
          </Col>
        </Row>
      ) : (
        <h1>Loading...</h1>
      )}
      {user && <CommentForm postId={match.params.id} />}
      {user && <CommentTemplate comments={comments} />}
    </>
  );
}

const mapStateToProps = ({ fetchReducer: { posts, comments } }) => ({
  posts,
  comments
});

const mapDispatchToProps = dispatch => ({
  getRequest: id => dispatch(getRequest(id)),
  getComments: id => dispatch(getComments(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
