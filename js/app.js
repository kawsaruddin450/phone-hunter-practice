const loadPhones = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json()
    displayPhones(data.data);
}

const displayPhones = phones => {
    phones.map(phone => {
        const phoneContainer = document.getElementById('phone-container');
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('card', 'bg-base-100', 'shadow-xl', 'w-96', 'mx-auto');
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
        console.log(phone);
    })
}

loadPhones();