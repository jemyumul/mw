const getConnection = require("../db/db");

const getSections = async () => {
    const connection = await getConnection();
    return connection.execute(
        "select section_id as id, section_code as SectionCode, section_order as SectionOrder, section_classname as ClassName, section_dynamicstyle as DynamicStyle from section order by section_order"
    );
};

const getPanels = async () => {
    const connection = await getConnection();
    return connection.execute(
        "select panel_id as id, panel_code as PanelCode, panel_order as PanelOrder, panel_classname as ClassName, panel_dynamicstyle as DynamicStyle, section_code as SectionCode from panel order by panel_order"
    );
};

const getSubPanels = async () => {
    const connection = await getConnection();
    return connection.execute(
        "select subpanel_id as id, subpanel_code as SubPanelCode, subpanel_order as SubPanelOrder, subpanel_classname as ClassName, subpanel_dynamicstyle as DynamicStyle, panel_code as PanelCode from subpanel order by subpanel_order"
    );
};

const getObjects = async () => {
    const connection = await getConnection();
    return connection.execute(
        "select object_id as ObjectId, object_code as ObjectCode, object_type as ObjectType, object_src as ObjectSrc , object_classname as ClassName, object_text as ObjectText, object_dynamicstyle as ObjectDynamicStyle, object_order as ObjectOrder, subpanel_code as SubPanelCode from object order by object_order"
    );
};

const getSideNavs = async () => {
    const connection = await getConnection();
    return connection.execute(
        "select object_id as ObjectId, object_code as ObjectCode, sidenavchildren_value as Value, sidenavchildren_classname as ClassName , sidenavchildren_style as DynamicStyle, sidenavchildren_order as 'Order' from sidenavchildren order by sidenavchildren_order"
    );
}


module.exports = {
    getSections,
    getPanels,
    getSubPanels,
    getObjects,
    getSideNavs
};