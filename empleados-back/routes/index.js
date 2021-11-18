const { Router } = require("express"),
  router = Router();

router.use("/employee", require("../routes/empleado.route"));

module.exports = router;
