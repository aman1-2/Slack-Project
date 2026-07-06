import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Channel name is required"]
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: [true, "To which Workspace Channel belongs is required"]
    }
}, { timestamps: true });

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;