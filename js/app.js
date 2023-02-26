const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

    // display only 20 phones 
    const showAll = document.getElementById('show-more');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }


    // add warning text
    const textWarning = document.getElementById('warning-text');
    if (phones.length === 0) {
        textWarning.classList.remove('d-none');
    }
    else {
        textWarning.classList.add('d-none');

    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-2">
        <img src="${phone.image}" class="w-50 ps-3 pt-3" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

          <!-- Button trigger modal -->
          <button onclick="loadPhonesDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
        </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stop spinner
    toggleSpinner(false);
  
}

const processSearch = (dataLimit) => {
    // show spinner
    toggleSpinner(true);
    const getText = document.getElementById('get-text');
    const text = getText.value;
    loadPhones(text, dataLimit);
}
// for search button
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);

})
// press enter button to search
document.getElementById('get-text').addEventListener('keydown', function (event) {
    console.log(event.key)
    if (event.key === 'Enter') {
        processSearch(10);
    }
})
// loader spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}
document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
    console.log('hey')
})
const loadPhonesDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayLoadPhonesDetails(data.data);
}
const displayLoadPhonesDetails = phone => {
    const title = document.getElementById('exampleModalLabel');
    title.innerText = phone.name;
    console.log(phone);
    const feature = document.getElementById('phone-details-modal');
    feature.innerHTML = `
    <p>Chipset: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No Chipset'}</p>
    <p>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Display Size'}</p>
    <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No Memory'}</p>   
    <p>Storage:${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage'}</p>  

    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth'}</p>
    <p>GPS: ${phone.others ? phone.others.GPS : 'No GPS'}</p>
    <p>NFC: ${phone.others ? phone.others.NFC : 'No NFC'}</p>   
    <p>Radio:${phone.others ? phone.others.Radio : 'No Radio'}</p>  
    <p>USB ${phone.others ? phone.others.USB : 'No USB'}</p>
    <p>WLAN: ${phone.others ? phone.others.WLAN : 'No WLAN'}</p>   
    <p>ReleaseDate:${phone.releaseDate ? phone.releaseDate : 'No ReleaseDate'}</p> 
    `;
}

loadPhones('Galaxy Quantum 2')