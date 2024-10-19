import express from "express";
import { Author } from "../models/author.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("authors/author.ejs");
});

router.get("/new", (req, res) => {
  res.render("authors/new.ejs", { author: new Author() });
});

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name, //error will come here if it's null
  });
  try {
    const newAuthor = await author.save();
    res.redirect("/authors");
  } catch {
    res.render("authors/new.ejs", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
});

export default router;
