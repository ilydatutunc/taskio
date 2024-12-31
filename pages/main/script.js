function showPage(pageId) {
    // Tüm sayfaları gizleyin
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Tıklanan sayfayı gösterin
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'block';
    }

    // Hesap bilgilerinin dinamik olarak yüklenmesi
    if (pageId === 'account') {
        loadUserAccount();
    }
}


// Sayfa yüklendiğinde varsayılan olarak Hesabım sayfasını göster
window.onload = () => {
    showPage('account');
};
// Kullanıcı hesabını yüklemek için fonksiyon
function loadUserAccount() {
    const token = "BURAYA_GİRİŞ_YAPILDIĞINDA_ALINAN_TOKEN_GELECEK"; // Token burada saklanmalı

    fetch('http://localhost:3000/profiles', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Token'ı ekle
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Profil alınamadı!');
        }
        return response.json();
    })
    .then(profile => {
        const profileDiv = document.getElementById('profile');
        profileDiv.innerHTML = `
            <h2>${profile.firstName} ${profile.lastName}</h2>
            <p><strong>Email:</strong> ${profile.email}</p>
            <p><strong>Pozisyon:</strong> ${profile.position}</p>
            <p><strong>Yaş:</strong> ${profile.age}</p>
        `;
    })
    .catch(error => {
        console.error('Hata:', error);
        document.getElementById('profile').innerHTML = '<p>Profil yüklenemedi.</p>';
    });
}

// Sayfa gösterme fonksiyonu
function showPage(pageId) {
    // Tüm sayfaları gizleyin
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Tıklanan sayfayı gösterin
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'block';
    }

    // Hesap bilgilerinin dinamik olarak yüklenmesi
    if (pageId === 'account') {
        loadUserAccount();
    }
}

// Sayfa yüklendiğinde varsayılan olarak Hesabım sayfasını göster
window.onload = () => {
    showPage('account');
};
