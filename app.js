$(document).ready(function () {

    // $('#opener').click(function() {
    //     $('#defDialog').dialog();
    //     return false;
    // });

    // const authorName =  $('#authInput').val().trim().toLowerCase();
    // const titlesURL = `http://poetrydb.org/author/${authorName}/title`;

    const dudePoem = function () {

        let authorName =  $('#authInput').val().trim().toLowerCase();
        const titlesURL = `http://poetrydb.org/author/${authorName}/title`;

    $.ajax({
        url: titlesURL,
        method: 'GET'
    }).then(function (response) {
        for (let i = 0; i < response.length; i++) {
            console.log(response[i].title)
            let poemTitle = response[i].title;
            $('.displayP').append(`<li class="titleP" data-poemTitle="${poemTitle}">${poemTitle}</li>`);
        }
        $('.titleP').on("click", displayPoem);
    });
}

$('#myDude').on("click",dudePoem);


    const displayPoem = function (authorName) {
        let titleString = $(this).attr('data-poemTitle');
        let urlString = titleString.split(' ').join('%20')
        console.log(urlString);
        const poemURL = `http://poetrydb.org/author,title/${authorName};${urlString}`
        $.ajax({
            url: poemURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response.lines);
            // render ();
            $('.displayP').empty();
            for (let i = 0; i < response[0].lines.length; i++) {
                let wordsArray = response[0].lines[i]
                console.log(wordsArray);

            }
        })

    }

    
    // const defineWord = function() {
    //     let wordDef = $(this).attr('data-word')
    // }
});



//leftovers
//<a href="http://poetrydb.org/author,title/${authorName};${response[i].title}">${response[i].title}</a>

//format is poetrydb.org/author,title/shakespeare;sonnet%201:%20from%20fairest%20creatures%20we%20desire%20increase



const addButton = function(e) {
    e.preventDefault();
    let validationURL = "https://api.iextrading.com/1.0/ref-data/symbols";
    let validationList = [];
    $.ajax({
        url: validationURL,
        method: 'GET'
    }).then(function(response) {
        for (let i = 0; i < response.length; i++) {
        validationList.push(response[i].symbol);
        }

        const stock = $('#stock-input').val().trim().toUpperCase();
        for (let i = 0; i < validationList.length; i++) {
            if (validationList[i] === stock) {
                stocklist.push(stock);
                $('#stock-input').val("");
                render();
                return
            }
        }
        alert("please enter a valid stock symbol");
})

}