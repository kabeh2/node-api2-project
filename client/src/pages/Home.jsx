import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { getRequest } from "../redux/actions/actionCreators";
import PostTable from "../components/PostTable";

const HeaderMain = styled.h1`
  font-family: Montserrat, sans-serif;
`;

function Home({ posts, getRequest }) {
  const [user, setUser] = useState(null);
  const match = useRouteMatch();

  useEffect(() => {
    getRequest(match.params.id);
    if (match.params.id) {
      setUser(match.params.id);
    } else {
      setUser(null);
    }
  }, [getRequest, match]);

  console.log("POSTS", posts);

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
    </>
  );
}

const mapStateToProps = ({ fetchReducer: { data } }) => ({
  posts: data
});

const mapDispatchToProps = dispatch => ({
  getRequest: id => dispatch(getRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
