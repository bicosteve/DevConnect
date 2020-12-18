const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const route = express();

const User = mongoose.model("users");
const Profile = mongoose.model("profiles");
const validateProfile = require("../validation/profile");
const validateExperience = require("../validation/experience");
const validateEducation = require("../validation/education");

//route get profile/
//desc get a  profiles
//access Public route
route.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};
      profile = await Profile.findOne({ user: req.user.id }).populate("user", [
        "username",
        "avatar",
      ]);

      if (!profile) {
        errors.noprofile = "No profile for that user";
        return res.status(404).json(errors);
      }
      return res.status(200).json(profile);
    } catch (error) {
      return res
        .status(500)
        .json({ profile: "There is no profile for this user" });
    }
  }
);

//route get profile/handle/:handle
//desc get a  profiles by handle
//access Public route
route.get("/handle/:handle", async (req, res) => {
  try {
    const errors = {};

    const profileHandle = await Profile.findOne({
      handle: req.params.handle,
    }).populate("user", ["username", "avatar"]);

    if (!profileHandle) {
      errors.noprofile = "There is no profile for this user";
      return res.status(404).json(errors);
    }

    return res.status(200).json(profileHandle);
  } catch (error) {
    return res
      .status(500)
      .json({ profile: "There is no profile for this user" });
  }
});

//route get profile/user/:userId
//desc get a profile by id
//access Public route
route.get("/user/:userId", async (req, res) => {
  try {
    const errors = {};

    const user = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["username", "avatar"]);

    if (!user) {
      errors.noprofile = "There is no profile for this user";
      return res.status(404).json(errors);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ profile: "There is no profile for this user" });
  }
});

//route get profile/all/
//desc get profiles
//access Private route
route.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};

      const users = await Profile.find({}).populate("user", ["username"]);

      if (!users) {
        errors.noprofile = "Users not found!";
        return res.status(404).json(errors);
      }

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

//route post profile/create/
//desc Create a profile
//access Private route
route.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validateProfile(req.body);
      if (!isValid) return res.status(400).json(errors);

      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.company) profileFields.company = req.body.company;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;

      //Break skills into array
      if (typeof req.body.skills !== "undefined") {
        profileFields.skills = req.body.skills.split(",");
      }

      //Social
      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
      if (req.body.instagram)
        profileFields.social.instagram = req.body.instagram;

      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update the profile
        const updatedProfile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.status(200).json(updatedProfile);
      } else {
        //Create a new profile
        const existingProfile = await Profile.findOne({
          handle: profileFields.handle,
        });

        if (existingProfile) {
          errors.handle = "The handle already exists";
          res.status(400).json(errors);
        } else {
          const newProfile = await new Profile(profileFields).save();
          return res.status(201).json(newProfile);
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//route post profile/experience/
//desc Create experience profile
//access Private route
route.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validateExperience(req.body);
      if (!isValid) return res.status(400).json(errors);

      const profile = await Profile.findOne({ user: req.user.id });

      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      profile.experience.unshift(newExperience);
      await profile.save();
      return res.status(201).json(profile);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

//route post profile/education/
//desc Create education profile
//access Private route
route.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validateEducation(req.body);
      if (!isValid) return res.status(400).json(errors);

      const profile = await Profile.findOne({ user: req.user.id });

      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      profile.education.unshift(newEducation);
      await profile.save();
      return res.status(201).json(profile);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

//route delete profile/experience/:expId
//desc Remove experience
//access Private route
route.delete(
  "/experience/:expId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        errors.nonprofile = "No profile found!";
        return res.status(404).json(errors);
      }

      const indexToRemove = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.expId);

      profile.experience.splice(indexToRemove, 1);

      await profile.save();
      return res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//route delete profile/education/:edId
//desc Remove education by ID
//access Private route
route.delete(
  "/education/:edId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = {};
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        errors.nonprofile = "No profile found!";
        return res.status(404).json(errors);
      }

      const indexToRemove = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edId);

      profile.education.splice(indexToRemove, 1);

      await profile.save();
      return res.status(200).json(profile);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

//route delete profile/my_profile/
//desc Remove an account
//access Private route
route.delete(
  "/my_profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await Profile.findOneAndRemove({ user: req.user.id });
      await User.findOneAndRemove({ _id: req.user.id });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

module.exports = route;
