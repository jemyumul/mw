// const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const app = express();
const { result, update } = require("lodash");

const { //FOR PANEL REFERENCES
    getAllPanels,
    getPanelViaID,
    createPanel,
    updatePanel,
    deletePanel
} = require("./repository/panel")

const { //FOR section REFERENCES
    getAllSections,
    getSectionViaID,
    deleteSection,
    createSection,
    updateSection
} = require("./repository/section")

const { //FOR SUBPANELS REFERENCES
    getAllSubPanels,
    getSubPanelViaID,
    createSubPanel,
    updateSubPanel,
    deleteSubPanel
} = require("./repository/subpanel")

const { //FOR OBJECTS REFERENCES
    getAllObject,
    getObjectViaID,
    createObject,
    updateObject,
    deleteObject,
    getSideNavChildren,
    insertSideNavChildren,
    deleteSideNavChildren
} = require("./repository/object")

const { //FOR MAIN REFERENCES
    getSections,
    getPanels,
    getSubPanels,
    getObjects,
    getSideNavs
} = require("./repository/main")

const genericError = "Sorry, something went wrong!"

const { networkInterfaces } = require('os');




app.use(express.json());

// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

app.use(cors());

app.listen(process.env.PORT || 5000, () => console.log("API Server is running..."));

//#region Test Routes
app.get("/", (req, res) => {
    res.json({ message: "ok" });
  });

app.get("/outfit", (req, res) => {
    const tops = ['Black', 'White', 'Orange', 'Navy Blue'];
    const jeans = ['Grey', 'Dark Grey', 'Black', 'Navy'];
    res.json({
        tops: tops[0],
        jeans: jeans[0]
    })
});

app.post("/comments", function (req, res) {
    // const content = req.body.content;

    //console.log(req.body);
    return res.sendStatus(201);

});


app.get("/testIP", function (req, res) {
    // const content = req.body.content;
    const nets = networkInterfaces();
    const netResults = Object.create(null); // Or just '{}', an empty object
    //console.log(req.body);
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!netResults[name]) {
                    netResults[name] = [];
                }
                netResults[name].push(net.address);
            }
        }
    }
    console.log(netResults);
    return res.sendStatus(201);

});

//#endregion

