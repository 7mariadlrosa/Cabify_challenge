const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
    {
        leader: {
            type: Schema.Types.ObjectId,
            ref: 'Eater'
        },
        eaters: [{
            type: Schema.Types.ObjectId,
            ref: 'Eater'
        }],
        restaurants: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurant'
        },
    },
    {
        timestamps: true,
    }
);

const Group = model("Group", groupSchema);

module.exports = Group;