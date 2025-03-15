import Fuse from "fuse.js";
import User from "../models/user.model.js";

const searchService = async (category, value) => {
    try {
        const users = await User.find().lean(); // Ensure plain objects

        const transformedUsers = users.map(user => ({
            ...user,
            jobExperience: user.jobExperience || [], // Ensure jobExperience is always an array
        }));

        const fuseOptions = {
            keys: category === "company"
                ? ["jobExperience.company", "currentlyWorking.company"] // Search inside jobExperience array
                : [category],
            threshold: 0.3,
            distance: 100,
            ignoreLocation: true,
            findAllMatches: true,
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
