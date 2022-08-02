const express = require("express");
const mongoose = require("mongoose")
const Contact = require("../models/ContactModel");
const authCheck = require("../middleware/authCheck")

const router = express.Router();

router.get("/", authCheck, async (req, res) => {
    try {
        const allContacts = await Contact.find({ userId: req.user._id })
            .populate(
                "userId",
                "-password"
            );
        let contacts = allContacts[0].contact;
        return res.status(200).json(contacts);
    } catch (err) {
        console.log(err);
    }
});

router.post("/addcontacts", authCheck, async (req, res) => {
    try {
        const contactList = await Contact.find({ userId: req.user._id });
        if (contactList.length) {
            var savedContact = await Contact.updateMany({ userId: req.user._id }, {
                $push: { contact: req.body }
            })

            const list = await Contact.find({ userId: req.user._id });
            let newlist = list[0].contact;
            const newArr = newlist.map((item) => {
                const newObj = Object.assign({}, item, {
                    hiWorld: `${item.name}${item.designation}${item.company}${item.industry}${item.email}${item.phoneNumber}${item.country}`,
                });
                return newObj;
            });
            var uniqueItems = [];
            var duplicateIds = [];
            newArr.forEach((item) => {
                if (uniqueItems.includes(item.hiWorld)) {
                    duplicateIds.push(item._doc._id);
                } else {
                    uniqueItems.push(item.hiWorld);
                    uniqueItems.push(item._doc._id);
                }
            });

            let updated = await Contact.updateMany({ $pull: { contact: { _id: [...duplicateIds] } } })
        }
        else {
            var savedContact = await Contact.create({
                contact: req.body,
                userId: req.user._id
            });

            const list = await Contact.find({ userId: req.user._id });

            let newlist = list[0].contact;
            const newArr = newlist.map((item) => {
                const newObj = Object.assign({}, item, {
                    hiWorld: `${item.name}${item.designation}${item.company}${item.industry}${item.email}${item.phoneNumber}${item.country}`,
                });
                return newObj;
            });
            var uniqueItems = [];
            var duplicateIds = [];
            newArr.forEach((item) => {
                if (uniqueItems.includes(item.hiWorld)) {
                    duplicateIds.push(item._doc._id);
                } else {
                    uniqueItems.push(item.hiWorld);
                    uniqueItems.push(item._doc._id);
                }
            });

            let updated = await Contact.updateMany({ $pull: { contact: { _id: [...duplicateIds] } } })
        }

        let finalList = await Contact.find({ userId: req.user._id })

        res.status(200).send(finalList[0].contact)
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
});

// router.delete("/delete/:id", async (req, res) => {
//     var { id } = req.params;
//     // console.log(typeof(name))

//     // var ObjectId = require('mongoose').Types.ObjectId;
//     // var myObjectId = ObjectId.fromString(`${id}`);

//     var main = mongoose.Types.ObjectId(id);
//     console.log(main)

//     // console.log(mongoose.isValidObjectId(id));

//     // let a = ObjectId("id");
//     // console.log(a(id))

//     // if (!id) return res.status(400).json({ error: "no id specified." });

//     // if (!mongoose.isValidObjectId(id))
//     //     return res.status(400).json({ error: "please enter a valid id" });
//     // try {
//     //     const contact = await Contact.findOne({ _id: id });
//     //     if (!contact) return res.status(400).json({ error: "no contact found" });

//         //   if (req.user._id.toString() !== contact.postedBy._id.toString())
//         //     return res
//         //       .status(401)
//         //       .json({ error: "you can't delete other people contacts!" });

//         // const result = await Contact.deleteOne({ _id: id });
// try{
//         // Contact.update({ $pull: {contact: {_id: new mongoose.isValidObjectId}}});
//         // Contact.findOneAndUpdate( {$pull: {contact: {name: name}}})

//         let updated = await Contact.updateOne({$pull: {contact: {_id: main}}})

//         //   const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
//         //     "postedBy",
//         //     "-password"
//         //   );

//         //   return res
//         //     .status(200)
//         //     .json({ ...contact._doc, myContacts: myContacts.reverse() });

//         const allContacts = await Contact.find()
//             .populate(
//                 "userId"
//             );
//         // console.log(allContacts[0].contact.length)
//         // console.log(allContacts[0].contact)
//         let contacts = allContacts[0].contact;

//         // for(let i=0;i<allContacts[0].contact)
//         return res.status(200).json(contacts);
//     } catch (err) {
//         console.log(err);
//     }
// });

router.delete("/delete/", authCheck, async (req, res) => {
    let id = req.body
    // console.log(id)
    for (let i = 0; i < id.length; i++) {
        // let sign = id[i]._id
        id[i] = mongoose.Types.ObjectId(id[i])
    }
    // console.log(id)

    try {
        let updated = await Contact.updateMany({ $pull: { contact: { _id: [...id] } } })

        const allContacts = await Contact.find({ userId: req.user._id })
            .populate(
                "userId",
                "-password"
            );

        let contacts = allContacts[0].contact;
        return res.status(200).json(contacts);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;