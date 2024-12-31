const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Profile = require('../modules/profileModule.js');  // Profile modelini içe aktarma


// Profil oluşturma
async function createProfile(req, res) {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newProfile = new Profile({
        id: uuidv4(),
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        age: body.age,
        position: body.position,
        password: hashedPassword,
        createdAt: new Date()
    });

    try {
        const savedProfile = await newProfile.save();
        res.json({ id: savedProfile.id });
    } catch (err) {
        console.error('Profil kaydetme hatası:', err);
        res.status(500).json({ message: 'Profil kaydedilemedi', error: err.message });
    }
}

// Profilleri alma
async function getProfiles(req, res) {
    try {
        const profiles = await Profile.find();
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
    } catch (err) {
        res.status(500).json({ message: 'Profiller alınamadı', error: err.message });
    }
}

// Profil silme
async function deleteProfile(req, res) {
    const profileId = req.params.profileId;

    try {
        const deletedProfile = await Profile.findOneAndDelete({ id: profileId });
        if (!deletedProfile) {
            res.status(404).json({ deleted: false, message: 'Profil bulunamadı' });
            return;
        }

        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ message: 'Profil silinemedi', error: err.message });
    }
}
//E-mail kontrolü

async function checkEmail(req, res) {
    const { email } = req.body;

    try {
        const existingProfile = await Profile.findOne({ email }); 
        if (existingProfile) {
            console.log('E-posta mevcut:', email); // Hata loglama
            return res.status(400).json({ exists: true, message: 'Bu e-posta adresi zaten kullanılıyor!' });
        }
        console.log('E-posta yeni:', email); // E-posta yeni
        res.json({ exists: false });
    } catch (error) {
        console.error('E-posta kontrol hatası:', error);
        res.status(500).json({ message: 'E-posta kontrolü sırasında hata oluştu', error: error.message });
    }
}


//giriş yapma

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const profile = await Profile.findOne({ email });
        if (!profile) {
            return res.status(400).json({ message: 'E-posta adresi bulunamadı!' });
        }

        const isPasswordValid = await bcrypt.compare(password, profile.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Geçersiz şifre!' });
        }

        // JWT oluştur
        const token = jwt.sign(
            { email: profile.email, id: profile.id },
            'secretKey', // Bu, gizli anahtarınız. Güvenli bir şekilde saklayın.
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Giriş başarılı!',
            token: token, // Token'ı döndür
        });
    } catch (error) {
        res.status(500).json({ message: 'Giriş yapılırken hata oluştu!', error: error.message });
    }
}

//profil güncelleme 

async function updateProfile(req, res) {
    const profileId = req.params.profileId;
    const updatedData = req.body;

    try {
        // Profil verisini bul ve güncelle
        const updatedProfile = await Profile.findOneAndUpdate(
            { id: profileId },
            { $set: updatedData }, // Verileri güncelle
            { new: true } // Güncellenmiş veriyi geri döndür
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profil bulunamadı' });
        }

        res.json({ message: 'Profil başarıyla güncellendi', profile: updatedProfile });
    } catch (err) {
        res.status(500).json({ message: 'Profil güncellenemedi', error: err.message });
    }
}

// Kullanıcı profil bilgilerini almak
async function getProfile(req, res) {
    const token = req.headers['authorization']?.split(' ')[1]; // Authorization header'dan token alınır

    if (!token) {
        return res.status(401).json({ message: 'Token gerekli!' }); // Token olmadığında hata döndür
    }

    try {
        // Token doğrulama (secretKey, JWT oluştururken kullanılan anahtarla eşleşmeli)
        const decoded = jwt.verify(token, 'secretKey');

        // Kullanıcının email adresine göre profil bilgilerini al
        const profile = await Profile.findOne({ email: decoded.email });

        if (!profile) {
            return res.status(404).json({ message: 'Profil bulunamadı!' }); // Kullanıcı bulunamazsa hata
        }

        // Profil bilgilerini döndür
        res.json({
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            position: profile.position,
            age: profile.age
        });
    } catch (error) {
        res.status(500).json({ message: 'Profil alınırken hata oluştu', error: error.message }); // Hata yönetimi
    }
}




module.exports = {
    createProfile,
    getProfiles,
    deleteProfile,
    login,
    checkEmail,
    updateProfile,
    getProfile
};
