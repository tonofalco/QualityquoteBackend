import { Router } from 'express';

const router = Router();

// Importaciones con require por estar usando module.exports
const userRoutes = require('./user.route');
const earthEventRoutes = require('./earthEvent.route');
const airEventRoutes = require('./airEvent.route');
const firstDayCostRoutes = require('./firstDayCost.route');
const specialFirstDayRulesRoutes = require('./SpecialFirstDayRules.route');
const extraDayCostsRoutes = require('./extraDayCosts.route');

// Asociar rutas
router.use('/api/users', userRoutes);
router.use('/api/earthEvents', earthEventRoutes);
router.use('/api/airEvents', airEventRoutes);
router.use('/api/cost/firstDayCosts', firstDayCostRoutes);
router.use('/api/cost/specialFirstDayRules', specialFirstDayRulesRoutes);
router.use('/api/cost/extraDay', extraDayCostsRoutes);

module.exports = router; // 👈 Mantener consistencia con CommonJS
