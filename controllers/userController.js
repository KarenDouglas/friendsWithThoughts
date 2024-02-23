const {User} = require('../models')

module.exports ={
    async getUsers (req, res){
        try{
            const users = await User.find()
            .populate('thoughts')
            .populate('friends')
            .populate('reactions')

            res.json(users)
        }catch(err){
            console.error(err)
            res.status(500).json(err); 
        }
    },
    

    async createUser(req, res) {
        try {

            const {username, email} = req.body
            const newUser = await User.create({username, email});
            res.status(201).json(newUser);
        } catch (err) {
            console.error(err);
            res.status(500).json(err); 
        }
    },

    async updateUser (req, res){
        try{
            const {username, email} = req.body
            const updatedUser = await User.findOneAndUpdate({_id: req.params.userId},
                {$set: {username: username , email: email}},
                {new: true}
                )
                res.json(updatedUser)
        }catch(err){
            console.error(err);
            res.status(500).json(err); 
        }

    },
    async deleteUser (req, res){
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    async addFriend (req, res){
     const { friendId, userId}= req.params
     try{      
        const user = await User.findOne({_id:userId})
        user.friends.push(friendId)
        await user.save();
            res.json(user)
    }catch(err){
        console.error(err);
        res.status(500).json(err); 
    }

    },
    async deleteFriend(req, res) {
        try {
            const { friendId, userId } = req.params;
            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.friends = user.friends.filter((friend) => friend.toString() !== friendId);


            await user.save();

            res.json({ message: 'Friend deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
}