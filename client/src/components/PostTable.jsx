import React from "react";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
const updateIcon = <FontAwesomeIcon icon={faEdit} />;

const PostTable = ({ posts, user }) => {
  console.log("POSTS: ", posts);
  console.log("USER: ", user);
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
