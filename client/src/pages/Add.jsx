import React from "react";
import { Row, Col } from "reactstrap";
import PostForm from "../components/forms/PostForm";

function Add() {
  return (
    <Row className="justify-content-center">
      <Col sm={6}>
        <h1>Add Post</h1>
        <PostForm />
      </Col>
    </Row>
  );
}

export default Add;
