import Fuse from "fuse.js";
import User from "../models/user.model.js";

const searchService = async (category, value) => {
    try {
      const users = await User.find();

      const transformedUsers = users.map(user => ({
        ...user._doc,
        jobExperienceCompanies: user.jobExperience.map(job => job.company).join(" "), // Flatten company names
      }));

      // Set up Fuse.js options
      const fuseOptions = {
        keys: [category === "company" ? "jobExperienceCompanies" : category],
        threshold: 0.3,
        distance: 100, // Consider matches within a distance
        ignoreLocation: true, // Make search more flexible
      };

      const fuse = new Fuse(transformedUsers, fuseOptions);

      const fuzzyResults = fuse.search(value).map(result => result.item);
      return fuzzyResults;
    }

    catch (error) {
      console.error("Search error:", error);
      throw error;
    }
};

export default searchService;





