// IMPORTING REQUIRED CODE SNIPPETS FROM OTHER JS FILES
import {createCard} from '../js/displayNews.js';





// VARIABLES
let counter = 1;
const displayedNews = new Set();

// Object to handle page ids of the the retrieved data
export const page = {
        id: undefined,
        changedPageId(nextPageId) {
                this.id = nextPageId;
        }
};





// FUNCTION TO CREATE NEWS CARDS FOR THE BANNER SLIDER IN THE HOMEPAGE
const createSliderCard = (imgUrl, category, link, title, publicationDate, sourceName, cardIndex) => {
    const container = document.querySelector('.slider-view  .cards');
    const currentCardElement = container.children[cardIndex];
    const cardImage = currentCardElement.querySelector('img.card-image');
    const cardCategory = currentCardElement.querySelector('p.category');
    const cardLink = currentCardElement.querySelector('a.card-link');
    const cardTitle = currentCardElement.querySelector('h6.news-title');
    const pubDate = currentCardElement.querySelector('span.publication-date');
    const source = currentCardElement.querySelector('span.creater');

    if (imgUrl === null) {
        imgUrl = '../img/default-card-img.png';
    }

    cardImage.src = imgUrl;
    cardCategory.textContent = category;
    cardLink.href = link;
    cardTitle.textContent = title;
    pubDate.textContent = publicationDate;
    source.textContent = sourceName;
}





// FUNCTION TO FETCH THE DATA FROM API
export const fetchNews = (
        size, 
        filterOptions = false, 
        sortingOption = false, 
        fetchType
) => {
        let query;

        // To store the search data (inputs) of the user to display relative news in the suggested page
        let inpValues;
        let filterValues;

        let link = `https://newsdata.io/api/1/latest?apikey=pub_e1cccdc48235436aabc537a2f0455c38&size=${size}`;
        const loader = document.querySelector('.loader');
        const searchInp = document.querySelector('.search-box');


        if (localStorage.getItem('inpValues')) {
                inpValues = JSON.parse(localStorage.getItem('inpValues'));
        } else {
                localStorage.setItem('inpValues', []);
                inpValues = [];
        }

        if (localStorage.getItem('filterValues')) {
                filterValues = JSON.parse(localStorage.getItem('filterValues'));
        } else {
                filterValues = [];
        }

        
        if (fetchType === 'search') {
                query = encodeURIComponent(searchInp.value.trim());

                if (page.id !== undefined) {                        
                        link = link.concat(`&page=${page.id}`)
                }

                link = link.concat(`&q=${query}`)

                // To add query values to the localStorage
                inpValues.unshift([`&q=${query}`]);
                localStorage.setItem('inpValues', JSON.stringify(inpValues))
                inpValues = [];
        } else if (filterOptions.length !== 0  &&  fetchType === 'filter') {
                searchInp.value = '';

                if (page.id !== undefined) {                        
                        link = link.concat(`&page=${page.id}`)
                }

                for (const option of filterOptions) {
                        link = link.concat(option);

                        // To add filter values to the localStorage
                        filterValues.unshift(filterOptions);
                }

                localStorage.setItem('filterValues', JSON.stringify(filterValues));

                filterValues = [];

        } else {
                searchInp.value = '';

                if (page.id !== undefined) {                        
                    link = link.concat(`&page=${page.id}`)
                }
        }

        console.log("Link: " + link);

        loader.classList.remove('hidden');

        fetch(link)
        .then(response => response.json())
        .then(data => {
                const loadMoreBtn = document.querySelector('.load-more-btn');
                let newsList = data.results;
                
                if (data.nextPage !== null) {
                        page.changedPageId(data.nextPage)
                } else {
                        page.changedPageId(undefined)
                }

                if (size === 5) {
                        for (const i in newsList) {
                                displayedNews.add(newsList[i].article_id) // mark as displayed

                                createSliderCard(
                                        newsList[i].image_url, 
                                        newsList[i].category[0], 
                                        newsList[i].link, 
                                        newsList[i].title, 
                                        newsList[i].pubDate.split(' ')[0], 
                                        newsList[i].source_name, i
                                )
                        }

                        sessionStorage.setItem(`bannerNewsCards`, JSON.stringify(newsList));

                } else {
                        loader.classList.remove('hidden');

                        if (sortingOption === true) {
                                newsList = newsList.sort((news1, news2) => news2.source_priority - news1.source_priority);
                        }

                        for (const news of newsList) {
                                // Skip duplicate news
                                if (displayedNews.has(news.article_id)) {
                                        continue;
                                } else {
                                        displayedNews.add(news.article_id) // mark as displayed

                                        createCard(
                                                news.image_url, 
                                                news.category[0], 
                                                news.link, 
                                                news.title, 
                                                news.pubDate.split(' ')[0], 
                                                news.source_name, 
                                                news.article_id
                                        );
                                }

                                sessionStorage.setItem(`news_list${counter}`, JSON.stringify(newsList));
                                counter++;
                        }
                }

                if (page.id === null) {
                    loadMoreBtn.style.display = 'none'
                } else {
                    loadMoreBtn.style.display = 'block'
                }
        })
        .catch(err => {
                const bannerNewsList = JSON.parse(sessionStorage.getItem(`bannerNewsCards`));
                const list = JSON.parse(sessionStorage.getItem(`news_list${counter}`));

                console.log(err);
                
                // When the error appears, load the news details from the sessionStorage and display news cards
                if (list) {
                        if (size === 5) {
                                for (const i in bannerNewsList) {
                                        createSliderCard(
                                                bannerNewsList[i].image_url, 
                                                bannerNewsList[i].category[0], 
                                                bannerNewsList[i].link, 
                                                bannerNewsList[i].title, 
                                                bannerNewsList[i].pubDate.split(' ')[0], 
                                                bannerNewsList[i].source_name, i
                                        )
                                }
                        } else {                               
                                for (const news of list) {
                                        createCard(
                                                news.image_url, 
                                                news.category[0], 
                                                news.link, 
                                                news.title, 
                                                news.pubDate.split(' ')[0], 
                                                news.source_name, 
                                                news.article_id
                                        )   
                                }
                        }
                }
        })

        .finally(() => {
                loader.classList.add('hidden');
        })
}