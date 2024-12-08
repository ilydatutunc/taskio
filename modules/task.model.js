const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    id:{
      type: String,
      required: true,
    },
    title: { 
      type: String, 
      required: true, 
    }, 
    description: { 
      type: String, 
      required: true 
    }, 
    status: { 
      type : String, 
      enum: ['pending', 'on-going', 'completed'], 
      default: 'pending' 
    },
    assignedTo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }, 
    createdBy:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    dueDate: { 
      type: Date, 
      required: false 
    }, 
  },

  {timestamps: true, collection: 'tasks'}
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
