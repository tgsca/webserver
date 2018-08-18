var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestStatusSchema = new Schema({
    project: {
        type: String,
        required: true
    },
    cycle: {
        type: String,
        required: true
    },
    passed: {
        type: Number,
        required: true
    },
    failed: {
        type: Number,
        required: true
    },
    unexecuted: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

TestStatusSchema.statics = {
    load: function(id, cb){
        this.findOne({_id : id}).exec(cb);
    }
};

mongoose.model('TestStatus', TestStatusSchema);