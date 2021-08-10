let personName = document.getElementById('name');
let animeName = document.getElementById('anime');
let quoteName = document.getElementById('quote');
let buttonNew = document.getElementById('get-btn');
let quoteList = document.getElementById('list');
let animeList = document.getElementById('list-animes');


function getNew() {
    fetch('https://animechan.vercel.app/api/random')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response
                response.json()
                    .then(function (data) {
                        quoteList.innerHTML = '';
                        personName.innerHTML = data.character;
                        animeName.innerHTML = data.anime;
                        quoteName.innerHTML = data.quote;
                    });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function loadAnimeQuotes(e) {
    fetch(`https://animechan.vercel.app/api/quotes/anime?title=` + animeName.innerHTML)
        .then(response => {
            if (response.status !== 200) {
                console.log('A problem occured! Status code: ' + response.status);
                return;
            }

            response.json()
                .then(data => {
                    quoteList.innerHTML = '';
                    personName.innerHTML = animeName.innerHTML;
                    animeName.innerHTML = '';
                    quoteName.innerHTML = '';
                    quoteList.innerHTML +=
                        data.map(i => {
                            return `<blockquote>"${i.quote}"</blockquote> by <cite>${i.character}</cite>`
                        }).join('');
                    document.getElementById('back-btn').style.display = 'block';

                    console.log(document.body.innerHTML);

                })
        }
        )
}
// Getting the list of animes
function loadAnimeNames(e) {
    fetch('https://animechan.vercel.app/api/available/anime')
        .then(response => {
            if (response.status !== 200) {
                console.log('A problem occured! Status code: ' + response.status);
                return;
            }

            response.json()
                .then(data => {
                    data.sort();
                    animeList.innerHTML = data.map((anime) => {
                        return `<li>${anime}</li>`
                    }).join('');
                })

        }
        )
}