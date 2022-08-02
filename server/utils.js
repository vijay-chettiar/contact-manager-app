const mongoose = require("mongoose");
const User = require("./models/UserModel");

const checkEmailPresent = async (email) => {
    const data = await User.findOne({ email });
    if (data) {
        return true;
    } else {
        return false;
    }
}

module.exports = checkEmailPresent;