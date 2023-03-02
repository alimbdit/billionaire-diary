const getIndustryBillionaire2 = (limit) => {
  const URL = `https://forbes400.onrender.com/api/forbes400/industries/technology`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showIndustryBillionaire2(data, limit));
};

const showIndustryBillionaire2 = (datas, limit) => {
  console.log(datas);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = "";

  const showAll = document.getElementById("load-more");
  console.log(datas.length);

  if (limit && datas.length > limit) {
    datas = datas.slice(0, limit);
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  datas.forEach((data) => {
    console.log(data);
    let shares = 0;
    data.financialAssets
      ? data.financialAssets.forEach((share) => {
          shares += share.numberOfShares;
        })
      : (shares = "Not available");
    let sharePrices = 0;
    data.financialAssets
      ? data.financialAssets.forEach((prices) => {
          sharePrices += prices.sharePrice;
          
        })
      : (sharePrices = "Not available");
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
                data.squareImage
                  ? data.squareImage
                  : "https://picsum.photos/200"
              }" alt="Movie"/></figure>
          <div class=" pl-3 border-l-2 border-so flex items-center">
            <div>
              <p class="font-bold">Citizenship: <span class="font-normal">${
                data.countryOfCitizenship
              }</span> <br>
                  State: <span class="font-normal">${data.state}</span> <br>
                  City: <span class="font-normal">${data.city}</span> <br>
                   Total Shares: <span class="font-normal">${isNaN(shares) ? shares : shares.toFixed(2)}</span> <br>
                   Share Price: $<span class="font-normal">${isNaN(sharePrices) ? sharePrices : sharePrices.toFixed(2)}</span></p>
            </div>
          </div>
          </div>
          <h4 class="font-medium text-left mt-2">Source: <span class="font-normal">${
            data.source
          }</span></h4>
          `;
    cardContainer.appendChild(card);

    // stop loader or spinner
    toggleSpinner(false);
  });
};


const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

toggleSpinner(true);
getIndustryBillionaire2(10);

document.getElementById("load-more").addEventListener("click", function () {
    toggleSpinner(true);
  getIndustryBillionaire2();
});
