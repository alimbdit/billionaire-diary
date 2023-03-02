const getIndustryBillionaire = (limit) => {
  const URL = `https://forbes400.onrender.com/api/forbes400/industries/technology`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showIndustryBillionaire(data, limit));
};

const showIndustryBillionaire = (datas, limit) => {
  console.log(datas);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = '';
  
  const showAll = document.getElementById('load-more');
  console.log(datas.length);

  if (limit && datas.length > limit) {
    datas = datas.slice(0, limit);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  datas.forEach((data) => {
    console.log(data);
    let shares = 0;
    data.financialAssets.forEach((share) => {
      shares += share.numberOfShares;
    });
    let sharePrices = 0;
    data.financialAssets.forEach((prices) => {
      sharePrices += prices.sharePrice;
    });
    const card = document.createElement("div");
    card.classList.add(
      "card",
      "bg-cyan-900",
      "shadow-xl",
      "py-5",
      "pl-7",
      "text-white",
      "rounded-lg"
    );
    card.innerHTML = `
        <h1 class=" text-2xl font-bold text-center mb-5">${
          data.person.name
        }</h1>
        <div class="flex gap-3">
            <figure class="w-40"><img src="${
              data.squareImage ? data.squareImage : "https://picsum.photos/200"
            }" alt="Movie"/></figure>
        <div class=" pl-3 border-l-2 border-so flex items-center">
          <div>
            <p class="font-bold">Citizenship: <span class="font-normal">${
              data.countryOfCitizenship
            }</span> <br>
                State: <span class="font-normal">${data.state}</span> <br>
                City: <span class="font-normal">${data.city}</span> <br>
                Total Shares: <span class="font-normal">${shares}</span> <br>
                Share Price: $<span class="font-normal">${sharePrices.toFixed(
                  2
                )}</span></p>
          </div>
        </div>
        </div>
        <h4 class="font-medium text-left mt-2">Source: <span class="font-normal">${
          data.source
        }</span></h4>
        `;
    cardContainer.appendChild(card);
  });
};
// document.getElementById('industry-btn').addEventListener('click', function(){
//     getIndustryBillionaire ();
// })

const showByCategory = (limit) => {
    // start spinner
    // toggleSpinner(true);
    // const inputField = document.getElementById('phone-field').value;
    // document.getElementById('phone-field').value = '';
    
    
}

document.getElementById('load-more').addEventListener('click', function(){
    getIndustryBillionaire ();
})

// getIndustryBillionaire();
