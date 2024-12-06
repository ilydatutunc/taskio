const { v4: uuidv4 } = require('uuid'); 
const messages = []; 


function createMessage(req, res) {
    const body = req.body;

    const newUUID = uuidv4(); 
    const newMessage = {
        id: newUUID,
        sender: body.sender,         
        message: body.message,       
        timestamp: new Date().toISOString() 
    };

    messages.push(newMessage); 

    res.json({ id: newUUID }); 
}


function getMessages(req, res) {
    res.json({
        messages: messages
    });
}


function deleteMessage(req, res) {
    const messageId = req.params.messageId;

    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex === -1) {
        res.status(404).json({ deleted: false, message: "Mesaj bulunamadı" });
        return;
    }

    messages.splice(messageIndex, 1); 
    res.json({ deleted: true });
}


module.exports = {
    createMessage,
    getMessages,
    deleteMessage
};