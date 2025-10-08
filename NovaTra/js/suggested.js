// IMPORTING REQUIRED CODE SNIPPETS FROM OTHER JS FILES
import { page , fetchNews } from "../js/fetch.js";





// HTML ELEMENTS
// Header navigation elements
const topMenu= document.querySelector('.top-menu');
const xMark= document.querySelector('.x-mark-container');

// Buttons
const loadMoreBtn = document.querySelector('.load-more-btn');

// Search box elements
const searchBox = document.querySelector('.search-box');
const searchInp = document.querySelector('.search-box');
const searchIcon = document.querySelector('.search-icon');

// News cards container
const suggestedNewsContainer = document.querySelector('.suggested-news-container > .news-cards-container');
const suggestedNewsTitle = document.querySelector('.suggested-news-container > .section-title');

// Filter bar elements
const filtersContainer = document.querySelector('.filters');





// VARIABLES
// To get the stored queries, filter results and saved news from the storage, if exist
let storedNewsCards = [];
let storedSearchItems = [];
let storedFilterItems = [];

// Click counters (to manage the "next page id" during the fetch)
let searchClickCount = 0;

// Fetch option (search, filter, etc.)
let fetchOption = false;

// To manage the state for fetching data
let displayOption;
let param;





// FUNCTIONS
// Get parameters of the saved news
const storedNewsParams = () => {
        let options = [];

        for (const card of storedNewsCards) {
                let category = card[1].data[1];
                options.push(category.trim());
        }

        let rand = Math.floor(Math.random() * (options.length - 1));
        let param = `&category=${options[rand]}`;
        
        return param;
}


// Get parameters of the search input
const storedSearchParams = () => {
        let options = storedSearchItems;

        let rand = Math.floor(Math.random() * (options.length - 1));
        let param = String(options[rand]);
        
        return param;
}


// Get parameters of the filter input
const storedFilterParams = () => {
        let options = storedFilterItems;

        let rand = Math.floor(Math.random() * (options.length - 1));
        let selectedFilterParams = options[rand];
        
        return selectedFilterParams;
}





// DEFAULT CONDITIONAL STATEMENTS
// Assign existing storage items to the declared lists, if they exist
try {
  const search = localStorage.getItem('inpValues');
  const filter = localStorage.getItem('filterValues');
  storedSearchItems = search ? JSON.parse(search) : [];
  storedFilterItems = filter ? JSON.parse(filter) : [];
} catch (e) {
  storedSearchItems = [];
  storedFilterItems = [];
}


// Fetch news related to stored search, filter values and saved news Post
// If any news was saved, fetch according to the saved news.
if (storedNewsCards.length !== 0) {
        param = storedNewsParams();
        fetchNews(8, [param], true, 'filter');
        displayOption = 'saved news';

} else if (storedSearchItems.length !== 0  &&  storedFilterItems.length !== 0) {
        // If any news wasn't saved, then fetch related to search values or filter values randomly
        if (Math.random() < 0.5) {
                param = storedSearchParams();
                fetchNews(8, [param], true, 'filter');
                displayOption = 'search values';
        } else {
                param = storedFilterParams();
                fetchNews(8, param, true, 'filter');
                displayOption = 'filter values';
        }
} else if ((storedSearchItems.length === 0 || !storedSearchItems)  &&  storedFilterItems.length !== 0) {
        param = storedFilterParams();
        fetchNews(8, param, true, 'filter');
        displayOption = 'filter values';
} else if ((storedFilterItems.length === 0 || !storedFilterItems)  &&  storedSearchItems.length !== 0) {
        param = storedSearchParams();
        fetchNews(8, [param], true, 'filter');
        displayOption = 'search values';
} else {
        // If neither of the input queries, filter values and saved news exist in the storage, then fetch by default
        fetchNews(8, false, false, false);
}


// Manage the display setting of the load more button
if (suggestedNewsContainer.children.length <= 16) {
    loadMoreBtn.parentElement.style.display = 'none';
}





// EVENTS
// Search events
searchInp.addEventListener('keypress', (e) => {
        fetchOption = 'search';

        if (searchClickCount === 0) {
                page.changedPageId(undefined);
        }

        searchClickCount++;

        if (e.key === 'Enter') {
                suggestedNewsContainer.innerHTML = '';

                fetchNews(8, false, false, fetchOption);

                if (window.innerWidth < 1200) {
                        if (filtersContainer !== null) {
                                filtersContainer.style.opacity = 1;
                        }

                        topMenu.style.transform = 'translateX(-102.6%)';
                        topMenu.classList.remove('opened-top-menu');
                        xMark.style.display = 'none';
                        document.body.style.overflow = 'auto';
                }
        }
        
        setTimeout(() => {
                if (suggestedNewsContainer.children.length === 0) {
                suggestedNewsTitle.textContent = 'Nothing matches your search.';
                } else {
                suggestedNewsTitle.textContent = 'You may want to read.';
                }
        }, 2000); // delay long enough for fetchNews to render results
})

searchIcon.addEventListener('click', (e) => {
        fetchOption = 'search';

        if (searchClickCount === 0) {
                page.changedPageId(undefined);
        }

        searchClickCount++;

        if (searchInp.value) {                
                suggestedNewsContainer.innerHTML = '';

                fetchNews(8, false, false, fetchOption);

                if (window.innerWidth < 1200) {
                        if (filtersContainer !== null) {
                                filtersContainer.style.opacity = 1;
                        }
                        topMenu.style.transform = 'translateX(-102.6%)';
                        topMenu.classList.remove('opened-top-menu');
                        xMark.style.display = 'none';
                        document.body.style.overflow = 'auto';
                }
        } else {
                if(!searchBox.value && window.innerWidth > 992) {
                        e.stopPropagation(); // prevent the document click from immediately closing it
                        searchBox.classList.toggle('opened-search');
                }
        }

        setTimeout(() => {
                if (suggestedNewsContainer.children.length === 0) {
                suggestedNewsTitle.textContent = 'Nothing matches your search.';
                } else {
                suggestedNewsTitle.textContent = 'You may want to read.';
                }
        }, 2000);
})


// Button events
loadMoreBtn.addEventListener('click', () => {
    if (page.id) {
        if (displayOption === 'filter values') {
                fetchNews(8, [param], true, 'filter');    
        } else if (displayOption === 'saved news'  ||  displayOption === 'search values') {
                fetchNews(8, param, true, 'filter');    
        } else {
                fetchNews(8, false, false, false);
        }
    } else {
        loadMoreBtn.disabled = true; // optional
        loadMoreBtn.style.display = 'none';
    }
});