import React from "react";
import { useLocation } from "react-router";
import { Row, Col } from "reactstrap";
import PostForm from "../components/forms/PostForm";

function Add() {
  const location = useLocation();
  return (
    <Row className="justify-content-center">
      <Col sm={6}>
        <h1>{location.state ? "Update" : "Add Post"}</h1>
        <PostForm />
      </Col>
    </Row>
  );
}

export default Add;
