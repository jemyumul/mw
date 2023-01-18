const getConnection = require("../db/db");

const getAllObject = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select object_id as id, object_code, object_type, subpanel_code, object_datecreated, object_dateupdated from object"
  );
};

const getSideNavChildren = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select sidenavchildren_value as Value, sidenavchildren_classname as ClassName, sidenavchildren_style as DynamicStyle, sidenavchildren_order as 'Order' from sidenavchildren where object_id=? ", [id]
  );
};

const insertSideNavChildren = async (id, Value, ClassName, Style, Order) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO sidenavchildren (object_id, object_code, sidenavchildren_value, sidenavchildren_classname, sidenavchildren_style, sidenavchildren_order) " +
    "VALUES (?, ?, ?, ?, ?, ?)", [id, '', Value, ClassName, Style, Order]
  );
};

const getObjectViaID = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select object_code, object_name, object_type, subpanel_code, object_classname, object_text, object_dynamicstyle, object_src, object_order from object where object_id =?", [id]
  );
};

const createObject = async (code, name, type, subPanelCode, className, text, style, src, order) => {
  const connection = await getConnection();
  const date = new Date()
  return connection.execute(
    // "delete from section where section_id =?", [id]
    "INSERT INTO object (object_code, object_name, object_type, subpanel_code, object_classname, object_text, object_dynamicstyle, object_datecreated, object_dateupdated, object_src,  object_order) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [code, name, type, subPanelCode, className, text, style, date, date, src, order]
  );
};

const updateObject = async (id, code, name, type, subPanelCode, className, text, style, src, order) => {
  const connection = await getConnection();
  const date = new Date()
  return connection.execute(
    // "delete from section where section_id =?", [id]
    "UPDATE object SET object_code = ?, object_name = ?, object_type = ?, object_classname = ?, object_text = ?, object_dynamicstyle = ?, object_src = ?, subpanel_code = ?, object_order = ?, object_dateupdated = ?  WHERE object_id = ?"
    , [code, name, type, className, text,  style, src, subPanelCode,  order, date, id]
  );
};

const deleteObject = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "delete from object where object_id =?", [id]
  );
};

const deleteSideNavChildren = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "delete from sidenavchildren where object_id =?", [id]
  );
};

module.exports = {
  getAllObject,
  getObjectViaID,
  createObject,
  updateObject,
  deleteObject,
  getSideNavChildren,
  insertSideNavChildren,
  deleteSideNavChildren
};