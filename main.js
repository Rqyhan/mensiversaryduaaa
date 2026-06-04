// ============= DATA MOMEN ============= 
const momenData = [
    {
        title: "Awal dari segalannya",
        text: "Hari pertama kita bersama adalah awal dari cerita terindah dalam hidupku. yaa u tauuu sendirikann seberapaaa berhargaanya u di mataa i atauu bagii i, dan yaa awallpertemuann kitaa darii sebatas folow folowan berujung ke kisah cintaa abadii, hari hari bersaau membuat i merasaa bahagiaa bangett dann jugaasangatt senang akan kehadiran u di sisi i, terimakasih ya sudah mauu jadii pacarr i,  i tauu i bukann cowoo yangg u idamminn tapii i berusahaa jadii cowoo yang bisa buat u bahagiiaa samaa i 😊💖"
    },
    {
        title: "Tawa Bahagia",
        text: "Tawamu adalah musik terindah di telingaku.setiapp u tertawa ituu bikinn i tenangg, suaraa haluss lembut dann ramahh buat i nyamann teruss di sisi u, dan itu adalahh salah satu alasan i selaluu kangen sama u hikss, kapann mainnn woiokkk, ohh  iyyaaaa, sabtuu yaaa, yeyyy mainnn kangenn bangett soalnyaa berpaa harii atauu  minggu kita ga ketemmu, sekalii ketemuu itupunn ga asaling lirikk hikss, balik ke topikk tentang suaraa u yangg lembutt itu bikin i selaluu ingin ketemu u sangatt sangatttttttttttttttttttttttttt 😊💖"
    },
    {
        title: "Momen Spesial",
        text: "Di antara ribuan momen, ada beberapa yang terasa begitu istimewa. Momen-momen itu adalah kenangan yang kita jaga dengan sepenuh hati. Bersama bersama sama, setiap waktu menjadi istimewa dan tak terlupakan. selaluu bersamaa i yaa, jangann ada misskom atauu apaapunn ituu hikss 🌟✨"
    },
    {
        title: "Cinta yang Tulus",
        text: "Almira, cinta i ke u ituu cinta yang tulus dan ikhlas dari lubuk hati yang terdalam. u adalah alasan tersenyummya i di pagi hari dan doa pertama i di malam hari. Terima kasih telah menjadi bagian dari hidup i. 💗"
    },
    {
        title: "Selamanya Bersamamu",
        text: "i tidak tahu apa masa depan itu, tapi satu yang i tahu adalah i ingin menghadapinya bersama u selamanya. Setiap langkah bersama bareng u membuat hidup i terasa lebih lengkap dan bermakna. Selamanya untuk u almira aulia hasanah. 💝👑"
    }
];

const cardImages = ['card-1', 'card-2', 'card-3', 'card-4', 'card-5'];  
const cardImageUrls = [
    'almira1.jpg',
    'almira2.jpg',
    'almira3.jpg',
    'almira4.jpg',
    'almira5.jpg'
];
let currentActiveIndex = null;

// ============= CREATE PHOTOCARD ============= 
function createPhotocard(index) {
    const div = document.createElement('div');
    div.className = 'photocard';
    div.dataset.index = index;
    div.onclick = () => selectCard(index);
    
    const cardImage = document.createElement('div');
    cardImage.className = `card-image ${cardImages[index]}`;
    
    const image = document.createElement('img');
    image.src = new URL(cardImageUrls[index], document.baseURI).href;
    image.alt = `Foto momen ${index + 1}`;
    image.onerror = () => {
        console.warn('Image failed to load:', image.src);
    };
    cardImage.appendChild(image);
    
    const cardLabel = document.createElement('div');
    cardLabel.className = 'card-label';
    cardLabel.textContent = `Momen ${index + 1}`;
    
    div.appendChild(cardImage);
    div.appendChild(cardLabel);
    
    return div;
}

// ============= RENDER CARDS ============= 
function renderCards() {
    const activeArea = document.getElementById('active-card-area');
    const scrollArea = document.getElementById('inactive-cards-scroll');
    
    activeArea.innerHTML = '';
    scrollArea.innerHTML = '';
    
    for (let i = 0; i < momenData.length; i++) {
        const card = createPhotocard(i);
        
        if (i === currentActiveIndex) {
            activeArea.appendChild(card);
            card.classList.add('active');
        } else {
            // mark index for scroll-area use and append
            card.dataset.index = i;
            scrollArea.appendChild(card);
        }
    }
}

// ============= CARD SELECTION ============= 
function selectCard(index) {
    currentActiveIndex = index;
    renderCards();
    
    // Update description panel
    const data = momenData[index];
    const titleElement = document.getElementById('desc-title');
    const textElement = document.getElementById('desc-text');

    // Fade out animation
    const panel = document.querySelector('.description-panel');
    panel.style.opacity = '0';

    // Scroll active card into view inside the horizontal list
    const scrollWrapper = document.getElementById('inactive-cards-scroll');
    setTimeout(() => {
        const activeButton = scrollWrapper.querySelector(`.photocard[data-index="${index}"]`);
        if (activeButton) {
            activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }, 50);

    // Update content after fade out
    setTimeout(() => {
        titleElement.textContent = data.title;
        textElement.textContent = data.text;
        panel.style.opacity = '1';
    }, 150);
}

function navigateCard(direction) {
    if (currentActiveIndex === null) {
        selectCard(direction > 0 ? 0 : momenData.length - 1);
        return;
    }
    let nextIndex = currentActiveIndex + direction;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= momenData.length) nextIndex = momenData.length - 1;
    selectCard(nextIndex);
}

// ============= RESET CARDS ============= 
function resetCards() {
    currentActiveIndex = null;
    renderCards();

    const titleElement = document.getElementById('desc-title');
    const textElement = document.getElementById('desc-text');
    titleElement.textContent = 'Pilih momen untuk melihat ceritanya';
    textElement.textContent = 'Setiap momen bersama Almira adalah anugerah yang berharga bagiku. Klik salah satu momen untuk membaca ceritanya.';
}

// ============= PAGE NAVIGATION ============= 
function goToPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(`page${pageNumber}`);
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Reset description when going to page 1
        if (pageNumber === 1) {
            resetCards();
        } else if (pageNumber === 2) {
            // Initialize cards on page 2
            if (currentActiveIndex === null) {
                currentActiveIndex = 0;
            }
            renderCards();
        }
    }
}

// ============= KEYBOARD NAVIGATION ============= 
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && !document.getElementById('page1').classList.contains('active')) {
        // On page 2, navigate through cards with arrow keys
        if (currentActiveIndex !== null && currentActiveIndex < momenData.length - 1) {
            selectCard(currentActiveIndex + 1);
        }
    } else if (e.key === 'ArrowLeft' && !document.getElementById('page1').classList.contains('active')) {
        if (currentActiveIndex !== null && currentActiveIndex > 0) {
            selectCard(currentActiveIndex - 1);
        }
    }
});

// ============= INITIALIZATION ============= 
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Mensiversary website loaded successfully!');
});
