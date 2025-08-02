// Elemanları seç
const maps = document.querySelectorAll('.map');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const pins = document.querySelectorAll('.pin');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const mediaContainer = document.getElementById('mediaContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const photoCounter = document.getElementById('photoCounter');

// Şifre ekranı elemanları
const passwordScreen = document.querySelector('.password-screen');
const pinInputs = document.querySelectorAll('.password-input input');
const submitPasswordButton = document.getElementById('submitPassword');
const incorrectPasswordDiv = document.getElementById('incorrectPassword');
const mapContainer = document.querySelector('.map-container');

let currentMap = 0;
let currentMediaIndex = 0;
let activePinMedia = [];

// Doğru şifre
const correctPassword = '0901'; // Buraya istediğiniz 4 haneli şifreyi yazın

// Harita gösterimi güncelle
function updateMapView() {
  maps.forEach((map, index) => {
    map.classList.toggle('active', index === currentMap);
  });
}

// Ok butonları tıklama olayları
leftBtn.addEventListener('click', () => {
  currentMap = (currentMap - 1 + maps.length) % maps.length;
  updateMapView();
});

rightBtn.addEventListener('click', () => {
  currentMap = (currentMap + 1) % maps.length;
  updateMapView();
});

// Medya verisi - Her pin için bir dizi (array)
const mediaData = {
  // İstanbul Pinleri
  istanbul1: [
    { type: 'image', src: 'assets/pins/stad1.jpg', caption: 'Seni Fenerli yaptığım o güzel gün ☕' },
  ],
  istanbul2: [
    { type: 'image', src: 'assets/pins/galata1.jpg', caption: 'İstanbul’un incisi Galata, seninle her köşesi bir şiir. 📸' },
    { type: 'image', src: 'assets/pins/galata2.jpg', caption: 'Yanımda sen, manzara tamamlandı bitanem' },
    { type: 'image', src: 'assets/pins/galata3.jpg', caption: 'Galata Kulesi’nden İstanbul’a baktığımız o eşsiz an' },
    { type: 'image', src: 'assets/pins/galata4.jpg', caption: 'Galata Kulesi önünde çekildiğimiz fotoğraf 📸' },
  ],
  istanbul3: [
    { type: 'image', src: 'assets/pins/topkapi.jpg', caption: 'Sultanların aşklarına yakışır bir ihtişam... Topkapı Sarayı’nda kalbimin sultanıyla el ele ❤️❤️❤️❤️❤️❤️❤️❤️' }
  ],
  istanbul4: [
    { type: 'image', src: 'assets/pins/sushi.jpg', caption: 'En sevdiğimiz sushi restoranı!' },
    { type: 'image', src: 'assets/pins/sushi2.jpg', caption: 'Sushi sevmeye başladığın o gece!' },
    { type: 'image', src: 'assets/pins/sushi3.jpg', caption: 'Bebekimle 14 Şubat Datesiiiii!' }
  ],
  istanbul5: [
    { type: 'image', src: 'assets/pins/bebek.jpg', caption: 'Bebek sahilinde yürüyüşümüz with bebeğimmm' }
  ],
  istanbul6: [
    { type: 'image', src: 'assets/pins/bogaz.jpg', caption: 'Bir yanımda boğaz bir yanımda sen........' }
  ],
  istanbul7: [
    { type: 'image', src: 'assets/pins/beyoglu.jpg', caption: 'Beyoğlu akşamları' }
  ],
  istanbul8: [
    { type: 'image', src: 'assets/pins/besiktas_yemek1.jpg', caption: 'Beşiktaş’ta yediğimiz o harika yemek!' },
    { type: 'image', src: 'assets/pins/besiktas_yemek2.jpg', caption: 'Beşiktaş’ta yediğimiz o ağlaklı yemek' }
  ],
  istanbul9: [
    { type: 'image', src: 'assets/pins/dg1.jpg', caption: 'Doğum günü sürprizimiz 🎉' },
    { type: 'image', src: 'assets/pins/dg2.jpg', caption: 'Doğum günü sürprizimiz 🎉' },
    { type: 'image', src: 'assets/pins/uyku.jpg', caption: 'huzu içinde uyuyosun bebeğiyommm' }
  ],
  istanbu20: [
    { type: 'image', src: 'assets/pins/beylerbeyi1.jpg', caption: 'Beylerbeyi Sarayı ziyareti' },
    { type: 'image', src: 'assets/pins/beylerbeyi2.jpg', caption: 'Beylerbeyi Sarayı ziyareti' },
    { type: 'image', src: 'assets/pins/beylerbeyi3.jpg', caption: 'Beylerbeyi Sarayı ziyareti' },
    { type: 'image', src: 'assets/pins/beylerbeyi4.jpg', caption: 'Beylerbeyi Sarayı ziyareti' },
    { type: 'image', src: 'assets/pins/beylerbeyi5.jpg', caption: 'Beylerbeyi Sarayı ziyareti' },
    { type: 'image', src: 'assets/pins/beylerbeyi6.jpg', caption: 'Beylerbeyi Sarayı ziyareti' },
    { type: 'image', src: 'assets/pins/beylerbeyi7.jpg', caption: 'Beylerbeyi Sarayı ziyareti' },
    { type: 'image', src: 'assets/pins/beylerbeyi8.jpg', caption: 'Beylerbeyi Sarayı ziyareti' },
    { type: 'image', src: 'assets/pins/beylerbeyi9.jpg', caption: 'Beylerbeyi Sarayı ziyareti' },
    { type: 'image', src: 'assets/pins/beylerbeyi10.jpg', caption: 'Beylerbeyi Sarayı ziyareti' }
  ],
  istanbu21: [
    { type: 'image', src: 'assets/pins/askimemnu.jpg', caption: 'Aşk-ı Memnu yalısı' }
  ],
  istanbu22: [
    { type: 'image', src: 'assets/pins/sabiha.jpg', caption: 'Sabiha Gökçen ;))))' }
  ],
  istanbu23: [
    { type: 'image', src: 'assets/pins/isthav.jpg', caption: 'İstanbul Havalimanı’ndan ilk fotoğrafımız' }
  ],
  // Trabzon Pinleri
  trabzon1: [
    { type: 'video', src: 'assets/pins/uzungol.mp4', caption: 'Uzungöl yürüyüşümüzden güzel bir video 🎥' },
    { type: 'image', src: 'assets/pins/uzungol_dag.jpg', caption: 'Uzungöl’ün muhteşem manzarası' }
  ],
  trabzon2: [
    { type: 'image', src: 'assets/pins/sumela.jpg', caption: 'Sümela Manastırı ziyaretimiz 🏞️' }
  ]
};

function renderMedia() {
  const media = activePinMedia?.[currentMediaIndex];
  if (!media) return;

  let html = '';
  if (media.type === 'image') {
    html = `<img src="${media.src}" alt="${media.caption}" /><p>${media.caption}</p>`;
  } else if (media.type === 'video') {
    html = `<video src="${media.src}" controls autoplay muted playsinline></video><p>${media.caption}</p>`;
  }
  
  mediaContainer.innerHTML = html;
  
  // Butonları ve sayacı güncelle
  prevBtn.disabled = currentMediaIndex === 0;
  nextBtn.disabled = currentMediaIndex === (activePinMedia?.length - 1 || 0);
  photoCounter.textContent = `${currentMediaIndex + 1} / ${activePinMedia?.length || 0}`;
}

// Pin tıklama ile modal açma
pins.forEach(pin => {
  pin.addEventListener('click', () => {
    const id = pin.dataset.id;
    activePinMedia = mediaData?.[id];
    if (!activePinMedia || activePinMedia.length === 0) return;

    currentMediaIndex = 0;
    renderMedia();

    modal.classList.remove('hidden');
  });
});

// Galeri butonları tıklama olayları
prevBtn.addEventListener('click', () => {
  if (currentMediaIndex > 0) {
    currentMediaIndex--;
    renderMedia();
  }
});

nextBtn.addEventListener('click', () => {
  if (activePinMedia && currentMediaIndex < activePinMedia.length - 1) {
    currentMediaIndex++;
    renderMedia();
  }
});

// Modal kapatma
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
  mediaContainer.innerHTML = '';
});

// Modal dışına tıklayınca da kapat
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
    mediaContainer.innerHTML = '';
  }
});

// Klavyeden Esc ile kapatma
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    mediaContainer.innerHTML = '';
  }
});

// Şifre doğrulama
submitPasswordButton.addEventListener('click', () => {
    const enteredPassword = Array.from(pinInputs).map(input => input.value).join('');
    if (enteredPassword === correctPassword) {
        passwordScreen.classList.add('hidden');
        mapContainer.classList.remove('hidden'); // Harita kapsayıcısını görünür yap
        document.body.style.overflow = 'auto'; // Sayfa kaydırmayı etkinleştir
    } else {
        incorrectPasswordDiv.classList.remove('hidden');
        pinInputs.forEach(input => input.value = '');
        pinInputs.item(0).focus(); // İlk kutucuğa odaklan
    }
});

// Pin giriş kutucukları arasında otomatik geçiş (isteğe bağlı)
pinInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < pinInputs.length - 1) {
            pinInputs.item(index + 1).focus();
        }
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
            pinInputs.item(index - 1).focus();
        }
    });
});

// İlk pin kutucuğuna odaklan
pinInputs.item(0).focus();