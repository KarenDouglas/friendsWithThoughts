const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    reactions: [reactionSchema]
  });
  

  const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;