const dataDiv = document.getElementById("data");
const liveData = document.getElementById("liveData");
const proContainer = document.getElementById("allPro");
const searchIN = document.getElementById("search");
const searchBt = document.querySelector("#searchBt");
const disTags = document.querySelector("#tags");
// const searchBt = document.getElementById("searchBt");
const applyTag = document.getElementById("applyTag");

const productApi = "https://dummyjson.com/products";

let allProducts = [];
let producTable = [];

fetch(productApi)
    .then((response) => response.json())
    .then((data) => {
        allProducts = data["products"];
    })
    .catch((error) => {
        console.log(error);
    });

let allTags = new Set();


setTimeout(function () {
    console.log(allProducts);

    allProducts.forEach(function (p, i) {
        producTable[i] = {
            name: p["title"],
            image: p["images"][0],
            price: p["price"],
            tags: p["tags"],
        };

        producTable[i]['tags'].forEach(function (tag) {
            allTags.add(tag)
        })

    });

    console.log(producTable);
    // console.log(allTags)

    disTags.innerHTML = "";
    allTags.forEach(function (t) {
        let tagDiv = document.createElement("div");
        let tv = String(t).toLowerCase();
        console.log(tv)
        tagDiv.classList.add("tag");
        tagDiv.innerHTML = `<label for="${tv}" >${String(tv)}</label>
                    <input class="tagInput" type="checkbox" value="${tv}" name="${tv}" id="${tv}">`;

        disTags.appendChild(tagDiv);
    })
}, 1000);



// create all products on display
setTimeout(function () {
    proContainer.innerHTML = "";

    producTable.forEach(function (pro, i) {
        let newPro = document.createElement("div");
        newPro.classList.add("product");
        newPro.innerHTML = `
            <img src=${pro["image"]} alt="${pro["name"]}" height="200px" width="300px">
                <h3 class="pro-title">${pro["name"]}</h2>
                <h5>${pro["price"]} $</h3>
                <p>Tags: ${pro["tags"]}</p>
        `;
        proContainer.appendChild(newPro);
    });
}, 1500);


searchBt.onclick = () => {
    let val = searchIN.value;
    val = String(val).toLowerCase();
    // let productNames = Array.from(document.querySelectorAll(".pro-title"));
    proContainer.innerHTML = "";

    producTable.forEach(function (pro, i) {

        let searchNameL = pro['name'];
        searchNameL = String(searchNameL).toLowerCase()
        // console.log(searchNameL)

        if (searchNameL.includes(val)) {

            let newPro = document.createElement("div");
            newPro.classList.add("product");
            newPro.innerHTML = `
            <img src=${pro["image"]} alt="${pro["name"]}" height="200px" width="300px">
            <h3 class="pro-title">${pro["name"]}</h2>
            <h5>${pro["price"]} $</h3>
            <p>Tags: ${pro["tags"]}</p>
            `;
            proContainer.appendChild(newPro);
        } else {
            console.log("Not Found")
        }
    });

}

applyTag.onclick = () => {


    let tagy = document.querySelectorAll(".tagInput")

    let selectedTags = new Set();
    tagy.forEach(function (tag) {

        if (tag.checked == true) {
            selectedTags.add(tag.value)
        }

    })
    console.log(selectedTags)

    proContainer.innerHTML = "";
    producTable.forEach(function (pro, i) {

        // pro['tags'].forEach(function (tag) {
        //     console.log(tag.trim())
        // })

        if (pro['tags'].forEach(function (tag) {
            selectedTags.forEach(function (st) {

                // console.log("Selected Tag: ", st)
                // console.log("Tag: ", tag.trim())
                if (tag.trim() == st.trim()) {
                    // console.log("Got IT")

                    let newPro = document.createElement("div");
                    newPro.classList.add("product");
                    newPro.innerHTML = `
            <img src=${pro["image"]} alt="${pro["name"]}" height="200px" width="300px">
            <h3 class="pro-title">${pro["name"]}</h2>
            <h5>${pro["price"]} $</h3>
            <p>Tags: ${pro["tags"]}</p>
            `;
                    proContainer.appendChild(newPro);
                }
            })
        })) {
        } else {


        }
    });


}