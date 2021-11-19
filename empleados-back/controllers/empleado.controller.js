const ctrlEmpleado = {},
  Empleado = require("../models/empleado");

ctrlEmpleado.create = async (req, res) => {
  console.log("se ejecuta metodo create");
  const newEmpleado = new Empleado({
    name: req.body.name,
    document: req.body.document,
    phone: req.body.phone,
    email: req.body.email,
    salary: req.body.salary,
    isFemale: req.body.isFemale,
    dateOfBirth: new Date(req.body.dateOfBirth),
  });

  await newEmpleado.save();

  res.json({
    msg: "Employee created successfully",
  });
};

ctrlEmpleado.list = async (req, res) => {
  const empleados = await Empleado.find();

  res.json(empleados);
};

ctrlEmpleado.update = async (req, res) => {
  const _id = req.params._id;
  const { name, document, phone, email, salary, isFemale, dateOfBirth } =
    req.body;
  await Empleado.findOneAndUpdate(
    { _id: _id },
    {
      name: name,
      document: document,
      phone: phone,
      email: email,
      salary: salary,
      isFemale: isFemale,
      dateOfBirth: new Date(dateOfBirth),
    }
  );
  res.json({ message: "Employee updated succesfully" });
};

ctrlEmpleado.empleadoById = async (req, res) => {
  const { _id } = req.params;
  const empleado = await Empleado.findOne({ _id: _id });
  res.json(empleado);
};

ctrlEmpleado.delete = async (req, res) => {
  console.log(req.params._id);
  const { _id } = req.params;
  const users = await Empleado.deleteOne({ _id: _id });
  res.json({ status: true });
};

module.exports = ctrlEmpleado;
