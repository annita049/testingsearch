import searchService from "../services/search.service.js";

const searchController = async (req, res) => {
  const { category, value } = req.query;

  if (!category || !value) {
    return res.status(400).json({ error: "Both category and value are required" });
  }

  try {
    const results = await searchService(category, value);
    
    const filteredresults = results.map(({ name, email, jobExperience }) => ({
        name,
        email,
        jobExperience: jobExperience.map(({ post, company }) => ({
          post,
          company
        }))
    }));
    
    res.json(filteredresults);
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default searchController;
