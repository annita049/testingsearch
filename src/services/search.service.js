import User from "../models/user.model.js";

const searchService = async (category, value) => {
    try {
      let query = {};

      if (category === "company") {
        query = {
          jobExperience: { 
            $elemMatch: { company: { $regex: value, $options: "i" } } 
          }
        };
      }
      else {
        query = {
          [category]: { $regex: value, $options: "i" }
        };
      }

      const users = await User.find(query);
      return users;
    }
    catch (error) {
        console.error("Search error:", error);
        throw error;
    }
};

export default searchService;