//#region section routes
app.get("/section", async function (request, response) { //for section list
    try {
        const [result] = await getAllSections()
        //console.log(result);        
        response.send({ result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.get("/section/:id", async function (request, response) { //get specific section
    try {
        const { id } = request.params;
        const [result] = await getSectionViaID(id)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/section/delete/:id", async function (request, response) { //delete specific section
    try {
        const { id } = request.params;
        //console.log(id);                        
        const [result] = await deleteSection(id)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/section/new", async function (request, response) { //create specific section
    try {
        const {code, className, style, orderNo} = request.body.formData;
        const [result] = await createSection(code, className, style, orderNo)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/section/update/:id", async function (request, response) { //create specific section
    try {
        const { id } = request.params;
        const { code, className, style, orderNo} = request.body.formData;
        const [result] = await updateSection(id, code, className, style, orderNo)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})



//#endregion

//#region panel routes
app.get("/panel", async function (request, response) {
    try {
        const [result] = await getAllPanels()
        //console.log(result);        
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.get("/panel/:id", async function (request, response) {
    try {
        const { id } = request.params;
        const [result] = await getPanelViaID(id)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/panel/new", async function (request, response) { //create specific section
    try {
        const {code, sectionCode, className, style, orderNo} = request.body.formData;
        const [result] = await createPanel(code, sectionCode, className, style, orderNo)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/panel/delete/:id", async function (request, response) { //delete specific section
    try {
        const { id } = request.params;
        //console.log(id);                        
        const [result] = await deletePanel(id)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/panel/update/:id", async function (request, response) { //create specific section
    try {
        const { id } = request.params;
        const { code, sectionCode, className, style, orderNo} = request.body.formData;
        const [result] = await updatePanel(id, code, sectionCode, className, style, orderNo)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

//#endregion


//#region subpanel routes
app.get("/subpanel", async function (request, response) {
    try {
        const [result] = await getAllSubPanels()
        //console.log(result);        
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.get("/subpanel/:id", async function (request, response) {
    try {
        const { id } = request.params;
        const [result] = await getSubPanelViaID(id)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/subpanel/new", async function (request, response) { //create specific section
    try {
        const {code, panelCode, className, style, orderNo} = request.body.formData;
        const [result] = await createSubPanel(code, panelCode, className, style, orderNo)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/subpanel/delete/:id", async function (request, response) { //delete specific section
    try {
        const { id } = request.params;
        //console.log(id);                        
        const [result] = await deleteSubPanel(id)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/subpanel/update/:id", async function (request, response) { //create specific section
    try {
        const { id } = request.params;
        const { code, panelCode, className, style, orderNo} = request.body.formData;
        const [result] = await updateSubPanel(id, code, panelCode, className, style, orderNo)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})
//#endregion

//#region object routes
app.get("/object", async function (request, response) {
    try {
        const [result] = await getAllObject()
        //console.log(result);        
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.get("/object/:id", async function (request, response) {
    try {
        const { id } = request.params;
        const [result] = await getObjectViaID(id)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/object/new", async function (request, response) { //create specific section
    try {
        const {code, name, type, subPanelCode, className, text, style, src, order} = request.body.formData;
        //console.log(request.body.formData);
        const [result] = await createObject(code, name, type, subPanelCode, className, text, style, src, order)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/object/delete/:id", async function (request, response) { //delete specific section
    try {
        const { id } = request.params;
        //console.log(id);                        
        const [result] = await deleteObject(id)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/object/update/:id", async function (request, response) { //create specific section
    try {
        const { id } = request.params;
        const { code, name, type, subPanelCode, className, text, style, src, order} = request.body.formData;
        const [result] = await updateObject(id, code, name, type, subPanelCode, className, text, style, src, order)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.get("/object/sidenavchildren/:id", async function (request, response) { //create specific section
    try {
        const { id } = request.params;
        const [result] = await getSideNavChildren(id)
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/object/sidenavchildren/new/:id", async function (request, response) { //create specific section
    try {
        const { id } = request.params;
        const sideNavs = request.body.sideNavState;
        sideNavs.forEach(element => {
            insertSideNavChildren(id, element.Value, element.ClassName, element.Style, element.Order)
        });
        // const [result] = await getSideNavChildren(id)
        response.send({ success: true})
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})

app.post("/object/sidenavchildren/delete/:id", async function (request, response) { //create specific section
    try {
        const { id } = request.params;
        //console.log(id);                        
        const [result] = await deleteSideNavChildren(id)    
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})
//#endregion

//#region main routes
app.get("/main", async function (request, response) {
    try {
        const [sections] = await getSections()
        const [panels] = await getPanels()
        const [subpanel] = await getSubPanels()
        const [object] = await getObjects()
        const [sidenavchildren] = await getSideNavs()
        
        object.forEach(e => {
            if(e.ObjectDynamicStyle === null){
                e.ObjectDynamicStyle = {}
            }
            else{
                e.ObjectDynamicStyle = JSON.parse(e.ObjectDynamicStyle)
            }
            if(e.ObjectType === 'sideNav'){ //DEFINE CHILDREN HERE
                e.Children = [];
                sidenavchildren.forEach(s => {
                    if(s.DynamicStyle === null){
                        s.DynamicStyle = {}
                    }
                    else{
                        s.DynamicStyle = JSON.parse(s.DynamicStyle)
                    }
                    if(e.ObjectId === s.ObjectId){
                        e.Children.push(s);
                    }
                })
            }
        });


        let ctr = 0;
        subpanel.forEach(e => {
            e.Objects = [];
            if(e.DynamicStyle === null){
                e.DynamicStyle = {}
            }
            else{
                e.DynamicStyle = JSON.parse(e.DynamicStyle)
            }
            
            object.forEach(o => {
                if(e.SubPanelCode === o.SubPanelCode){
                    e.Objects.push(o);
                }
            })
        })



        panels.forEach(p => {
            p.SubPanels = [];
            // p.DynamicStyle = p.DynamicStyle == null ? {} : JSON.parse(p.DynamicStyle)
            if(p.DynamicStyle === null){
                p.DynamicStyle = {}
            }
            else{
                p.DynamicStyle = JSON.parse(p.DynamicStyle)
            }
            subpanel.forEach(sp => {
                if(p.PanelCode === sp.PanelCode){
                    p.SubPanels.push(sp);
                }
            })
        })


        sections.forEach(s => {
            s.Panels = [];
            // s.DynamicStyle = s.DynamicStyle == null ? {} : JSON.parse(s.DynamicStyle)
            
            if(s.DynamicStyle === null){
                s.DynamicStyle = {}
            }
            else{
                s.DynamicStyle = JSON.parse(s.DynamicStyle)
            }
            panels.forEach(p => {
                if(p.SectionCode === s.SectionCode){
                    s.Panels.push(p)
                }
            })
        })
        
        const result = sections
        response.send({ success: true, result })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success: false,
            error: genericError,
        })
    }
})
//#endregion

