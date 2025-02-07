import { Request, Response } from "express"
import Article from "../models/articles";
import mongoose from "mongoose";

export const getAllArticle = async (req: Request, res: Response) => {
    try {
        const allArticle = await Article.find();
        res.status(200).json(allArticle);
    } catch (error) {
        res.status(500).json({message: "Internal server error", error})
    }
}

export const createArtcile = async(req:Request, res:Response) => {
    try {

        const article = new Article(req.body);
        await article.save();
        res.status(201).json({ message: "Article created successfully", article });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error });    }

}

export const updateArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Received ID:", id); // Debugging

    const updateData = req.body; 
    console.log("Update Data:", updateData); // Debugging

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid article ID format" });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article updated successfully", updatedArticle });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


export const deleteAllArticles = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await Article.deleteMany({});
  
      if (result.deletedCount === 0) {
        res.status(404).json({ message: "No articles found to delete" });
        return; // Ensure execution stops here
      }
  
      res.status(200).json({ message: "All articles deleted", deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };


export const deleteArticleById = async (req: Request, res: Response) => {
  try {
    const {id } = req.params

    if(!id) {
      return res.status(400).json({ message: "Invalid article id" });
    }
    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully", article });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}