import './App.scss';
import React, {useState, useEffect} from 'react';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faSquareXTwitter} from '@fortawesome/free-brands-svg-icons'
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons'


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [randomNumber, setRandomNumber] = useState(0);

  const [quote, setQuote] = useState("Vypic a žic.");

  const [author, setAuthor] = useState("Unknown");

  const [quotesArray, setQuotesArray] = useState(null);

  const [accentColor, setAccentColor] = useState('#282c34');

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() => {
      fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])

  const getRandomQuote = () => {
    let randomInteger = (Math.floor(quotesArray.length * Math.random()));
    setRandomNumber(randomInteger);
    setAccentColor(COLORS_ARRAY[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
      <div id="quote-box" style={{color: accentColor}}>
        <p id='text'>
        <span className='text-quote'><FontAwesomeIcon icon={faQuoteLeft} /></span>
        {quote}
        </p>
        <p id='author'>
        - {author}
        </p>
          <div className='buttons'>
            <a id="tweet-quote" a href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} target='blank' style={{backgroundColor: accentColor}}>
            <FontAwesomeIcon icon={faSquareXTwitter}/></a>

            <button id='new-quote' onClick={() => getRandomQuote()} style={{backgroundColor: accentColor}}>Vygeneruj náhodný citát</button>
          </div>
      </div>
      </header>   
    </div>
  );
}

export default App;
