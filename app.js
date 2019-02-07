$(document).ready(function () {

    // var authorList = [];
    // var authorURL = 'http://poetrydb.org/author/'

    // $.ajax({
    //     url: authorURL,
    //     method: 'GET'
    // }).then(function (response) {
    //     console.log(response);
    //     console.log(authorList);
    // });

    //function that populates page with works by searched Author.
        const dudePoem = function () {
    
            let authorName =  $('#authInput').val().trim().toLowerCase();
            const titlesURL = `http://poetrydb.org/author/${authorName}/title`;
    
        $.ajax({
            url: titlesURL,
            method: 'GET'
        }).then(function (response) {
            $('#closeBook').hide();
            $('#openBook').show();
            $('#displayP').hide();
            $('#display').show();
            $('#display').empty();
            $('#page2').empty();
            let element = document.getElementById("bodyImage"); 
            element.classList.toggle("readBook")
            for (let i = 0; i < response.length; i++) {
                console.log(response[i].title)
                let poemTitle = response[i].title;
                $('#display').append(`<p class="titleP" data-poemTitle="${poemTitle}">${poemTitle}</p>`);
            }
            $('.titleP').on("click", displayPoem);
        });
    }
    
    //provides functionality to search button to run dudePoem function. Also works with 'enter' key.
    $('#closeBook').keypress(function(e) {
        if(e.which == 13) {
           dudePoem();
        }
     });

     $('#openBook').keypress(function(e) {
         if(e.which == 13) {
             dudePoem2();
         }
     });
    $('#myDude').on("click",dudePoem);
  
    
    

    const dudePoem2 = function () {
    
        let authorName =  $('#authInput2').val().trim().toLowerCase();
        const titlesURL = `http://poetrydb.org/author/${authorName}/title`;

    $.ajax({
        url: titlesURL,
        method: 'GET'
    }).then(function (response) {
        $('#display').empty();
        $('#displayP').empty();
        $('#displayP').hide();
        $('#display').show();
        for (let i = 0; i < response.length; i++) {
            console.log(response[i].title)
            let poemTitle = response[i].title;
            $('#display').append(`<p class="titleP" data-poemTitle="${poemTitle}">${poemTitle}</p>`);
        }
        $('.titleP').on("click", displayPoem);
    });
}
    $('#myDude2').on("click",dudePoem2);
    $('#obTitle').on("click")


    //function to populate page with the poetry work that is clicked.
        const displayPoem = function (authorName) {
            let titleString = $(this).attr('data-poemTitle');
            $('#pageOneHead').text(`Literary Work :  ${titleString}`);
            let urlString = titleString.split(' ').join('%20')
            console.log(urlString);
            const poemURL = `http://poetrydb.org/author,title/${authorName};${urlString}`
            $.ajax({
                url: poemURL,
                method: 'GET'
            }).then(function (response) {
                console.log(response.lines);
                // targets display div, empties it, and repopulates it with poem.
                $('#display').hide();
                $('#displayP').show();
                for (let i = 0; i < response[0].lines.length; i++) {
                    let wordsArray = response[0].lines[i].split(' ');
                    console.log(wordsArray);
                    $('#displayP').append(`<p>${response[0].lines[i]}</p>`)
                    
                    console.log(wordsArray[0]);
                }
            })
    
        }
    
    //gets clicked on word (or selected text if text is selected)
        $("#displayP").click(function() {
            $('#page2').hide();
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
            if (word.includes("'st")){
                var newWord = word.replace("'st", "");
            }
            else if (word.includes("'s")){
                var newWord = word.replace("'s", "");
            } else{
                var newWord = word.replace("'", "e");
            }
        
            var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://wordsapiv1.p.mashape.com/words/${newWord}`,
            "method": "GET",
            "headers": {
              "X-Mashape-Key": "a647b507f6msh19b9c8f45abc13dp10ee28jsn1ab0da6d123b",
              "cache-control": "no-cache",
              "Postman-Token": "a435f077-ff32-4e13-af6f-de2fe9da04c8"
            }
          }
    
          $.ajax(settings).done(function (response) {
            console.log(response);
            $('#page2').empty();
            $('#page2').show();
            $('#page2').append(`<p>Word: ${response.word}</p>`)
            $('#page2').append(`<p>Pronunciation: ${response.pronunciation.all}</p>`)
            for ( let i = 0; i < response.results.length; i++) {
            $('#page2').append(`<p>Definition: ${response.results[i].definition}</p>`);
            }
            
          });
        });

        const returnTitle = function (){
            $('#displayP').hide();
            $('#display').show();
            $('#page2').empty();
            $('#pageOneHead').text("Literary Work :");
        }
      

        const homePage = function() {
            let element = document.getElementById("bodyImage"); 
            element.classList.toggle("readBook");
            $('#pageOneHead').text("Literary Work :");
            $('#openBook').hide();
            $('#closeBook').show();
            $('#displayP').hide();
            $('#display').hide();
            $('#display').empty();
            $('#page2').empty();
            $('#authInput').val('');
            $('#authInput2').val('');
        }

        $('#obTitle').on("click", homePage);
        $('#pageOneHead').on("click", returnTitle)
    });
    
    
    
    
    
    
    
    
    
    
    
    // compatability for older browsers
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


            //code for accessing oxford dictionary
        //     var settings = {
        //         "async": true,
        //         "crossDomain": true,
        //         "url": `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${word}`,
        //         "method": "GET",
        //         "headers": {
        //           "Accept": "application/json",
        //           "app_id": "0e27f5dd",
        //           "app_key": "70e4b55ebbf6a7bb5a12c44ee5de4f74",
        //           "cache-control": "no-cache",
        //           "Postman-Token": "051660f8-9644-4ebe-941a-5885232ddfeb"
        //         }
        //       }
    
        //   $.ajax(settings).done(function (response) {
        //     console.log(response);
        //     $('#page2').empty();
        //     $('#page2').show();
        //     $('#page2').append(`<p>Word: ${response.results[0].id}</p>`)
        //     $('#page2').append(`<p>Etymology: ${response.results[0].entries[0].etymologies[0]}</p>`)
        //     for ( let i = 0; i < response.results[0].lexicalEntries[0].entries[0].senses.length; i++) {
        //     $('#page2').append(`<p>Definition: ${response.results[0].lexicalEntries[0].entries[0].senses[i].definitions[0]}</p>`);

