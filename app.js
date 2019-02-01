$(document).ready(function() {

const authorName = "Shakespeare" //this will be = inputField.val()

const titlesURL = `http://poetrydb.org/author/${authorName}/title`;

$.ajax({
    url: titlesURL,
    method: 'GET'
}).then(function (response) {
    let poemsArray = [];
    for (let i = 0; i < response.length; i++) {
        console.log(response[i].title)
        let poemTitle = response[i].title;
        $('.displayP').append(`<li class="titleP" id="${poemTitle}">${poemTitle}</li>`);
        // $('.titleP').on("click", displayPoem());
        poemsArray.push(poemTitle);
        console.log(poemTitle.split(' ').join('%20'));
        console.log(poemsArray);
    }
});

// const displayPoem = function() {

// let titleString = $(this.id).split(' ').join('%20');//issue on this line... this.split doesn't work. We need to capture the ID of what's clicked.
// const poemURL = `http://poetrydb.org/author,title/${authorName};${titleString}`
//     $.ajax({
//         url: poemURL,
//         method: 'GET'
//     }).then(function(response) {
//         console.log(response.lines);
//         // render ();
//         $('.displayP').empty();
//         $('.displayP').append(`<p>${response.lines}</p>`)
//     })
// }
});
// const render = function(displayPoem) {
//     $('.displayP').empty();
//     $('.displayP').append(`<p>${response.lines}`);


//leftovers
//<a href="http://poetrydb.org/author,title/${authorName};${response[i].title}">${response[i].title}</a>

//format is poetrydb.org/author,title/shakespeare;sonnet%201:%20from%20fairest%20creatures%20we%20desire%20increase