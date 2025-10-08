// IMPORTING REQUIRED CODE SNIPPETS FROM OTHER JS FILES
import { page , fetchNews } from "../js/fetch.js";





// HTML ELEMENTS
// Header navbar
const topMenu= document.querySelector('.top-menu');
const xMark= document.querySelector('.x-mark-container');


// Filter bar elements
const asideContainer = document.querySelector('.filters')
const filterBar = document.querySelector('.filters-menu-icon');
const filterItemsContainer = document.querySelector('.filter-items');
const breakingNewsContainer = document.querySelector('.breaking-news-container > .news-cards-container');
const countryInput = document.querySelector('.country-input');
const languageInput = document.querySelector('.language-input');
const countryFilterBox = document.querySelector('.country-filter  .search-values-container')
const languageFilterBox = document.querySelector('.language-filter  .search-values-container')

// News cards container
const breakingNewsTitle = document.querySelector('.breaking-news-container > .section-title');

// Search box elements
const searchBox = document.querySelector('.search-box');
const searchInp = document.querySelector('.search-box');
const searchIcon = document.querySelector('.search-icon');

// Category menu elements
const categoryMenuItems = document.querySelectorAll('.category-menu-list > li');

// Buttons
const submitBtn = document.querySelector(`.filters  input[type='submit']`);
const loadMoreBtn = document.querySelector('.load-more-btn');





// VARIABLES
// Click counters (to manage the "next page id" during the fetch)
let searchClickCount = 0;
let filterClickCount = 0;
let navClickCount = 0;

// Fetch option (search, filter, etc.)
let fetchOption = false;

// List to contain parameters to add to the fetchNews function
let selectedOptions = [];





