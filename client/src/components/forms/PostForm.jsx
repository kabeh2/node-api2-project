import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import TextInput from "./TextInput";

const PostForm = () => {
  return (
    <Formik
      initialValues={{
        title: "",
        contents: ""
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        contents: Yup.string()
          .max(20, "Must be 20 characters or less")
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
          label="Title"
          name="title"
          type="text"
          placeholder="Write title here..."
        />
        <TextInput
          label="Contents"
          name="contents"
          type="text"
          placeholder="Write contents copy here..."
        />

        <Button type="button" className="mr-2">
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default PostForm;
