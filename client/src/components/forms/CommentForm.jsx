import React from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import { addComment } from "../../redux/actions/actionCreators";

const CommentForm = ({ postId, addComment, commentAdded }) => {
  console.log("FORM POSTID: ", postId);
  return (
    <>
      <Formik
        initialValues={{
          text: "",
          post_id: postId
        }}
        validationSchema={Yup.object({
          text: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          post_id: Yup.number()
            .integer()
            .required("Required")
        })}
        onSubmit={async (values, { setStatus, setErrors, resetForm }) => {
          try {
            await addComment(postId, values);
            commentAdded();
            setStatus({ success: true });
            resetForm({});
          } catch (error) {
            setStatus({ success: false });
            setErrors({ error: error.response });
          }
        }}
      >
        <Form>
          <TextInput
            label="Comment"
            name="text"
            type="text"
            placeholder="Write comment here..."
            commentInput
          />
        </Form>
      </Formik>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  addComment: (id, comment) => dispatch(addComment(id, comment))
});

export default connect(null, mapDispatchToProps)(CommentForm);
