// create app namespace object
const lotrApp = {};

// assign an array value to each character id 

lotrApp.id = "5cd99d4bde30eff6ebccfbe6";
lotrApp.allIds = ["5cd99d4bde30eff6ebccfea0","5cd99d4bde30eff6ebccfc15", "5cd99d4bde30eff6ebccfd0d", "5cd99d4bde30eff6ebccfbe6", "5cd99d4bde30eff6ebccfd81", "5cd99d4bde30eff6ebccfd23", "5cd99d4bde30eff6ebccfe2e", "5cd99d4bde30eff6ebccfc7c", "5cd99d4bde30eff6ebccfc57"]

// API url 

lotrApp.url = `https://the-one-api.dev/v2/character/${lotrApp.id}/quote`;

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
                    $(".quote-container").empty()
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

        lotrApp.url = `https://the-one-api.dev/v2/character/${lotrApp.id}/quote`;

        lotrApp.getQuotes();
    })    
};

// display results to the page 

lotrApp.displayQuotes = (quote) => {

    //generate random quote from array values. 

    let randomQuote = [Math.floor(Math.random() * quote.docs.length)];
 
    // create the html to display quotes to the page

    const htmlToAppend = `

        <div class="quote-holder">

            <h3>"${quote.docs[randomQuote].dialog}"</h3>

        </div>
        `
        $(".quote-container").append(htmlToAppend)

        return quote.docs[randomQuote]
    
};
   
// create  app initialization method 

lotrApp.init = function () {
    lotrApp.getValue();
};

// create document ready

$(function(){
    lotrApp.init();

});