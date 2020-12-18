const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const route = express();

const Post = mongoose.model("posts");
const Profile = mongoose.model("profiles");

const validatePost = require("../validation/post");

//route POST post/create/
//desc Add  a post
//access Private route
route.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validatePost(req.body);
      if (!isValid) return res.status(400).json(errors);

      const post = new Post({ user: req.user.id, ...req.body });

      await post.save();
      return res.status(201).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

//route GET post/all_posts/
//desc Get all posts
//access Public route
route.get("/all_posts", async (req, res) => {
  try {
    const errors = {};
    const posts = await Post.find({}).sort({ date: -1 });
    if (!posts) {
      errors.nopost = "No posts found!";
      return res.status(404).json(errors);
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ nopostsfound: "No posts found!" });
  }
});

//route GET post/one_post/:postId
//desc Get one post
//access Public
route.get("/one_post/:postId", async (req, res) => {
  try {
    const errors = {};
    const post = await Post.findById(req.params.postId);
    if (!post) {
      errors.nopost = "No post was found!";
      return res.status(404).json(errors);
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ nopostfound: "No post found!" });
  }
});

//route DELETE post/comment/:postId
//desc Delete a post
//access Private route
route.delete(
  "/delete/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};

      const post = await Post.findById(req.params.postId);

      if (!post) {
        errors.nopost = "No post found!";
        return res.status(404).json(errors);
      }

      if (post.user.toString() !== req.user.id) {
        errors.forbidden = "This operation is unauthorized!";
        return res.status(401).json(errors);
      }

      await post.remove();
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

//route POST post/like/:postId
//desc Add a like to a post
//access Private route
route.post(
  "/like/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};

      const profile = await Profile.findOne({ user: req.user.id });
      const post = await Post.findById(req.params.postId);

      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ alreadyLiked: "Already liked the post" });
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

//route POST post/unlike/:postId
//desc Remove a like from a post
//access Private route
route.post(
  "/unlike/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};

      const profile = await Profile.findOne({ user: req.user.id });
      const post = await Post.findById(req.params.postId);

      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notLiked: "You have not yet liked this post" });
      }

      //remove like
      const removeIndex = post.likes
        .map((item) => item.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);

      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

//route POST post/comment/:postId
//desc Add comment to a post
//access Private route
route.post(
  "/comment/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validatePost(req.body);
      if (!isValid) return res.status(400).json(errors);

      const post = await Post.findById(req.params.postId);
      const comment = { ...req.body, user: req.user.id };
      post.comments.unshift(comment);
      await post.save();
      return res.status(201).json(post);
    } catch (error) {
      return res.status(404).json({ postnotfound: "No post found!" });
    }
  }
);

//route POST post/comment/:postId/:commentId
//desc Remove a comment from a post
//access Private route
route.delete(
  "/comment/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (
        post.comments.filter(
          (comment) => comment._id.toString() === req.params.commentId
        ).length === 0
      ) {
        return res.status(404).json({ nocomment: "There is no comment" });
      }

      const removeIndex = post.comments
        .map((item) => item._id.toString())
        .indexOf(req.params.commentId);

      //remove from array
      post.comments.splice(removeIndex, 1);
      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(404).json({ postnotfound: "No post found!" });
    }
  }
);

module.exports = route;
