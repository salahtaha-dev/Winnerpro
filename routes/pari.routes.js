const router = require('express').Router();
const pariController = require ('../controllers/pari.controller');

//Parier
router.get('/',pariController.readParis);
router.post('/', pariController.creerPari);
router.patch("/parier/paristars/:id", pariController.parier);

//Admin
router.delete('/admin/deletePari/:id',pariController.deletePari);
router.get('/admin/setTrue/:id',pariController.pariSetTrue)
router.get('/admin/setFalse/:id',pariController.pariSetFalse)
router.get('/parier/retributionPari/:id',pariController.retributionPari);
router.get('/admin/resetProps/:id',pariController.resetPropsPari);

module.exports = router;