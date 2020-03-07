import React from "react";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
const updateIcon = <FontAwesomeIcon icon={faEdit} />;

const PostTable = ({ posts, user }) => {
  console.log("USER TABLE: ", user);
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          {user === null && <th>Content</th>}
          <th>More</th>
        </tr>
      </thead>
      <tbody>
        {posts &&
          posts.map(post => (
            <tr key={post.id}>
              <th scope="row">{post.id}</th>
              <td>{post.title}</td>
              {user === null && (
                <td>
                  <Link to={`/${post.id}`}>{post.contents}</Link>
                </td>
              )}
              <td className="d-flex align-items-center justify-content-between">
                {deleteIcon} | {updateIcon}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default PostTable;
