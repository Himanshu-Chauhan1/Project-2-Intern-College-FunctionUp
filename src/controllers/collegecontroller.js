const collegeModel = require("../models/collegeModel");

//===============POST/College====================
const createCollege = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "plz enter details for create college", });
        }
        if (!data.name) {
            return res.status(400).send({ status: false, message: "College name is required for create a college doc", });
        }
        if (!/^([a-zA-Z]+)$/.test(data.name)) {
            return res.status(400).send({ status: false, message: "plz enter valid name ,dont use space between letters for college short name", });
        }
        let isValidName = await collegeModel.findOne({ name: data.name });
        if (isValidName) {
            return res.status(400).send({ status: false, message: "Already one college registered with this same name", });
        }
        if (!data.fullName) {
            return res.status(400).send({status: false,message: "college fullname is required for creating a college doc ",});
        }
        if (!/^[A-Za-z\'\s\.\,]+$/.test(data.fullName)) {
            return res.status(400).send({status: false,massege: "plz enter valid full name ,dont use number and special characters for college fullname",});
        }
        let isValidFullName = await collegeModel.findOne({
            fullName: data.fullName,
        });
        if (isValidFullName) {
            return res.status(400).send({status: false,message: "Already one college registered with this same fullname",});
        }

        /////======== logolink validation=======/////

        if (!data.logolink) {
            return res.status(400).send({status: false,message: "logolink is required for creating a college doc",});
        }
        if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(data.logolink)) {
            return res.status(400).send({ status: false, message: "plz enter a valid logolink" });
        }
        let collegeCreated = await collegeModel.create(data);

        res.status(201).send({ status: true, data: collegeCreated });
    } catch (err) {
        res.status(500).send({ status: false, err: err.message });
    }
};

module.exports.createCollege = createCollege;