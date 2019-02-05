$(document).ready(function () {

//function that populates page with works by searched Author.
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
            $('.displayP').append(`<p class="titleP" data-poemTitle="${poemTitle}">${poemTitle}</p>`);
        }
        $('.titleP').on("click", displayPoem);
    });
}

//provides functionality to search button to run dudePoem function. Also works with 'enter' key.
$(document).keypress(function(e) {
    if(e.which == 13) {
       dudePoem();
    }
 });
$('#myDude').on("click",dudePoem);


//function to populate page with the poetry work that is clicked.
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
            // targets display div, empties it, and repopulates it with poem.
            $('.displayP').empty();
            for (let i = 0; i < response[0].lines.length; i++) {
                let wordsArray = response[0].lines[i].split(' ');
                console.log(wordsArray);
                $('.displayP').append(`<p>${response[0].lines[i]}</p>`)
                
                console.log(wordsArray[0]);
            }
        })

    }

//gets clicked on word (or selected text if text is selected)
    $("#display").click(function() {
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
        console.log(word);

    
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://wordsapiv1.p.mashape.com/words/${word}`,
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
        // $('#page2').hide();
        $('#page2').append(`<p>Word: ${response.word}</p>`)
        $('#page2').append(`<p>Pronunciation: ${response.pronunciation.all}</p>`)
        for ( let i = 0; i < response.results.length; i++) {
        $('#page2').append(`<p>Definition: ${response.results[i].definition}</p>`);
        }
        $('#page2').show();
        
      });
    });
  
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