import { Router } from "express";
import { validateArticle } from "../validator/articleValidator";
import { validateRequest } from "../middleware/articleMiddleware";
import { createArtcile, deleteAllArticles, deleteArticleById, getAllArticle, updateArticleById } from "../controller/articleController";


const router = Router();

router.get("/", getAllArticle);
router.post("/", validateRequest(validateArticle), createArtcile);
router.delete("/:id", deleteArticleById);
router.delete("/", deleteAllArticles);
router.put("/:id", updateArticleById);

  

  export {router as articlesRouter};