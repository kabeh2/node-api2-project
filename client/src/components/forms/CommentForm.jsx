import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";

const CommentForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          text: "",
          post_id: ""
        }}
        validationSchema={Yup.object({
          comment: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          contents: Yup.number()
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
            name="comment"
            type="text"
            placeholder="Write comment here..."
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default CommentForm;
