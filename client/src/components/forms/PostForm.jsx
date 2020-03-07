import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import TextInput from "./TextInput";
import { addPost } from "../../redux/actions/actionCreators";

const PostForm = ({ addPost }) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        title: "",
        contents: ""
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
        contents: Yup.string()
          .max(150, "Must be 150 characters or less")
          .required("Required")
      })}
      onSubmit={async (values, { setErrors, setStatus, resetForm }) => {
        try {
          await addPost(values);
          resetForm({});
          setStatus({ success: true });
          history.replace("/");
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
        }
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

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post))
});

export default connect(null, mapDispatchToProps)(PostForm);
