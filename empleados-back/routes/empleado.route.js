const express = require("express"),
  router = express.Router(),
  empleadoCtrl = require("../controllers/empleado.controller");

router.post("/", empleadoCtrl.create);
router.get("/", empleadoCtrl.list);
router.put("/:_id", empleadoCtrl.update);
router.delete("/:_id", empleadoCtrl.delete);
router.get("/:_id", empleadoCtrl.empleadoById);

module.exports = router;
