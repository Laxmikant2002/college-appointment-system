const express = require('express');
const { addAvailability, updateAvailability, deleteAvailability } = require('../controllers/availabilityController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['professor']), addAvailability);
router.put('/', authMiddleware, roleMiddleware(['professor']), updateAvailability);
router.delete('/', authMiddleware, roleMiddleware(['professor']), deleteAvailability);

module.exports = router;