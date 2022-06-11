//remote array of cieties
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')
const defaultSuggestions = `
<li class="sugg-city">Filter City</li>
<li class="sugg-state">And/Or State</li>
`
let cities = []

searchInput.addEventListener('change', showResults)
searchInput.addEventListener('input', showResults)

// grab data from endpoint and spread it into emnpty cities[]
fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data))

function showResults(){
    
    const mathList = findMatches(this.value, cities)
    const html = mathList.map(place => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`)
        return `
        <li class='results'>
            <span class='name'>${cityName}, ${stateName}</span>
            <span class='population'>${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join('')
    suggestions.innerHTML = html
    console.log(this.value)
    
}
function showEmpty(html){
    console.log(html)
    suggestions.innerHTML = `${hmtl}`
}

function findMatches(stringToMatch, cities){
     return cities.filter(place => {
        // do the filternig shinanigans here
        const regex = new RegExp(stringToMatch, 'gi')
        return place.city.match(regex) || place.state.match(regex)
     })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }