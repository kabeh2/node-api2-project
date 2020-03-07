import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";

const CommentForm = ({ postId }) => {
  console.log(postId);
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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

export default CommentForm;
