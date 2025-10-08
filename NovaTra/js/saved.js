// IMPORTING REQUIRED CODE SNIPPETS FROM OTHER JS FILES
import { createCard } from "../js/displayNews.js";





// HTML ELEMENTS
// News cards container
const savedNewsContainer = document.querySelector('.saved-news-container > .news-cards-container');
const title = document.querySelector('.saved-news-container h3');

// Buttons
const loadMoreBtn = document.querySelector('.load-more-btn');





// VARIABLES
let savedNewsList;
let numOf_displayedNews = 0;
let numOf_undisplayedNews;





// FUNCTIONS
// Manage the display settings of the load more button
const manageLoadBtn = () => {    
    if (savedNewsContainer.children.length === 0  ||  savedNewsContainer.children.length === savedNewsList.length) {
        loadMoreBtn.parentElement.style.display = 'none';
    } else {
        loadMoreBtn.parentElement.style.display = 'block';
    }
}


// Display the saved news
const displaySavedNews = (firstIndex, lastIndex) => {
    for (const card of savedNewsList.slice(firstIndex, lastIndex)) {
        createCard(...card[1].data);
    }
    
    numOf_displayedNews += 12; 
    numOf_undisplayedNews -= 12;    
}


// Manage the title of saved news container
const manageTitle = () => {
    if (savedNewsContainer.children.length === 0) {
        title.textContent = 'No news here!';
    } else {
        title.textContent = 'Saved News';
    }
}





// DEFAULT CONDITIONAL STATEMENTS
// Get the saved news posts from the storage, if there is any saved news
if (localStorage.getItem('newsCards')) {
    savedNewsList = JSON.parse(localStorage.getItem('newsCards'));
    numOf_undisplayedNews = savedNewsList.length - 1;
}


// Display the saved news, if it exists
if (savedNewsList) {
    if (savedNewsList.length > 12) { 
        displaySavedNews(numOf_displayedNews, (numOf_displayedNews + 12))
    } else {
        for (const card of savedNewsList) {
            createCard(...card[1].data);
        }
    }
}





// DEFAULT FUNCTION CALLS
manageTitle();
manageLoadBtn();





// EVENTS
// Document events
document.addEventListener('click', () => {
    manageTitle();
    manageLoadBtn();
})


// Button events
loadMoreBtn.addEventListener('click', () => {
    if (numOf_undisplayedNews > 12) {
        displaySavedNews(numOf_displayedNews, (numOf_displayedNews + 12))
    } else {
        loadMoreBtn.style.display = 'none';
        displaySavedNews(numOf_displayedNews, savedNewsList.length);
    }
})