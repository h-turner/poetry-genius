$(document).ready(function () {

    const dudePoem = function () {

        let authorName =  $('#authInput').val().trim().toLowerCase();
        const titlesURL = `http://poetrydb.org/author/${authorName}/title`;

    $.ajax({
        url: titlesURL,
        method: 'GET'
    }).then(function (response) {
        $('.displayP').empty();
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
            // console.log(response.lines);
            // render ();
            let paraArray = response[0];
            console.log(paraArray)
            $('.displayP').empty();
            for (let i = 0; i < response[0].lines.length; i++) {
                let wordsArray = response[0].lines[i].split(' ');
                console.log(wordsArray);
                $('.displayP').append(`<p class="wordsDef">${response[0].lines[i]}</p>`)
                
                console.log(wordsArray[0]);

                unirest.get("https://wordsapiv1.p.mashape.com/words/soliloquy")
.header("X-Mashape-Key", "<08610a2a97mshaa47ca0a7cffc11p1774eajsnfe2e903e20ec>")
.header("Accept", "application/json")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
            }
        })

    }

//     const wordsAPI = function (word) {
//         console.log(word);
//         const wordURL = `https://wordsapiv1.p.mashape.com/words/run`
//         $.ajax({
//             url: wordURL,
//             method: 'GET',
//             dataType: "json",
//             header: { "X-Mashape-Key": "08610a2a97mshaa47ca0a7cffc11p1774eajsnfe2e903e20ec" }
//         }).then(function (response){

//         console.log(response);
        
//     });
// }




    $("#display").click(function() {
        // Gets clicked on word (or selected text if text is selected)
        let word = '';
        if (window.getSelection && (sel = window.getSelection()).modify) {
            // Webkit, Gecko
            var s = window.getSelection();
            if (s.isCollapsed) {
                s.modify('move', 'forward', 'character');
                s.modify('move', 'backward', 'word');
                s.modify('extend', 'forward', 'word');
                word = s.toString();
                s.modify('move', 'forward', 'character'); //clear selection
            }
        }
        console.log(word);
    });
});


















//leftovers
//<a href="http://poetrydb.org/author,title/${authorName};${response[i].title}">${response[i].title}</a>

//format is poetrydb.org/author,title/shakespeare;sonnet%201:%20from%20fairest%20creatures%20we%20desire%20increase



// const addButton = function(e) {
//     e.preventDefault();
//     let validationURL = "https://api.iextrading.com/1.0/ref-data/symbols";
//     let validationList = [];
//     $.ajax({
//         url: validationURL,
//         method: 'GET'
//     }).then(function(response) {
//         for (let i = 0; i < response.length; i++) {
//         validationList.push(response[i].symbol);
//         }

//         const stock = $('#stock-input').val().trim().toUpperCase();
//         for (let i = 0; i < validationList.length; i++) {
//             if (validationList[i] === stock) {
//                 stocklist.push(stock);
//                 $('#stock-input').val("");
//                 render();
//                 return
//             }
//         }
//         alert("please enter a valid stock symbol");
// })

// }

// } else if ((sel = document.selection) && sel.type != "Control") {
        //     // IE 4+
        //     var textRange = sel.createRange();
        //     if (!textRange.text) {
        //         textRange.expand("word");
        //     }
        //     // Remove trailing spaces
        //     while (/\s$/.test(textRange.text)) {
        //         textRange.moveEnd("character", -1);
        //     }
        //     word = textRange.text;
        // }