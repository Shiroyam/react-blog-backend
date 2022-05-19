import Post from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const { title, description, photoUrl, text } = req.body;
    const data = {
      title,
      description,
      photoUrl,
      text,
      user: req.userId
    };
    const post = new Post(data);
    await post.save();
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
};

export const show = async (req, res) => {
  try {
    const post = await Post.find();
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
};

export const showId = async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await Post.findById({ _id });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
};

export const remove = async (req, res) => {
  try {
    const { _id } = req.body;
    await Post.findByIdAndDelete(_id);
    return res.json("Пост удален!");
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
};

export const update = async (req, res) => {
  try {
    const { _id, title, description, photoUrl, text } = req.body;
    const data = {
      title,
      description,
      photoUrl,
      text,
      user: req.userId,
    };
    await Post.findByIdAndUpdate(_id, { $set: data });
    return res.json("Пост изменен!");
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
};
