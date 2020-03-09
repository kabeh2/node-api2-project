import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deletePost } from "../redux/actions/actionCreators";

const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
const updateIcon = <FontAwesomeIcon icon={faEdit} />;

const IconButton = styled.div`
  cursor: pointer;
  display: inline-block;
  transition: all 0.2s ease;
  color: dodgerblue;

  &:hover {
    color: blue;
  }
`;

const PostTable = ({ posts, user, deletePost }) => {
  return (
    <Table hover>
      <thead>
        <tr>
          {user === null && <th>#</th>}
          <th>Title</th>
          {user === null && <th>Content</th>}
          <th>More</th>
        </tr>
      </thead>
      <tbody>
        {posts &&
          posts.map((post, index) => (
            <tr key={post.id}>
              {user === null && <th scope="row">{index + 1}</th>}
              <td>{post.title}</td>
              {user === null && (
                <td>
                  <Link to={`/${post.id}`}>{post.contents}</Link>
                </td>
              )}
              {user === null ? (
                <td className="d-flex align-items-center justify-content-between">
                  <IconButton onClick={() => deletePost(post.id, posts)}>
                    {deleteIcon}
                  </IconButton>{" "}
                  | {updateIcon}
                </td>
              ) : (
                <td className="d-flex align-items-center justify-content-between">
                  {updateIcon}
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const mapDispatchToProps = dispatch => ({
  deletePost: (id, post) => dispatch(deletePost(id, post))
});

export default connect(null, mapDispatchToProps)(PostTable);
