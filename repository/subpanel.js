const getConnection = require("../db/db");

const getAllSubPanels = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select subpanel_id as id, subpanel_code, panel_code, subpanel_order, subpanel_datecreated, subpanel_dateupdated from subpanel"
  );
};

const getSubPanelViaID = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select subpanel_code, panel_code, subpanel_classname, subpanel_dynamicstyle, subpanel_order from subpanel where subpanel_id =?", [id]
  );
};

const createSubPanel = async (code, panelCode, classname, dynamicstyle, order) => {
  const connection = await getConnection();
  const date = new Date()
  return connection.execute(
    // "delete from section where section_id =?", [id]
    "INSERT INTO subpanel (subpanel_code, panel_code, subpanel_classname, subpanel_dynamicstyle, subpanel_datecreated, subpanel_dateupdated, subpanel_order) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?)", [code, panelCode, classname, dynamicstyle, date, date, order]
  );
};

const updateSubPanel = async (id, code, sectionCode, classname, dynamicstyle, order) => {
  const connection = await getConnection();
  const date = new Date()
  return connection.execute(
    // "delete from section where section_id =?", [id]
    "UPDATE subpanel SET subPANEL_CODE = ?, panel_CODE = ?, subPANEL_CLASSNAME = ?, subPANEL_DYNAMICSTYLE = ?, subPANEL_ORDER = ?, subPANEL_DATEUPDATED = ? WHERE subPANEL_ID = ?"
    , [code, sectionCode, classname, dynamicstyle, order, date, id]
  );
};

const deleteSubPanel = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "delete from panel  where subpanel_id =?", [id]
  );
};


module.exports = {
  getAllSubPanels,
  getSubPanelViaID,
  createSubPanel,
  updateSubPanel,
  deleteSubPanel
};