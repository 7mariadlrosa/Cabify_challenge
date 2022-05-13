const { Schema, model } = require("mongoose");

const eaterSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, "Indica el correo electrónico"],
        },
        name: {
            type: String,
            required: [true, "Indica el nombre de usuario"],
        },
    },
    {
        timestamps: true,
    }
);

const Eater = model("Eater", eaterSchema);

module.exports = Eater;