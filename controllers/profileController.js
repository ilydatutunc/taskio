const { v4: uuidv4 } = require('uuid'); 
const bcrypt = require('bcrypt'); 
const profiles = []; 


async function createProfile(req, res) {
    const body = req.body;

    
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUUID = uuidv4(); 
    const newProfile = {
        id: newUUID,
        firstName: body.firstName,   
        lastName: body.lastName,     
        email: body.email,           
        age: body.age,               
        position: body.position,     
        password: hashedPassword,    //şifre hashleme iyice öğren
        createdAt: new Date().toISOString() 
    };

    profiles.push(newProfile); 

    res.json({ id: newUUID }); 
}


function getProfiles(req, res) {
    const sanitizedProfiles = profiles.map(profile => ({
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        age: profile.age,
        position: profile.position,
        createdAt: profile.createdAt
    }));

    res.json({ profiles: sanitizedProfiles });
}


function deleteProfile(req, res) {
    const profileId = req.params.profileId;

    const profileIndex = profiles.findIndex((profile) => profile.id === profileId);
    if (profileIndex === -1) {
        res.status(404).json({ deleted: false, message: "Profil bulunamadı" });
        return;
    }

    profiles.splice(profileIndex, 1); 
    res.json({ deleted: true });
}

module.exports = {
    createProfile,
    getProfiles,
    deleteProfile
};