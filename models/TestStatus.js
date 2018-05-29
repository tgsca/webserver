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
    testcases: {
        type: Number,
        required: true
    },
    passed: {
        type: String,
        required: true
    },
    failed: {
        type: String,
        required: true
    },
    unexecuted: {
        type: String,
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