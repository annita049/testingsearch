import express from "express";
import esClient from "../server.js";

const router = express.Router();

// AI-based search for users
router.get("/search", async (req, res) => {
  try {
    const { category, searchText } = req.query;

    // AI-powered search query
    const result = await esClient.search({
      index: "users",
      query: {
        match: {
          [category]: searchText, // Search dynamically in the selected category
        },
      },
    });

    // Extract matched users
    const users = result.hits.hits.map((hit) => hit._source);

    res.json({ success: true, users });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default router;
