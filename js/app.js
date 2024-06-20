const loadPhones = async (brand) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand}`)
    const data = await res.json()
    displayPhones(data.data);
}
const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    phones.map(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('card', 'bg-base-100', 'shadow-xl', 'w-96', 'mx-auto');
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button class="btn btn-primary" onclick="handleShowDetail('${phone.slug}')">Show More</button>
            </div>
        </div>
        `

        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingDots(false);
}
const toggleLoadingDots = (isLoading) => {
    const loadingDots = document.getElementById('loading');
    if(isLoading){
        loadingDots.classList.remove('hidden');
    }
    else{
        loadingDots.classList.add('hidden');
    }
}
const handleShowDetail = async (id) => {
    console.log('Clicked on', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    showDataModal(data.data)
}

const showDataModal = (phone) => {
    show_details_modal.showModal();
    document.getElementById('phone-name').innerText = phone.name;
    document.getElementById('phone-thumb').setAttribute('src', phone.image);
    document.getElementById('phone-features').innerHTML = `
    <h5 class="font-bold text-lg">Main Features: </h5>
    <p class="mt-1"><span class="font-semibold">Storage: </span>${phone.mainFeatures.storage}</p>
    <p class="mt-1"><span class="font-semibold">Display: </span>${phone.mainFeatures.displaySize}</p>
    <p class="mt-1"><span class="font-semibold">Chipset: </span>${phone.mainFeatures.chipset}</p>
    <p class="mt-1"><span class="font-semibold">Memory: </span>${phone.mainFeatures.memory}</p>
    `
}

document.getElementById('selection').addEventListener('change', function () {
    toggleLoadingDots(true);
    const selected = document.getElementById('selection').value;
    loadPhones(selected);
})

loadPhones('iphone')