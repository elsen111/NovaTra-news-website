// IMPORTING REQUIRED CODE SNIPPETS FROM OTHER JS FILES
import {fetchNews, page} from '../js/fetch.js';





// HTML ELEMENTS
// Header navbar
const topMenu= document.querySelector('.top-menu');
const xMark= document.querySelector('.x-mark-container');


// Search box elements
const searchInp = document.querySelector('.search-box');
const searchIcon = document.querySelector('.search-icon');

// Banner slider elements
const prevBtn = document.querySelector('.slider-icon-left');
const nextBtn = document.querySelector('.slider-icon-right');
const sliderCardsContainer = document.querySelector('.cards');

// News cards container
const latestNewsContainer = document.querySelector('.latest-news-container > .news-cards-container');
const latestNewsTitle = document.querySelector('.latest-news-container > .section-title');

// Buttons
const loadMoreBtn = document.querySelector('.load-more-btn');





// VARIABLES
// Click counters (to manage the "next page id" during the fetch)
let searchClickCount = 0;

// Fetch option (search, filter, etc.)
let fetchOption = false;





// FUNCTIONS
// Go to the next slide
const nextSlide = () => {
        const firstElement = sliderCardsContainer.children[0];
        let copy = firstElement.cloneNode(true);
        sliderCardsContainer.appendChild(copy);
        firstElement.remove();
}

// Go to the previous slide
const prevSlide = () => {
        const lastElementIndex = sliderCardsContainer.children.length - 1;
        const lastElement = sliderCardsContainer.children[lastElementIndex];
        let copy = lastElement.cloneNode(true);
        sliderCardsContainer.insertBefore(copy, sliderCardsContainer.children[0]);
        lastElement.remove();
}

// Update the content of the section title according to search result
export const updateLatestNewsTitle = () => {
    if (latestNewsContainer.children.length === 0) {
        latestNewsTitle.textContent = 'Nothing matches your search.';
        loadMoreBtn.style.display = 'none';
} else {
        latestNewsTitle.textContent = 'Latest news';
        loadMoreBtn.style.display = 'block';
    }
};





// DEFAULT FUNCTION CALLS
// Change to the next slide continously
setInterval(nextSlide, 8000);

// Fetch the data for news section
fetchNews(8, false, false, false);





// EVENTS
// Window event
// To retrieve latest news for Banner slider when the website completing the loading
window.addEventListener('load', () => {
        fetchNews(5);
})


// Search events
searchInp.addEventListener('keypress', (e) => {
        fetchOption = 'search';

        if (searchClickCount === 0) {
                page.changedPageId(undefined);
        }

        searchClickCount++;

        if (e.key === 'Enter') {
                latestNewsContainer.innerHTML = '';

                fetchNews(8, false, false, fetchOption);

                if (window.innerWidth < 1200) {
                        topMenu.style.transform = 'translateX(-102.6%)';
                        topMenu.classList.remove('opened-top-menu');
                        xMark.style.display = 'none';
                        document.body.style.overflow = 'auto';
                }
        }
        
        setTimeout(() => { updateLatestNewsTitle() }, 2000); // delay long enough for fetchNews to render results

})

searchIcon.addEventListener('click', (e) => {
        fetchOption = 'search';

        if (searchClickCount === 0) {
                page.changedPageId(undefined);
        }

        searchClickCount++;

        if (searchInp.value) {                
                latestNewsContainer.innerHTML = '';

                fetchNews(8, false, false, fetchOption);

                if (window.innerWidth < 1200) {
                        topMenu.style.transform = 'translateX(-102.6%)';
                        topMenu.classList.remove('opened-top-menu');
                        xMark.style.display = 'none';
                        document.body.style.overflow = 'auto';
                }
        } else {
                if(window.innerWidth > 992) {
                        if (searchInp.classList.contains('opened-search')) {
                                searchInp.focus();
                        }

                        searchInp.classList.toggle('opened-search');

                        e.stopPropagation(); // prevent the document click from immediately closing it
                }
        }

        setTimeout(() => { updateLatestNewsTitle() }, 2000); // delay long enough for fetchNews to render results
})


// Slider events
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);


// Button events - load more button
loadMoreBtn.addEventListener('click', () => {
    if (page.id) {
        if (fetchOption === 'search') {
            fetchNews(8, false, false, fetchOption);    
        } else if (fetchOption === 'filter') {
            fetchNews(8, selectedOptions, false, 'filter');
        } else {
            fetchNews(8, false, false, fetchOption);
        }
    } else {
        loadMoreBtn.disabled = true; // optional
        loadMoreBtn.style.display = 'none';
    }
});