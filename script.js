const countryContainer = document.getElementById('countryContainer');
const searchInput = document.getElementById('searchInput');

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region')
        .then(response => response.json())
        .then(data => {
            displayCountries(data);
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

function filterCountries() {
    const query = searchInput.value.toLowerCase();
    const countries = countryContainer.getElementsByClassName('country');
    Array.from(countries).forEach(country => {
        const countryName = country.getElementsByTagName('h2')[0].innerText.toLowerCase();
        if (countryName.includes(query)) {
            country.style.display = '';
        } else {
            country.style.display = 'none';
        }
    });
}