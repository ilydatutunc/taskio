const { v4: uuidv4 } = require('uuid'); 
const Group = require('../modules/groupModule.js');


// Grup oluşturma
async function createGroup(req, res) {
    const body = req.body;
    
    // Grup adı alınır
    const groupName = body.name;
    if (!groupName) {
        return res.status(400).json({ error: 'Grup adı gereklidir.' });
    }

    // Grup için benzersiz ID ve grup kodu oluşturuluyor
    const newGroupCode = uuidv4().slice(0, 8);

    // Yeni grup objesi oluşturuluyor
    const newGroup = new Group({
        groupId: uuidv4(),
        groupName: groupName,
        groupCode: newGroupCode,
        users: []  // Başlangıçta grup kullanıcıları boş
    });

    try {
        // Grubu MongoDB'ye kaydediyoruz
        const savedGroup = await newGroup.save();
        res.status(201).json({
            message: 'Grup başarıyla oluşturuldu!',
            groupId: savedGroup.groupId,
            groupCode: savedGroup.groupCode
        });
    } catch (error) {
        res.status(500).json({ error: 'Grup oluşturulurken hata oluştu.' });
    }
}

// Gruba katılma
async function joinGroup(req, res) {
    const { groupCode, userName } = req.body;

    if (!groupCode || !userName) {
        return res.status(400).json({ error: 'Grup kodu ve kullanıcı adı gereklidir.' });
    }

    try {
        // Grup koduna göre grup aranır
        const group = await Group.findOne({ groupCode });

        if (!group) {
            return res.status(404).json({ error: 'Grup bulunamadı.' });
        }

        // Kullanıcı zaten grupta mı diye kontrol edelim
        if (group.users.includes(userName)) {
            return res.status(400).json({ error: 'Bu kullanıcı zaten grupta.' });
        }

        // Kullanıcı gruba eklenir
        group.users.push(userName);

        // Grupları güncelleriz
        await group.save();

        res.status(200).json({
            message: `${userName} gruba katıldı!`,
            groupId: group.groupId
        });
    } catch (error) {
        res.status(500).json({ error: 'Gruba katılırken hata oluştu.' });
    }
}


// Grup kullanıcılarını listeleme
async function getGroupUsers(req, res) {
    const groupId = req.params.groupId;

    try {
        const group = await Group.findOne({ groupId });

        if (!group) {
            return res.status(404).json({ error: 'Grup bulunamadı.' });
        }

        res.status(200).json({
            groupName: group.groupName,
            users: group.users
        });
    } catch (error) {
        res.status(500).json({ error: 'Kullanıcılar listelemede hata oluştu.' });
    }
}


module.exports = {
    createGroup,
    joinGroup,
    getGroupUsers
};
