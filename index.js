let personName = document.getElementById('name');
let animeName = document.getElementById('anime');
let quoteName = document.getElementById('quote');

fetch('https://animechan.vercel.app/api/random')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        personName.innerHTML = data.character;
        animeName.innerHTML = data.anime;
        quoteName.innerHTML = data.quote;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });


 