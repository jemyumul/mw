const getConnection = require("../db/db");

const getAllPanels = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select panel_id as id, panel_code, section_code, panel_order, panel_datecreated, panel_dateupdated from panel"
  );
};

const getPanelViaID = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select panel_code, section_code, panel_classname, panel_dynamicstyle, panel_order from panel where panel_id =?", [id]
  );
};

const createPanel = async (code, sectionCode, classname, dynamicstyle, order) => {
  const connection = await getConnection();
  const date = new Date()
  return connection.execute(
    // "delete from section where section_id =?", [id]
    "INSERT INTO PANEL (panel_code, section_code, panel_classname, panel_dynamicstyle, panel_datecreated, panel_dateupdated, panel_order) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?)", [code, sectionCode, classname, dynamicstyle, date, date, order]
  );
};

const updatePanel = async (id, code, sectionCode, classname, dynamicstyle, order) => {
  const connection = await getConnection();
  const date = new Date()
  return connection.execute(
    // "delete from section where section_id =?", [id]
    "UPDATE PANEL SET PANEL_CODE = ?, SECTION_CODE = ?, PANEL_CLASSNAME = ?, PANEL_DYNAMICSTYLE = ?, PANEL_ORDER = ?, PANEL_DATEUPDATED = ? WHERE PANEL_ID = ?"
    , [code, sectionCode, classname, dynamicstyle, order, date, id]
  );
};

const deletePanel = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "delete from panel where panel_id =?", [id]
  );
};


module.exports = {
  getAllPanels,
  getPanelViaID,
  createPanel,
  updatePanel,
  deletePanel
};