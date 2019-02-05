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
        $('.displayP').empty();  //lines are appended to displayP
        for (let i = 0; i < response.length; i++) {
            console.log(response[i].title)
            let poemTitle = response[i].title;
            $('.displayP').append(`<li class="titleP" data-poemTitle="${poemTitle}">${poemTitle}</li>`);
        }
        $('.titleP').on("click", displayPoem);
    });
}

$(document).keypress(function(e) {
    if(e.which == 13) {
       dudePoem();
    }
});

$('#myDude').on("click",dudePoem);


    const displayPoem = function (authorName) {
        let titleString = $(this).attr('data-poemTitle'); //Data attribute of which poem was clicked on, 
        let urlString = titleString.split(' ').join('%20') //splits title at every space, inserts %20 at every
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
                $('.displayP').append(`<p class="wordsDef">${response[0].lines[i]}</p>`)
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