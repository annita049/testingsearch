import searchService from "../services/search.service.js";

const searchController = async (req, res) => {
    const { category, value } = req.query;

    if (!category || !value) {
        return res.status(400).json({ error: "Both category and value are required" });
    }

    try {
        const results = await searchService(category, value);

        const filteredResults = results.map(({ name, email, jobExperience = [], currentlyWorkingIn }) => {
            let response = { name, email, currentlyWorkingIn };

            if (category === "company") {
                // Use Fuse.js result to filter jobExperience based on searched company name
                const filteredJobExperience = jobExperience.filter(job => 
                    job.company === value
                );

                // Add filtered jobExperience only if there are matches
                if (filteredJobExperience.length > 0) {
                    response.jobExperience = filteredJobExperience;
                }
            }

            return response;
        });

        res.json(filteredResults);
    } 
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default searchController;

