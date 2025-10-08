// HTML ELEMENTS
// Root element
const root = document.documentElement;

// Header navigation elements
const menuBar = document.querySelector('.menu-bar-container');
const topMenu= document.querySelector('.top-menu');
const headerNav = document.querySelector('.top-menu  .header-nav-container');
const rightSide = document.querySelector('.top-menu  .right-side');
const xMark= document.querySelector('.x-mark-container');

// Search box elements
const searchBox = document.querySelector('.search-box-container');
const searchIcon = document.querySelector('.search-icon');
const searchInp = document.querySelector('.search-box');

// Dark / Light mode elements
const modeBox = document.querySelector('.dark-light-mode-box');
const modeImg = document.querySelector('.mode-img');

// Filter bar elements
const filtersContainer = document.querySelector('.filters');





// VARIABLES
// To store the state of the dark / light mode
let lightMode;

// List to store the saved news posts
let newsCardList;





// FUNCTIONS
// Increase/decrease the height of the header during the scrolling
const changeHeight = () => {
        const headerContainer = document.querySelector('.header-container');

        if (window.innerWidth > 768) {
                if(window.scrollY > 100) {
                        headerContainer.style.height = '7.5rem'
                } else {
                        headerContainer.style.height = '9rem'
                }
        }
}


// Helper function to turn to the selected mode before
function applyMode() {
    if (lightMode) {
        // Light mode
        modeImg.src = '../img/light-mode.png';
        modeImg.style.transform = 'translateX(0)';
        root.style.setProperty('--bg-primary-color', '#f8f9fa');
        root.style.setProperty('--text-primary-color', '#555');
        root.style.setProperty('--news-card-bg', '#fff');
        root.style.setProperty('--news-card-border', '#eee');
        searchInp.style.color = '#555';
    } else {
        // Dark mode
        modeImg.src = '../img/dark-mode.png';
        modeImg.style.transform = 'translateX(-70%)';
        root.style.setProperty('--bg-primary-color', '#333');
        root.style.setProperty('--text-primary-color', '#f8f9fa');
        root.style.setProperty('--news-card-bg', '#444');
        root.style.setProperty('--news-card-border', '#555');
        searchInp.style.color = '#f8f9fa';
    }
}


// Show/Hide back to top button during the scrolling
const upButton = () => {
        const btn = document.querySelector('.link-to-top-btn');

        if(window.scrollY > 300) {
                // Show button
                btn.style.opacity = '0.6';
                btn.classList.add('up-btn-hovered');
        } else {
                // Hide button
                btn.style.opacity = '0';
                btn.classList.remove('up-btn-hovered');
        }
}


// Add News to Saved
export const saveNews = (newsCard, articleId) => {
        const imgUrl = newsCard.querySelector('img').src;
        const category = newsCard.querySelector('.metadata > p').textContent; 
        const link = newsCard.querySelector('.metadata > h6 > a').href;
        const title = newsCard.querySelector('.metadata > h6').textContent;
        const pubDate = newsCard.querySelector('.metadata > div').children[0].textContent;
        const sourceName = newsCard.querySelector('.metadata > div').children[1].textContent.split(' ').slice(2).join(' ');

        const newsDetails = [
                {'id': articleId},
                {'data': [imgUrl, category, link, title, pubDate, sourceName, articleId]}
        ];

        newsCardList.unshift(newsDetails);
        localStorage.setItem('newsCards', JSON.stringify(newsCardList));
        newsCardList = JSON.parse(localStorage.getItem('newsCards'));
}


// Remove news from saved
export const removeNews = (articleId) => {
        const savedNews = JSON.parse(localStorage.getItem('newsCards'));
        const newList = [];

        for (const card of savedNews) {
                if (card[0].id === articleId) {
                        console.log('continue');
                        continue;
                }

                newList.push(card); 
        }

        if (newList.length === 0) {
                newsCardList = [];
                localStorage.clear(); 
        } else {
                localStorage.setItem('newsCards', JSON.stringify(newList));
                newsCardList = JSON.parse(localStorage.getItem('newsCards'));
        }
}





// DEFAULT CONDITIONAL STATEMENTS
// Get saved mode, convert string to boolean
if (localStorage.getItem('lightMode') === null) {
    lightMode = true; // default
} else {
    lightMode = localStorage.getItem('lightMode') === 'true';
}


// To get the saved news posts from the localStorage, if it exists
if (!localStorage.getItem('newsCards')) {
        localStorage.setItem('newsCards', []);   
        newsCardList = [];
} else {
        newsCardList = JSON.parse(localStorage.getItem('newsCards'));
}





// DEFAULT FUNCTION CALLS
// Apply mode on load
applyMode();






// EVENTS
// Window events
/* Preloader before the webpage loads */
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500); // smooth fade out
});


// Change the height of the header during the scrolling
window.addEventListener('scroll', changeHeight);


// Show/Hide back to top button during the scrolling
window.addEventListener('scroll', upButton);


// Document events
// Close search when clicking outside
document.addEventListener('click', (e) => {    
        if (e.target.closest('.load-more-btn')) return;

        // Check if the click is NOT inside searchBox or searchIcon
        if (!searchBox.contains(e.target) && !searchIcon.contains(e.target)) {
                searchBox.classList.remove('opened-search');
        }
});


// Header navigation events
//   Show top menu
menuBar.addEventListener('click', () => {
        const searchBox = document.querySelector('.search-box');

        if (filtersContainer !== null) {
                filtersContainer.style.opacity = 0;
        }

        topMenu.classList.add('opened-top-menu')
        topMenu.style.transform = 'translateX(-2.6%)';
        xMark.style.display = 'block';
        searchBox.classList.add('opened-search');
        document.body.style.overflow = 'hidden';
        headerNav.style.transform = 'scale(1)';
        headerNav.style.opacity = '1';
        rightSide.style.transform = 'scale(1)';
        rightSide.style.opacity = '1';
})


//   Hide top menu
xMark.addEventListener('click', () => {

        if (filtersContainer !== null) {
                filtersContainer.style.opacity = 1;
        }

        topMenu.style.transform = 'translateX(-102.6%)';
        topMenu.classList.remove('opened-top-menu');
        xMark.style.display = 'none';
        document.body.style.overflow = 'auto';

        setTimeout(() => {
                headerNav.style.transform = 'scale(0.2)';
                headerNav.style.opacity = '0';
                rightSide.style.transform = 'scale(0.2)';
                rightSide.style.opacity = '0';
        }, 200);
})


// Mode box event
// Toggle on click
modeBox.addEventListener('click', () => {
    lightMode = !lightMode;
    localStorage.setItem('lightMode', lightMode);

    applyMode();
});