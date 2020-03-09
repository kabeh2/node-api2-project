import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import TextInput from "./TextInput";
import { addPost, updatePost } from "../../redux/actions/actionCreators";

const PostForm = ({ addPost, updatePost }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <Formik
      initialValues={{
        title: location.state ? location.state.postUpdates.title : "",
        contents: location.state ? location.state.postUpdates.contents : ""
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(200, "Must be 100 characters or less")
          .required("Required"),
        contents: Yup.string()
          .max(300, "Must be 150 characters or less")
          .required("Required")
      })}
      onSubmit={async (values, { setErrors, setStatus, resetForm }) => {
        try {
          if (location.state) {
            await updatePost(location.state.id, values);
          } else {
            await addPost(values);
          }
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

        <Link to="/">
          <Button type="button" className="mr-2">
            Cancel
          </Button>
        </Link>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
  updatePost: (id, post) => dispatch(updatePost(id, post))
});

export default connect(null, mapDispatchToProps)(PostForm);
