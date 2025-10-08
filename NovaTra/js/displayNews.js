// IMPORTING REQUIRED CODE SNIPPETS FROM OTHER JS FILES
import { removeNews, saveNews } from "../js/main.js";





// FUNCTION TO CREATE NEWS CARDS DYNAMICALLY DURING THE FETCH ACTION
export const createCard = (
    imgUrl, 
    category, 
    link, 
    title, 
    publicationDate, 
    sourceName, 
    articleId
) => {
    let iconClasses;
    let iconContainerClass;

    const loadMoreBtn = document.querySelector('.load-more-btn');
    const cardsContainer = document.querySelector('.news-cards-container'); 
    const cardElement = document.createElement('div');

    cardElement.setAttribute('class', 'news-card');
    cardElement.setAttribute('id',`id_${articleId}`);
    cardElement.classList.add('transition');
    cardsContainer.append(cardElement);

    if (imgUrl === null) {
        imgUrl = '../img/default-card-img.png';
    }

    if (!cardsContainer.parentElement.classList.contains('saved-news-container')) {
        iconClasses = 'fa-bookmark fa-regular';
        iconContainerClass = 'saved-icon-container';
    } else {
        iconClasses = 'fa-trash fa-solid';
        iconContainerClass = 'trash-icon-container';
    }

    cardElement.innerHTML = `<img src="${imgUrl}" alt="newsImg" loading="lazy" class="block f-width">                            
                        <div class="content">
                            <div class="metadata">
                                <p> ${category} </p>
                                <h6>
                                    <a href="${link}" target="_blank"> ${title} </a> 
                                </h6>
                                <div>
                                    <span> ${publicationDate} </span>
                                    <span> by ${sourceName} </span>
                                </div>
                            </div>
                        </div>
                        <div id="icon-container" class="${iconContainerClass} absolute flex flex-centered pointer transition">
                            <i class="${iconClasses} fa-2x white transition"></i>
                        </div>`

    const savedIcon = cardElement.querySelector('#icon-container');

    if (localStorage.getItem('newsCards')) {        
        if (JSON.parse(localStorage.getItem('newsCards')).length !== 0) {
            const savedCards = JSON.parse(localStorage.getItem('newsCards'));

            for (const card of savedCards) {
                if (card[0].id === `id_${articleId}`) {
                    savedIcon.querySelector('i').classList.remove('fa-regular')
                    savedIcon.querySelector('i').classList.add('fa-solid')
                }
            }
        }
    }

    savedIcon.addEventListener('click', () => {
        const icon = savedIcon.querySelector('i');
        const newsCard = icon.parentElement.parentElement;
        let cardId = icon.parentElement.parentElement.id;

        if (icon.classList.contains('fa-regular')) {
            saveNews(newsCard, cardId);
            icon.classList.add('fa-solid');
            icon.classList.remove('fa-regular');
        } else {
            icon.classList.add('fa-regular');
            icon.classList.remove('fa-solid');
            if (savedIcon.classList.contains('trash-icon-container')) {                
                newsCard.remove();
                cardId = cardId.substring(3);
            } 
            removeNews(cardId);
        }
    });

    if (cardsContainer.children.length < 40) {
        loadMoreBtn.parentElement.style.display = 'block';
    } else {
        loadMoreBtn.parentElement.style.display = 'none';
    }
}