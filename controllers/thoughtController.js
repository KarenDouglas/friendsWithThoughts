const {Thought, User} = require('../models')

module.exports = {
async getThoughts(req, res){
    try{
        const thoughts = await Thought.find()
        .populate('reactions')
        


        res.json(thoughts)
    }catch(err){
        console.error(err)
        res.status(500).json(err); 
    }
},

async getThoughtByID(req, res) {
    try {
    const thought = await Thought.findOne({ _id:req.params.thoughtId});
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err); 
    }
},

    async createThought(req, res) {
        try {
            const { userId } = req.params;
            const { thoughtText } = req.body;


            const thought = await Thought.create({ thoughtText });

     
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }


            user.thoughts.push(thought._id);

        
            await user.save();

            res.status(201).json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    async updateThought (req,res){
       try{
            const {thoughtId} = req.params
            const {thoughtText} = req.body
            const updatedThought = await Thought.findOneAndUpdate({_id: thoughtId},
                {$set: {thoughtText: thoughtText}},
                {new: true}
                )
                res.json(updatedThought)
        }catch(err){
            console.error(err);
            res.status(500).json(err); 
        }
    },
    async deleteThought(req, res) {
        try {
            const { thoughtId} = req.params
            const {userId} = req.body

            console.log('Thought ID:', thoughtId);
            console.log('User ID:', userId);
            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.thoughts = user.thoughts.filter((thought) => thought.toString() !== thoughtId);


            await user.save();

            res.json({ message: 'thought deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    async createReaction (req, res){
        try {
            const { thoughtId } = req.params;
            const { reactionBody, username } = req.body;
    
            // Find the thought by its ID
            const thought = await Thought.findById(thoughtId);
    
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
    
            const newReaction = {
                reactionBody: reactionBody,
                username: username
            };
            thought.reactions.push(newReaction);
    
            // Save the updated thought document
            await thought.save();
    
            res.status(201).json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },
    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;
            // Find the thought by its ID
            const thought = await Thought.findById(thoughtId);
            
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            
            // Find the index of the reaction with the given reactionId
            const reactionIndex = thought.reactions.findIndex(reaction => reaction.reactionId.toString() === reactionId)            
            
            if (reactionIndex === -1) {
                return res.status(404).json({ message: 'Reaction not found' });
            }

            
            thought.reactions.splice(reactionIndex, 1);

            
            await thought.save();

            res.json({ message: 'Reaction deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
    
}

