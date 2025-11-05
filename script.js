const countryContainer = document.getElementById('countryContainer');
const searchInput = document.getElementById('searchInput');

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region')
        .then(response => response.json())
        .then(data => {
            displayCountries(data); 
            setupSearch(data);
        })
        .catch(error => console.error('Error fetching country data:', error));
});

function displayCountries(countries) {
    countryContainer.innerHTML = '';
    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');
        countryDiv.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
            <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Region: ${country.region}</p>
        `;
        countryContainer.appendChild(countryDiv);
    });
}

function setupSearch(countries) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredCountries = countries.filter(country =>
            country.name.common.toLowerCase().includes(query)
        );
        displayCountries(filteredCountries);
    });
}