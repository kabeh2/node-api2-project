const yup = require("yup");
const posts = require("../data/db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  posts
    .find()
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(error => {
      debug("Error: ", error);
      res.status(500).send({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const postId = req.params.id;

  posts
    .findById(postId)
    .then(post => {
      if (post[0]) {
        res.status(200).send(post);
      } else {
        res.status(404).send({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      debug("Error: ", error);
      res.status(500).send({
        error: "The post information could not be retrieved."
      });
    });
});

router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;

  posts
    .findPostComments(postId)
    .then(comments => {
      if (comments[0]) {
        res.status(200).send(comments);
      } else {
        res.status(404).send({
          message: "There are currently no comments for this post."
        });
      }
    })
    .catch(error => {
      debug("Error: ", error);
      res.status(500).send({
        error: "The comments information could not be retrieved."
      });
    });
});

router.post("/", async (req, res) => {
  const post = {
    title: req.body.title,
    contents: req.body.contents
  };

  const validation = await validateSchema(post);

  try {
    if (validation) {
      console.log("Validation: ", validation);
      posts.insert(post).then(response => {
        if (response) {
          res.status(201).send(response);
        }
      });
    } else {
      res.status(400).send({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  } catch (error) {
    debug("Error: ", error);
    res.status(500).send({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  const comment = {
    text: req.body.text,
    post_id: req.params.id
  };
  const validation = await validateSchema(comment);

  try {
    const post = await posts.findById(req.params.id);

    if (post) {
      if (validation) {
        posts.insertComment(comment).then(response => {
          res.status(201).send(response);
        });
      } else {
        res
          .status(404)
          .send({ errorMessage: "Please provide text for the comment." });
      }
    } else {
      res
        .status(404)
        .send({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).send({
      error: "There was an error while saving the comment to the database"
    });
  }
});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;

  try {
    posts.remove(postId).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).send({
          message: "The post with the specified ID does not exist."
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      error: "The post could not be removed"
    });
  }
});

router.put("/:id", async (req, res) => {
  const post = {
    title: req.body.title,
    contents: req.body.contents
  };
  const postId = req.params.id;

  const validation = await validateSchema(post);

  try {
    const updatedPost = await posts.update(postId, post);
    if (updatedPost) {
      console.log("UPDATED POST: ", updatedPost);
      if (validation) {
        console.log("Validation", validation);
        res.status(201).json(updatedPost);
      } else {
        res.status(400).send({
          errorMessage: "Please provide title and contents for the post."
        });
      }
    } else {
      res.status(404).send({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    debug("Error: ", error);
    res.status(500).send({
      error: "The post information could not be modified."
    });
  }
});

const validateSchema = async post => {
  let schema;

  if (post.text) {
    schema = yup.object().shape({
      text: yup.string().required(),
      post_id: yup
        .number()
        .integer()
        .required()
    });
  } else {
    schema = yup.object().shape({
      title: yup.string().required(),
      contents: yup.string().required()
    });
  }

  try {
    const response = await schema.isValid(post);
    return response;
  } catch (error) {
    debug("Validation Error: ", error);
  }
};

module.exports = router;
