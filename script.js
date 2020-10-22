
const apiKey = '6VKbepI4RXeUj4buc714kONQZ4Nd9CKtxZOjmk3M';

 function getData() {
  let stateCode = $("#js-parks-name").val();
  stateCode  = stateCode.replace(/\s+/g,'')
  placeholder="comma separated state codes"
  const maxResults = $("#js-max-results").val();
  const url = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&limit=${maxResults}&stateCode=${stateCode}`;
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      displayResults(responseJson)
    }).catch(error => alert('Something went wrong. Try again later.'));
    
}

function displayResults(responseJson){
    // if there are previous results, remove them
    $("#results").removeClass("hidden");
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++){
      let addresses = '';
      for (let k = 0; k < responseJson.data[i].addresses.length; k++){
         addresses += `<div>
          <h5>${responseJson.data[i].addresses[k].type}</h5>
          ${responseJson.data[i].addresses[k].line1} <br/>
          ${responseJson.data[i].addresses[k].line2}
          ${responseJson.data[i].addresses[k].line3}
          ${responseJson.data[i].addresses[k].city} <br/>
          ${responseJson.data[i].addresses[k].stateCode} <br/>
          ${responseJson.data[i].addresses[k].postalCode} <br/>
        </div>`
      }
      $('#results-list').append(`<li>
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}"target="_blank">website</a>
        
        
  ${addresses}
      </li>`)
    }
};


function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    getData()
  });
}
 
$(watchForm);
