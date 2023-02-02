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
    "select sidenavchildren_value as Value, sidenavchildren_classname as ClassName, sidenavchildren_style as Style, sidenavchildren_reference as Reference, sidenavchildren_order as 'Order' from sidenavchildren where object_id=? ", [id]
  );
};

const insertSideNavChildren = async (id, Value, ClassName, Style, Reference, Order) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO sidenavchildren (object_id, object_code, sidenavchildren_value, sidenavchildren_classname, sidenavchildren_style, sidenavchildren_reference, sidenavchildren_order) " +
    "VALUES (?, ?, ?, ?, ?, ?)", [id, '', Value, ClassName, Style, Reference, Order]
  );
};

const deleteSideNavChildren = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "delete from sidenavchildren where object_id =?", [id]
  );
};

const getAccordionChildren = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select accordionchildren_title as Title, accordionchildren_body as Body, accordionchildren_classname as ClassName, accordionchildren_style as Style, accordionchildren_order as 'Order' from accordionchildren where object_id=? ", [id]
  );
};

const insertAccordionChildren = async (id, Title, Body, ClassName, Style, Order) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO accordionchildren (object_id, object_code, accordionchildren_title, accordionchildren_body, accordionchildren_classname, accordionchildren_style, accordionchildren_order) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?)", [id, '', Title, Body, ClassName, Style, Order]
  );
};

const deleteAccordionChildren = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "delete from accordionchildren where object_id =?", [id]
  );
};

const getAccordionPlaceChildren = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select accordionplacechildren_title as Title, accordionplacechildren_body as Body, accordionplacechildren_classname as ClassName, accordionplacechildren_style as Style, accordionplacechildren_order as 'Order' from accordionplacechildren where object_id=? ", [id]
  );
};

const insertAccordionPlaceChildren = async (id, Title, Body, ClassName, Style, Order) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO accordionplacechildren (object_id, object_code, accordionplacechildren_title, accordionplacechildren_body, accordionplacechildren_classname, accordionplacechildren_style, accordionplacechildren_order) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?)", [id, '', Title, Body, ClassName, Style, Order]
  );
};

const deleteAccordionPlaceChildren = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "delete from accordionplacechildren where object_id =?", [id]
  );
};


const getAccordionImageChildren = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select accordionimagechildren_title as Title, accordionimagechildren_body as Body, accordionimagechildren_classname as ClassName, accordionimagechildren_style as Style, accordionimagechildren_order as 'Order' from accordionimagechildren where object_id=? ", [id]
  );
};

const insertAccordionImageChildren = async (id, Title, Body, ClassName, Style, Order) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO accordionimagechildren (object_id, object_code, accordionimagechildren_title, accordionimagechildren_body, accordionimagechildren_classname, accordionimagechildren_style, accordionimagechildren_order) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?)", [id, '', Title, Body, ClassName, Style, Order]
  );
};

const deleteAccordionImageChildren = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "delete from accordionimagechildren where object_id =?", [id]
  );
};



const getObjectViaID = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select object_code, object_name, object_type, subpanel_code, object_classname, object_text, object_dynamicstyle, object_src, object_reference, object_order from object where object_id =?", [id]
  );
};

const createObject = async (code, name, type, subPanelCode, className, text, style, src, reference,  order) => {
  const connection = await getConnection();
  const date = new Date()
  return connection.execute(
    // "delete from section where section_id =?", [id]
    "INSERT INTO object (object_code, object_name, object_type, subpanel_code, object_classname, object_text, object_dynamicstyle, object_datecreated, object_dateupdated, object_src, object_reference, object_order) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [code, name, type, subPanelCode, className, text, style, date, date, src, reference, order]
  );
};

const updateObject = async (id, code, name, type, subPanelCode, className, text, style, src, reference, order) => {
  const connection = await getConnection();
  const date = new Date()
  return connection.execute(
    // "delete from section where section_id =?", [id]
    "UPDATE object SET object_code = ?, object_name = ?, object_type = ?, object_classname = ?, object_text = ?, object_dynamicstyle = ?, object_src = ?, subpanel_code = ?, object_reference = ?, object_order = ?, object_dateupdated = ?  WHERE object_id = ?"
    , [code, name, type, className, text,  style, src, subPanelCode, reference,  order, date, id]
  );
};

const deleteObject = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "delete from object where object_id =?", [id]
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
  deleteSideNavChildren,
  getAccordionChildren,
  insertAccordionChildren,
  deleteAccordionChildren,
  getAccordionPlaceChildren,
  insertAccordionPlaceChildren,
  deleteAccordionPlaceChildren,
  getAccordionImageChildren,
  insertAccordionImageChildren,
  deleteAccordionImageChildren
};