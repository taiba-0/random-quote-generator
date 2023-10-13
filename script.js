
//Getting data
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitter = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const loader = document.querySelector('.loader');


//ShoW loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading 
function loaded(){
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}
    
//Get Quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        let response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if Author data is unavailable or unknown
        if (data.authorText === '') {
            authorText.innerText = 'Unknown';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        //Reduce quote size if Quote is LONG
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        console.log(data);
        quoteText.innerText = data.quoteText;
        //Stop loading
        loaded();
    }
    catch (error) {
        // getQuote();
        console.error();
    }
}

//TWEET the quote
const tweetQuote = function () {
    const textToTweet = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(textToTweet, '_blank');
}

//Event Listener for twitter button
twitter.addEventListener("click", tweetQuote);

//Event Listener for new Quote button
newQuote.addEventListener("click", getQuote);


//on Load
getQuote();


