const { HTTP_STATUS } = require("../constants/httpStatus");

exports.createOne = async (Model, req, res, next) => {
  try {
    const record = await Model.create(req.body);
    res.status(HTTP_STATUS.CREATED).json(record);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (Model, req, res, next) => {
  try {
    let sortDirection = "DESC";

    if (
      req.query.sort &&
      ["ASC", "DESC"].includes(req.query.sort.toUpperCase())
    ) {
      sortDirection = req.query.sort.toUpperCase();
    }

    const records = await Model.findAll({
      order: [["createdAt", sortDirection]],
    });

    res.status(HTTP_STATUS.OK).json(records);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (Model, req, res, next) => {
  try {
    const record = await Model.findByPk(req.params.id);
    if (!record) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `${Model.name} not found` });
      return;
    }
    res.status(HTTP_STATUS.OK).json(record);
  } catch (error) {
    next(error);
  }
};

exports.updateById = async (Model, req, res, next, respond = true) => {
  try {
    const record = await Model.findByPk(req.params.id);
    if (!record) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `${Model.name} not found` });
      return;
    }
    const updatedRecord = await record.update(req.body);
    if (respond) {
      res.status(HTTP_STATUS.OK).json(updatedRecord);
    } else {
      return updatedRecord;
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteById = async (Model, req, res, next) => {
  try {
    const record = await Model.findByPk(req.params.id);
    if (!record) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `${Model.name} not found` });
      return;
    }
    await record.destroy();
    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};
