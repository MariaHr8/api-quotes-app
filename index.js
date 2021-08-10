let personName = document.getElementById('name');
let animeName = document.getElementById('anime');
let quoteName = document.getElementById('quote');
let buttonNew = document.getElementById('get-btn');
let list = document.getElementById('list');

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
                        list.innerHTML = '';
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
                    list.innerHTML = '';
                    personName.innerHTML = animeName.innerHTML;
                    animeName.innerHTML = '';
                    quoteName.innerHTML = '';
                    list.innerHTML += `
                        ${data.map(i => {
                        return `<blockquote>"${i.quote}"</blockquote> by <cite>${i.character}</cite>`
                    })}
                    `;
                    document.getElementById('back-btn').style.display = 'block';

                    console.log(document.body.innerHTML);

                })
        }
        )
}