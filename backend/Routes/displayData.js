const express = require('express');
const router = express.Router();

router.post("/fooddata", (req, res) => {
    try {
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.error("Error fetching data: " + error);
        res.status(500).send("Server error")
    }
})

module.exports = router;