// LISTS
// Country list
const countries = [
    {name: 'UNITED STATES', code: 'us'},
    {name: 'UNITED KINGDOM', code: 'gb'},
    {name: 'UNITED ARAB EMIRATES', code: 'ae'},
    {name: 'AFGHANISTAN', code: 'af'},
    {name: 'ALBANIA', code: 'al'},
    {name: 'ALGERIA', code: 'dz'},
    {name: 'AMERICAN SAMOA', code: 'as'},
    {name: 'ANDORRA', code: 'ad'},
    {name: 'ANGOLA', code: 'ao'},
    {name: 'ANGUILLA', code: 'ai'},
    {name: 'ANTARCTICA', code: 'aq'},
    {name: 'ANTIGUA AND BARBUDA', code: 'ag'},
    {name: 'ARGENTINA', code: 'ar'},
    {name: 'ARGENTINA', code: 'ar'},
    {name: 'ARMENIA', code: 'am'},
    {name: 'ARMENIA', code: 'am'},
    {name: 'ARUBA', code: 'aw'},
    {name: 'AUSTRALIA', code: 'au'},
    {name: 'AUSTRIA', code: 'at'},
    {name: 'AZERBAIJAN', code: 'az'},
    {name: 'BAHAMAS', code: 'bs'},
    {name: 'BAHRAIN', code: 'bh'},
    {name: 'BANGLADESH', code: 'bd'},
    {name: 'BARBADOS', code: 'bb'},
    {name: 'BELARUS', code: 'by'},
    {name: 'BELGIUM', code: 'be'},
    {name: 'BELIZE', code: 'bz'},
    {name: 'BENIN', code: 'bj'},
    {name: 'BERMUDA', code: 'bm'},
    {name: 'BHUTAN', code: 'bt'},
    {name: 'BOLIVIA', code: 'bo'},
    {name: 'BOSNIA AND HERZEGOVINA', code: 'ba'},
    {name: 'BOTSWANA', code: 'bw'},
    {name: 'BOUVET ISLAND', code: 'bv'},
    {name: 'BRAZIL', code: 'br'},
    {name: 'BRITISH INDIAN OCEAN TERRITORY', code: 'io'},
    {name: 'BRUNEI DARUSSALAM', code: 'bn'},
    {name: 'BULGARIA', code: 'bg'},
    {name: 'BRUNEI', code: 'bn'},
    {name: 'BURKINA FASCO', code: 'bf'},
    {name: 'BURUNDI', code: 'bi'},
    {name: 'CAMBODIA', code: 'kh'},
    {name: 'CAMEROON', code: 'cm'},
    {name: 'CANADA', code: 'ca'},
    {name: 'CAPE VERDE', code: 'cv'},
    {name: 'CAYMAN ISLANDS', code: 'ky'},
    {name: 'CENTRAL AFRICAN REPUBLIC', code: 'cf'},
    {name: 'CHAD', code: 'td'},
    {name: 'CHILE', code: 'cl'},
    {name: 'CHINA', code: 'cn'},
    {name: 'CHRISTMAS ISLAND', code: 'cx'},
    {name: 'COLOMBIA', code: 'co'},
    {name: 'COMOROS', code: 'km'},
    {name: 'CONGO', code: 'cg'},
    {name: 'COOK ISLANDS', code: 'ck'},
    {name: 'COSTA RICA', code: 'cr'},
    {name: 'DR CONGO', code: 'cd'},
    {name: 'COTE D IVOIRE', code: 'ci'},
    {name: 'IVORY COAST', code: 'ci'},
    {name: 'CROATIA', code: 'hr'},
    {name: 'JERSEY', code: 'je'},
    {name: 'CUBA', code: 'je'},
    {name: 'CYPRUS', code: 'cy'},
    {name: 'CURAÇAO', code: 'cw'},
    {name: 'CZECH REPUBLIC', code: 'cu'},
    {name: 'DENMARK', code: 'dk'},
    {name: 'DJIBOUTI', code: 'dj'},
    {name: 'DOMINICA', code: 'dm'},
    {name: 'DOMINICAN REPUBLIC', code: 'do'},
    {name: 'EAST TIMOR', code: 'tp'},
    {name: 'ECUADOR', code: 'ec'},
    {name: 'EGYPT', code: 'eg'},
    {name: 'EL SALVADOR', code: 'sv'},
    {name: 'EQUATORIAL GUINEA', code: 'gq'},
    {name: 'ERITREA', code: 'er'},
    {name: 'ESTONIA', code: 'ee'},
    {name: 'ETHIOPIA', code: 'et'},
    {name: 'FALK', code: 'fk'},
    {name: 'FAROE ISLANDS', code: 'fo'},
    {name: 'FIJI', code: 'fj'},
    {name: 'FINLAND', code: 'fi'},
    {name: 'FRANCE', code: 'fr'},
    {name: 'FRENCH GUIANA', code: 'eegf'},
    {name: 'FRENCH POLYNESIA', code: 'pf'},
    {name: 'FRENCH SOUTHERN TERRITORIES', code: 'tf'},
    {name: 'GABON', code: 'ga'},
    {name: 'GAMBIA', code: 'gm'},
    {name: 'GEORGIA', code: 'ge'},
    {name: 'GERMANY', code: 'de'},
    {name: 'GHANA', code: 'gh'},
    {name: 'GIBRALTAR', code: 'gi'},
    {name: 'GREECE', code: 'gr'},
    {name: 'GREENLAND', code: 'gl'},
    {name: 'GRENADA', code: 'gd'},
    {name: 'GUADELOUPE', code: 'gp'},
    {name: 'GUAM', code: 'gu'},
    {name: 'GUATEMALA', code: 'gt'},
    {name: 'GUINEA', code: 'gn'},
    {name: 'GUINEA-BISSAU', code: 'gw'},
    {name: 'GUYANA', code: 'gy'},
    {name: 'HAITI', code: 'ht'},
    {name: 'HEARD ISLAND AND MCDONALD ISLANDS', code: 'hm'},
    {name: 'HOLY', code: 'va'},
    {name: 'VATICAN', code: 'va'},
    {name: 'HONDURAS', code: 'hn'},
    {name: 'TIMOR', code: 'tl'},
    {name: 'TIMOR LESTE', code: 'tl'},
    {name: 'HONG KONG', code: 'hk'},
    {name: 'HUNGARY', code: 'hu'},
    {name: 'ICELAND', code: 'is'},
    {name: 'INDIA', code: 'in'},
    {name: 'INDONESIA', code: 'id'},
    {name: 'IRAN', code: 'ir'},
    {name: 'IRAQ', code: 'iq'},
    {name: 'IRELAND', code: 'ie'},
    {name: 'ISRAEL', code: 'il'},
    {name: 'ITALY', code: 'it'},
    {name: 'JAMAICA', code: 'jm'},
    {name: 'JAPAN', code: 'jp'},
    {name: 'JORDAN', code: 'jo'},
    {name: 'KAZAKHSTAN', code: 'kz'},
    {name: 'KENYA', code: 'ke'},
    {name: 'KIRIBATI', code: 'ki'},
    {name: 'KOSOVO', code: 'xk'},
    {name: 'KOREA DEMOCRATIC PEOPLES REPUBLIC', code: 'kp'},
    {name: 'KOREA REPUBLIC', code: 'kr'},
    {name: 'KUWAIT', code: 'kw'},
    {name: 'NORTH KOREA', code: 'kp'},
    {name: 'SOUTH KOREA', code: 'kr'},
    {name: 'KYRGYZSTAN', code: 'kg'},
    {name: 'LAO PEOPLES DEMOCRATIC REPUBLIC', code: 'la'},
    {name: 'LATVIA', code: 'lv'},
    {name: 'LAOS', code: 'la'},
    {name: 'LEBANON', code: 'lb'},
    {name: 'LESOTHO', code: 'ls'},
    {name: 'LIBERIA', code: 'lr'},
    {name: 'LIBYAN ARAB JAMAHIRIYA', code: 'ly'},
    {name: 'LIECHTENSTEIN', code: 'li'},
    {name: 'LIBYA', code: 'ly'},
    {name: 'LITHUANIA', code: 'lt'},
    {name: 'LUXEMBOURG', code: 'lu'},
    {name: 'MACAU', code: 'mo'},
    {name: 'MACEDONIA', code: 'mk'},
    {name: 'MADAGASCAR', code: 'mg'},
    {name: 'MALAWI', code: 'mw'},
    {name: 'MALAYSIA', code: 'my'},
    {name: 'MALDIVES', code: 'mv'},
    {name: 'MALI', code: 'ml'},
    {name: 'MALTA', code: 'mt'},
    {name: 'MARSHALL ISLANDS', code: 'mh'},
    {name: 'MARTINIQUE', code: 'mq'},
    {name: 'MAURITANIA', code: 'mr'},
    {name: 'MAURITIUS', code: 'mu'},
    {name: 'MAYOTTE', code: 'yt'},
    {name: 'MEXICO', code: 'mx'},
    {name: 'MICRONESIA', code: 'fm'},
    {name: 'MOLDOVA', code: 'md'},
    {name: 'MONACO', code: 'mc'},
    {name: 'MONGOLIA', code: 'mn'},
    {name: 'MONTSERRAT', code: 'ms'},
    {name: 'MOROCCO', code: 'ma'},
    {name: 'MOZAMBIQUE', code: 'mz'},
    {name: 'MYANMAR', code: 'mm'},
    {name: 'MONTENEGRO', code: 'me'},
    {name: 'NAMIBIA', code: 'na'},
    {name: 'NAURU', code: 'nr'},
    {name: 'NEPAL', code: 'np'},
    {name: 'NETHERLAND', code: 'nl'},
    {name: 'NETHERLAND ANTILLES', code: 'an'},
    {name: 'NEW CALEDONIA', code: 'nc'},
    {name: 'NEW ZEALAND', code: 'nz'},
    {name: 'NICARAGUA', code: 'ni'},
    {name: 'NIGER', code: 'ne'},
    {name: 'NIGERIA', code: 'ng'},
    {name: 'NIUE', code: 'nu'},
    {name: 'NORFOLK ISLAND', code: 'nf'},
    {name: 'NORTHERN MARIANA ISLANDS', code: 'mp'},
    {name: 'NORWAY', code: 'no'},
    {name: 'OMAN', code: 'om'},
    {name: 'PAKISTAN', code: 'pk'},
    {name: 'PALAU', code: 'pw'},
    {name: 'PALESTINE', code: 'ps'},
    {name: 'PANAMA', code: 'pa'},
    {name: 'PAPUA NEW GUINEA', code: 'pg'},
    {name: 'PARAGUAY', code: 'py'},
    {name: 'PERU', code: 'pe'},
    {name: 'PHILIPPINES', code: 'ph'},
    {name: 'PITCAIRN', code: 'pn'},
    {name: 'POLAND', code: 'pl'},
    {name: 'PORTUGAL', code: 'pt'},
    {name: 'PUERTO RICO', code: 'pr'},
    {name: 'QATAR', code: 'qa'},
    {name: 'REUNION', code: 're'},
    {name: 'ROMANIA', code: 'ro'},
    {name: 'RUSSIA', code: 'ru'},
    {name: 'RWANDA', code: 'rw'},
    {name: 'SAINT HELENA', code: 'sh'},
    {name: 'SAINT KITTS AND NEVIS', code: 'kn'},
    {name: 'SAINT LUCIA', code: 'lc'},
    {name: 'SAINT PIERRE AND MIQUELON', code: 'pm'},
    {name: 'SAINT VINCENT AND THE GRENADINES', code: 'vc'},
    {name: 'SAMOA', code: 'ws'},
    {name: 'SAN MARINO', code: 'sm'},
    {name: 'SAO TOME AND PRINCIPE', code: 'st'},
    {name: 'SAUDI  ARABIA', code: 'sa'},
    {name: 'SENEGAL', code: 'sn'},
    {name: 'SEYCHELLES', code: 'sc'},
    {name: 'SIERRA LEONE', code: 'sl'},
    {name: 'SINGAPORE', code: 'sg'},
    {name: 'SLOVAKIA', code: 'sk'},
    {name: 'SLOVENIA', code: 'si'},
    {name: 'SOLOMON ISLANDS', code: 'sb'},
    {name: 'SOMALIA', code: 'so'},
    {name: 'SOUTH AFRICA', code: 'za'},
    {name: 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', code: 'gs'},
    {name: 'SPAIN', code: 'es'},
    {name: 'SRI LANKA', code: 'lk'},
    {name: 'SUDAN', code: 'sd'},
    {name: 'SURINAME', code: 'sr'},
    {name: 'SVALBARD AND JAN MAYEN', code: 'sj'},
    {name: 'SWAZILAND', code: 'sz'},
    {name: 'ESWATINI', code: 'sz'},
    {name: 'SWEDEN', code: 'se'},
    {name: 'SWITZERLAND', code: 'ch'},
    {name: 'SYRIAN ARAB REPUBLIC', code: 'sy'},
    {name: 'SYRIA', code: 'sy'},
    {name: 'TAIWAN, PROVINCE OF CHINA', code: 'tw'},
    {name: 'TAJIKISTAN', code: 'tj'},
    {name: 'TANZANIA', code: 'tz'},
    {name: 'THAILAND', code: 'th'},
    {name: 'TOGO', code: 'tg'},
    {name: 'TOKELAU', code: 'tk'},
    {name: 'TONGA', code: 'to'},
    {name: 'TAIWAN	', code: 'tw'},
    {name: 'TRINIDAD AND TOBAGO', code: 'tt'},
    {name: 'TUNISIA', code: 'tn'},
    {name: 'TURKEY', code: 'tr'},
    {name: 'TURKMENISTAN', code: 'tm'},
    {name: 'TURKS AND CAICOS ISLANDS', code: 'tc'},
    {name: 'TUVALU', code: 'tv'},
    {name: 'UGANDA', code: 'ug'},
    {name: 'UKRAINE', code: 'ua'},
    {name: 'UNITED STATES OF AMERICA', code: 'us'},
    {name: 'URUGUAY', code: 'uy'},
    {name: 'UZBEKISTAN', code: 'uz'},
    {name: 'VANUATU', code: 'vu'},
    {name: 'VENEZUELA', code: 've'},
    {name: 'VIETNAM', code: 'vn'},
    {name: 'VIRGIN ISLANDS, BRITISH', code: 'vg'},
    {name: 'VIRGIN ISLANDS, U.S.', code: 'vi'},
    {name: 'WALLIS AND FUTUNA', code: 'wf'},
    {name: 'WESTERN SAHARA', code: 'eh'},
    {name: 'YEMEN', code: 'ye'},
    {name: 'YUGOSLAVIA', code: 'yu'},
    {name: 'ZAMBIA', code: 'zm'},
    {name: 'ZIMBABWE', code: 'zw'},
    {name: 'SERBIA', code: 'rs'},
    {name: 'SAINT MARTIN(DUTCH)', code: 'sx'},
    {name: 'WORLD', code: 'wo'}
];

// Language list
const languages = [
    {name: 'Afrikaans', code: 'af'},
    {name: 'Albanian', code: 'sq'},
    {name: 'Amharic', code: 'am'},
    {name: 'Arabic', code: 'ar'},
    {name: 'Armenian', code: 'hy'},
    {name: 'Assamese', code: 'as'},
    {name: 'Azerbaijani', code: 'az'},
    {name: 'Bambara', code: 'bm'},
    {name: 'Basque', code: 'eu'},
    {name: 'Belarusian', code: 'be'},
    {name: 'Bengali', code: 'bn'},
    {name: 'Bosnian', code: 'bs'},
    {name: 'Bulgarian', code: 'bg'},
    {name: 'Burmese', code: 'my'},
    {name: 'Catalan', code: 'ca'},
    {name: 'Central Kurdish', code: 'ckb'},
    {name: 'Chinese', code: 'zh'},
    {name: 'Croatian', code: 'hr'},
    {name: 'Czech', code: 'cs'},
    {name: 'Danish', code: 'da'},
    {name: 'Dutch', code: 'nl'},
    {name: 'English', code: 'en'},
    {name: 'Estonian', code: 'et'},
    {name: 'Filipino', code: 'pi'},
    {name: 'Finnish', code: 'fi'},
    {name: 'French', code: 'fr'},
    {name: 'Galician', code: 'gl'},
    {name: 'German', code: 'de'},
    {name: 'Greek', code: 'el'},
    {name: 'Gujarati', code: 'gu'},
    {name: 'Hausa', code: 'ha'},
    {name: 'Hebrew', code: 'he'},
    {name: 'Hindi', code: 'hi'},
    {name: 'Hungarian', code: 'hu'},
    {name: 'Icelandic', code: 'is'},
    {name: 'Indonesian', code: 'id'},
    {name: 'Italian', code: 'it'},
    {name: 'Japanese', code: 'jp'},
    {name: 'Kannada', code: 'kn'},
    {name: 'Kazakh', code: 'kz'},
    {name: 'Khmer', code: 'kh'},
    {name: 'Kinyarwanda', code: 'rw'},
    {name: 'Korean', code: 'ko'},
    {name: 'Kurdish', code: 'ku'},
    {name: 'Latvian', code: 'lv'},
    {name: 'Lithuanian', code: 'lt'},
    {name: 'Luxembourgish', code: 'lb'},
    {name: 'Macedonian', code: 'mk'},
    {name: 'Malay', code: 'ms'},
    {name: 'Malayalam', code: 'ml'},
    {name: 'Maltese', code: 'mt'},
    {name: 'Maori', code: 'mi'},
    {name: 'Marathi', code: 'mr'},
    {name: 'Mongolian', code: 'mn'},
    {name: 'Nepali', code: 'ne'},
    {name: 'Norwegian', code: 'no'},
    {name: 'Oriya', code: 'or'},
    {name: 'Pashto', code: 'ps'},
    {name: 'Persian', code: 'fa'},
    {name: 'Polish', code: 'pl'},
    {name: 'Portuguese', code: 'pt'},
    {name: 'Punjabi', code: 'pa'},
    {name: 'Romanian', code: 'ro'},
    {name: 'Russian', code: 'ru'},
    {name: 'Samoan', code: 'sm'},
    {name: 'Serbian', code: 'sr'},
    {name: 'Shona', code: 'sn'},
    {name: 'Sindhi', code: 'sd'},
    {name: 'Sinhala', code: 'si'},
    {name: 'Slovak', code: 'sk'},
    {name: 'Slovenian', code: 'sl'},
    {name: 'Somali', code: 'so'},
    {name: 'Spanish', code: 'es'},
    {name: 'Swahili', code: 'sw'},
    {name: 'Swedish', code: 'sv'},
    {name: 'Tajik', code: 'tg'},
    {name: 'Tamil', code: 'ta'},
    {name: 'Telugu', code: 'te'},
    {name: 'Thai', code: 'th'},
    {name: 'Traditional Chinese', code: 'zht'},
    {name: 'Turkish', code: 'tr'},
    {name: 'Turkmen', code: 'tk'},
    {name: 'Ukrainian', code: 'uk'},
    {name: 'Urdu', code: 'ur'},
    {name: 'Uzbek', code: 'uz'},
    {name: 'Vietnamese', code: 'vi'},
    {name: 'Welsh', code: 'cy'},
    {name: 'Zulu', code: 'zu'}
];





// FUNCTIONS
// Rendering found list elements in the country/language dropdown menu
const renderElement = (filteredList, parentElement) => {
    filteredList.forEach(element => {
        const newElement = document.createElement('p');
        parentElement.append(newElement);
        newElement.setAttribute('class', 'search-value fs-16 pointer transition');
        newElement.textContent = element.name;
    })
}


// Functions to get filter values/parameters in order to fetch relative data from the API.
// Get selected category
const getCategory = () => {
    const selectedCategory = document.querySelector('.category-filter >  select').value;

    if (selectedCategory !== 'null') {
        return `&category=${selectedCategory}`
    } else {
        return false;
    }
}

// Get selected time interval
const getTimeInterval = () => {
    const selectedTimeValue = document.querySelector('.time-filter > select').value;
    const time = new Date();
    const currentYear = time.getFullYear();
    const currentMonth = time.getMonth();
    const currentDate = time.getDate();
    const currentTime = `${currentYear}-${currentMonth + 1}-${currentDate}`;
    let selectedTimeOption;
    let selectedTime;
    let selectedTimeInterval;

    switch (selectedTimeValue) {
        case 'last-hour':
        case 'last-day':
            selectedTimeOption = new Date(currentYear, currentMonth, currentDate - 1);
            break;

        case 'last-week':
            selectedTimeOption = new Date(currentYear, currentMonth, currentDate - 7);
            break;

        case 'last-month':
            selectedTimeOption = new Date(currentYear, currentMonth - 1, currentDate);
            break;

        case 'last-year':
            selectedTimeOption = new Date(currentYear - 1, currentMonth, currentDate - 7);
            break;
    
        default:
            selectedTimeOption = false;
            break;
    }

    if (selectedTimeOption) {
        let selectedTimeYear = selectedTimeOption.getFullYear();
        let selectedTimeMonth = selectedTimeOption.getMonth();
        let selectedTimeDate = selectedTimeOption.getDate();

        selectedTime = `${selectedTimeYear}-${selectedTimeMonth+1}-${selectedTimeDate}`;
        selectedTimeInterval = `&from_date=${selectedTime}&to_date=${currentTime}`
    } else {
        selectedTimeInterval = false;
    }

    return false;
}


// Get selected sorting option
const getSortingOption = () => {
    let sortingOption = document.querySelector('.sorting-filter > select').value;
    let selectedSorting;

    if (sortingOption === 'by-default' ) {
        selectedSorting = false;
    } else {
        selectedSorting = true
    }

    return selectedSorting;
}


// Get selected country
const getCountryCode = () => {
    const selectedCountry = document.querySelector('.country-filter >  input').value;

    if (selectedCountry) {        
        for (const country of countries) {
            if (country.name === selectedCountry) {
                return `&country=${country.code}`;
            }
        }
    } else {
        return false;
    }
}

// Get selected language
const getLanguageCode = () => {
    const selectedLanguage = document.querySelector('.language-filter >  input').value;

    if (selectedLanguage) {
        for (const language of languages) {
            if (language.name === selectedLanguage) {
                return `&language=${language.code}`;
            }
        }
    } else {
        return false;
    }
}





// DEFAULT FUNCTION CALLS
fetchNews(8, false, false, false);





// EVENTS
// Document events
document.addEventListener('click', (e) => {
    if (!countryFilterBox.contains(e.target)) {
        countryFilterBox.innerHTML = '';
        countryFilterBox.style.border = 'none'
    }
})

document.addEventListener('click', (e) => {
    if (!languageFilterBox.contains(e.target)) {
        languageFilterBox.innerHTML = '';
        languageFilterBox.style.border = 'none'
    }
})

document.addEventListener('click', (e) => {
    if (!filterItemsContainer.contains(e.target) && !filterBar.contains(e.target) && !countryFilterBox.contains(e.target)) {
        filterItemsContainer.classList.remove('visible-filter-items');
    }
})

document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target)) {
        searchBox.classList.remove('opened-search');
    }
});


