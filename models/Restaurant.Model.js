const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Indica el nombre del restaurante"],
        },
        adress: {
            type: String,
            unique: true,
            required: [true, "Indica la dirección del resturante"],
        },
    },
    {
        timestamps: true,
    }
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;