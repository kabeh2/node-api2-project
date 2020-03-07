import React from "react";
import { Table } from "reactstrap";
import moment from "moment";
import styled from "styled-components";

const ProfilePic = styled.div`
  height: 24px;
  width: 24px;
  background-color: #a5a5a5;
  border: 1px solid #a8a8a8;
  border-radius: 50%;
`;

const TimeCopy = styled.p`
  color: #a5a5a5;
`;

function CommentTemplate({ comments }) {
  return (
    <Table hover>
      {/* <thead>
        <tr>
          <th>Comments</th>
          <th></th>
          <th></th>
        </tr>
      </thead> */}
      <tbody>
        {comments.map(comment => (
          <tr key={comment.id}>
            <th scope="row">
              <ProfilePic />
            </th>
            <td>{comment.text}</td>
            <td>
              <TimeCopy>
                {moment(comment.created_at)
                  .startOf("hour")
                  .fromNow()}
              </TimeCopy>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CommentTemplate;