// Search events
searchInp.addEventListener('keypress', (e) => {
    navClickCount = 0;
    filterClickCount = 0;
    fetchOption = 'search';

    if (searchClickCount === 0) {
        page.changedPageId(undefined);
    }

    searchClickCount++;

    if (e.key === 'Enter') {
        breakingNewsContainer.innerHTML = '';
        console.log('at input enter');
        fetchNews(8, false, false, fetchOption);
        
        if (window.innerWidth < 1200) {
            topMenu.style.transform = 'translateX(-102.6%)';
            topMenu.classList.remove('opened-top-menu');
            xMark.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    setTimeout(() => {
        if (breakingNewsContainer.children.length === 0) {
            breakingNewsTitle.textContent = 'Nothing matches your search.';
        } else {
            breakingNewsTitle.textContent = 'Breaking news';
        }
    }, 2000); // delay long enough for fetchNews to render results
})

searchIcon.addEventListener('click', (e) => {
    navClickCount = 0;
    filterClickCount = 0;
    fetchOption = 'search';

    if (searchClickCount === 0) {
        page.changedPageId(undefined);
    }

    searchClickCount++;

    searchInp.focus();

    if (searchInp.value) {
        if (searchBox.classList.contains('opened-search')) {            
            breakingNewsContainer.innerHTML = '';
            fetchNews(8, false, false, fetchOption);
        }                
        if (window.innerWidth < 1200) {
            topMenu.style.transform = 'translateX(-102.6%)';
            topMenu.classList.remove('opened-top-menu');
            xMark.style.display = 'none';
            document.body.style.overflow = 'auto';
            breakingNewsContainer.innerHTML = '';
            fetchNews(8, false, false, fetchOption);
        } 
    }

    e.stopPropagation(); // prevent the document click from immediately closing it
    searchBox.classList.toggle('opened-search');

    searchInp.value = '';

    setTimeout(() => {
        if (breakingNewsContainer.children.length === 0) {
            breakingNewsTitle.textContent = 'Nothing matches your search.';
        } else {
            breakingNewsTitle.textContent = 'Breaking news';
        }
    }, 2000); // delay long enough for fetchNews to render results
})


// Category menu events
categoryMenuItems.forEach(element => {
    element.addEventListener('click', (e) => {
        let categoryParam;
        
        const selectedCategory = e.target.textContent.trim();

        searchClickCount = 0;
        filterClickCount = 0;
        selectedOptions = [];
        fetchOption = 'filter';
        breakingNewsContainer.innerHTML = '';

        if (navClickCount === 0) {
            page.changedPageId(undefined);
        }

        navClickCount++;

        switch (selectedCategory) {
            case 'Politics & World':
                categoryParam = `&category=politics,world,crime,domestic`;
                break;

            case 'Business & Economy':
                categoryParam = `&category=business,top`;
                break;
        
            case 'Science & Technology':
                categoryParam = `&category=science,technology`;
                break;

            case 'Lifestyle & Culture':
                categoryParam = `&category=lifestyle,entertainment,food,tourism`;
                break;

            case 'Health & Education':
                categoryParam = `&category=health,education`;
                break;

            case 'Sports':
                categoryParam = `&category=sports`;
                break;
            default:
                break;
        }

        selectedOptions = [categoryParam];
        
        fetchNews(8, selectedOptions, false, 'filter');

        setTimeout(() => {
            if (breakingNewsContainer.children.length === 0) {
                breakingNewsTitle.textContent = 'Nothing matches your search.';
            } else {
                breakingNewsTitle.textContent = 'Breaking news';
            }
        }, 2000); // delay long enough for fetchNews to render results
    })
})


// Filter bar events
filterBar.addEventListener('mouseover', () => {
    if (!filterItemsContainer.classList.contains('visible-filter-items')) {
        filterBar.style.width = '21rem';
        filterBar.style.background = '#f9f3f3ff';
        filterBar.children[1].style.opacity = '1';
    }
})

filterBar.addEventListener('mouseout', () => {
    filterBar.children[1].style.opacity = '0';
    filterBar.style.width = '4.56rem';
})

filterBar.addEventListener('click', () => {
    filterItemsContainer.classList.toggle('visible-filter-items');
    asideContainer.classList.toggle('opened-aside-container');
})


// Country filter events
countryInput.addEventListener('input', (e) => {
    let filteredCountries = [];
    countryFilterBox.innerHTML = '';
    filteredCountries = countries.filter(country => country.name.includes(e.target.value.toUpperCase()));
    renderElement(filteredCountries, countryFilterBox);
    
    if (e.target.value === '') {
        countryFilterBox.innerHTML = '';
    }

    if (countryFilterBox.innerHTML === '') {
        countryFilterBox.style.border = 'none'
    } else {
        countryFilterBox.style.border = '1px solid #c0bfbf'
    }
})

countryFilterBox.addEventListener('click', (e) => {
    countryInput.value = e.target.textContent;
    countryFilterBox.innerHTML = '';
    e.stopPropagation();
})


// Language filter events
languageInput.addEventListener('input', (e) => {
    let filteredlanguages = [];
    languageFilterBox.innerHTML = '';
    filteredlanguages = languages.filter(language => language.name.toLowerCase().includes(e.target.value.toLowerCase()));
    renderElement(filteredlanguages, languageFilterBox);
    
    if (e.target.value === '') {
        languageFilterBox.innerHTML = '';
    }

    if (languageFilterBox.innerHTML === '') {
        languageFilterBox.style.border = 'none'
    } else {
        languageFilterBox.style.border = '1px solid #c0bfbf'
    }
})

languageFilterBox.addEventListener('click', (e) => {
    languageInput.value = e.target.textContent;
    e.stopPropagation();
    languageFilterBox.innerHTML = '';
})


// Button events
// Submit button
submitBtn.addEventListener('click', () => { 
    searchClickCount = 0;
    navClickCount = 0;
    selectedOptions = [];
    fetchOption = 'filter';

    filterItemsContainer.classList.remove('visible-filter-items');
    asideContainer.classList.remove('opened-aside-container');
    breakingNewsContainer.innerHTML = '';

    if (filterClickCount === 0) {
        page.changedPageId(undefined);
    }

    // Add selected filter options to the array to pass the fetchNews function
    if (getCategory()) selectedOptions.push(getCategory());
    if (getTimeInterval()) selectedOptions.push(getTimeInterval());
    if (getCountryCode()) selectedOptions.push(getCountryCode());
    if (getLanguageCode()) selectedOptions.push(getLanguageCode());
    const sorted = getSortingOption();

    if (selectedOptions.includes('&null')) {
        selectedOptions.shift();
    }

    if (selectedOptions.length !== 0) {    
        if (!sorted) {
            fetchNews(8, selectedOptions, false, 'filter');
        } else {
            fetchNews(8, selectedOptions, true, 'filter');
        }    
    }

    setTimeout(() => {
        if (breakingNewsContainer.children.length === 0) {
            breakingNewsTitle.textContent = 'Nothing matches your search.';
        } else {
            breakingNewsTitle.textContent = 'Breaking news';
        }
    }, 2000); // delay long enough for fetchNews to render results
})

// Load more button
loadMoreBtn.addEventListener('click', () => {
    if (page.id) {
        if (fetchOption === 'search') {
            fetchNews(8, false, false, fetchOption);    
        } else if (fetchOption === 'filter') {
            if (!getSortingOption) {    
                fetchNews(8, selectedOptions, false, 'filter');
            } else {
                searchInp.value = '';
                fetchNews(8, selectedOptions, true, 'filter');
            }
        } else {
            console.log(selectedOptions);
            fetchNews(8, false, false, fetchOption);
        }
    } else {
        loadMoreBtn.disabled = true; // optional
        loadMoreBtn.style.display = 'none';
    }
});