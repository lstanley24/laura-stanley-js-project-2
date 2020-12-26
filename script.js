// create app namespace object
const lotrApp = {};

// assign an array value to each character id 

lotrApp.allIds = ["5cd99d4bde30eff6ebccfea0","5cd99d4bde30eff6ebccfc15", "5cd99d4bde30eff6ebccfd0d", "5cd99d4bde30eff6ebccfbe6", "5cd99d4bde30eff6ebccfd81", "5cd99d4bde30eff6ebccfd23", "5cd99d4bde30eff6ebccfe2e", "5cd99d4bde30eff6ebccfc7c", "5cd99d4bde30eff6ebccfc57"]

lotrApp.allNames = ["Gandalf", "Frodo Baggins", "Samwise Gamgee", "Aragorn", "Legolas", "Gimli", "Peregrin Took", "Meriadoc Brandybuck", "Boromir"]

lotrApp.allPhotos = ["./assets/gandalf.jpeg", "./assets/frodo.jpeg", "./assets/samwise.jpeg", "./assets/aragorn.jpeg", "./assets/legolas.png", "./assets/gimli.jpg", "./assets/merry.jpg", "./assets/pippin.jpg", "./assets/boromir.jpg"]

// lotrApp.allMovieTitles = ["5cd95395de30eff6ebccde5c", "5cd95395de30eff6ebccde5b", "5cd95395de30eff6ebccde5d"]

// API url 

lotrApp.url = `https://the-one-api.dev/v2/character/quote`;

// API key 

lotrApp.apiKey = `ViE0UaamXONB47rhAQ-K`;

// method to get quotes 

lotrApp.getQuotes = () => {
    $.ajax({
    url: lotrApp.url,
        method: "GET",
        dataType: "json",
        headers: {
            Authorization: `Bearer ${lotrApp.apiKey}`
        }
    }).then((result) => {  
        $(".quote-container").empty();
        $(".photo-container").empty();
        $(".movie-title-container").empty();
        $(".random-quote-container").empty();

        lotrApp.displayQuotes(result);    
        
    });
};

// create a method to get the selected option value from the drop down menu

lotrApp.getValue = () => {

    //listen for the drop down change

    $("select").on("change", function(){

        //store the selected option value

        const selection = $("option:selected").val()

        lotrApp.id = lotrApp.allIds[selection]
        lotrApp.name = lotrApp.allNames[selection]
        lotrApp.photo = lotrApp.allPhotos[selection]

        lotrApp.url = `https://the-one-api.dev/v2/character/${lotrApp.id}/quote`;

        lotrApp.getQuotes();

    })    
};

// create a method to generate a random quote
lotrApp.randomQuoteGenerator = () => {

    $("#randomizer").on("click", function () {

        const randomNumber = Math.floor(Math.random() * 9);

        lotrApp.id = lotrApp.allIds[randomNumber]
        lotrApp.name = lotrApp.allNames[randomNumber]
        lotrApp.photo = lotrApp.allPhotos[randomNumber]

        lotrApp.url = `https://the-one-api.dev/v2/character/${lotrApp.id}/quote`;

        lotrApp.getQuotes();

    })   
}

// create a method to shuffle the displayed quote by chosen character 

lotrApp.shuffleQuote = () => {
    $("#shuffle").on("click", function () {
        lotrApp.getQuotes();

    })    
}

// display results to the page 

lotrApp.displayQuotes = (quote) => {
    
    $(".shuffle").show()

    let selectedQuote = [Math.floor(Math.random() * quote.docs.length)];

    //generate random quote from array values. 

    let whichMovie = quote.docs[selectedQuote].movie;

    if (whichMovie === "5cd95395de30eff6ebccde5d") {
        let movie = `<p>The Fellowship of the Ring</p> `

        $(".movie-title-container").append(movie)


    } else if (whichMovie === "5cd95395de30eff6ebccde5b") {
        let movie = `<p>The Two Towers</p> `

        $(".movie-title-container").append(movie)

    } else if (whichMovie === "5cd95395de30eff6ebccde5c") {
        let movie = `<p>Return of the King</p> `

        $(".movie-title-container").append(movie)

    } else {
        null
    }

    // create the html to display quotes to the page

    const htmlToAppend = `
        <h3>"${quote.docs[selectedQuote].dialog}"</h3>  
        <h4>~ ${lotrApp.name}</h4>
    `
    const photoToAppend = `
        <img src=${lotrApp.photo} alt="Lord of the Rings character">
    `

    $(".quote-container").append(htmlToAppend)
    $(".photo-container").append(photoToAppend)

    return quote.docs[selectedQuote]
};






// create  app initialization method 

lotrApp.init = function () {
    lotrApp.getValue();
    lotrApp.randomQuoteGenerator();
    lotrApp.shuffleQuote();
};

// create document ready

$(function(){
    lotrApp.init();

});