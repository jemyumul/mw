const getConnection = require("../db/db");

const getAllSections = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select section_id as id, section_code, section_order, section_datecreated, section_dateupdated from section"
  );
};

const getSectionViaID = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select section_code, section_classname, section_dynamicstyle, section_order from section where section_id =?", [id]
  );
};

const deleteSection = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "delete from section where section_id =?", [id]
  );
};

const createSection = async (code, classname, dynamicstyle, order) => {
  const connection = await getConnection();
  const date = new Date()
  return connection.execute(
    // "delete from section where section_id =?", [id]
    "INSERT INTO section (section_code, section_classname, section_dynamicstyle, section_datecreated, section_dateupdated, section_order) " +
    "VALUES (?, ?, ?, ?, ?, ?)", [code, classname, dynamicstyle, date, date, order]
  );
};

const updateSection = async (id, code, classname, dynamicstyle, order) => {
  const connection = await getConnection();
  const date = new Date()
  return connection.execute(
    // "delete from section where section_id =?", [id]
    "UPDATE section SET SECTION_CODE = ?, SECTION_CLASSNAME = ?, SECTION_DYNAMICSTYLE = ?, SECTION_ORDER = ?, SECTION_DATEUPDATED = ? WHERE SECTION_ID = ?"
    , [code, classname, dynamicstyle, order, date, id]
  );
};

module.exports = {
  getAllSections,
  getSectionViaID,
  deleteSection,
  createSection,
  updateSection
};