const dataDiv = document.getElementById("data");
const liveData = document.getElementById("liveData");
const proContainer = document.getElementById("allPro");
const searchIN = document.getElementById("search");
const searchBt = document.querySelector("#searchBt");
const disTags = document.querySelector("#tags");
// const searchBt = document.getElementById("searchBt");
const applyTag = document.getElementById("applyTag");
const clear = document.getElementById("clear");
const applyRadio = document.getElementById('applyRadio');


// API Reference
// https://dummyjson.com/docs/products
const productApi = "https://dummyjson.com/products";


let allProducts = [];
let producTable = [];
let statusFetched = 0

fetch(productApi)
    .then((response) => response.json())
    .then((data) => {
        allProducts = data["products"];
        statusFetched = 1;
    })
    .catch((error) => {
        console.log(error);
    });

let allTags = new Set();

let runner = setInterval(function () {
    // console.log(allProducts);

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

    // console.log(producTable);
    // console.log(allTags)
    disTags.innerHTML = "";
    allTags.forEach(function (t) {
        let tagDiv = document.createElement("div");
        let tv = String(t).toLowerCase();
        // console.log(tv)
        tagDiv.classList.add("tag");
        tagDiv.innerHTML = `<label for="${tv}" >${String(tv)}</label>
                    <input class="tagInput" type="checkbox" value="${tv}" name="${tv}" id="${tv}">`;

        disTags.appendChild(tagDiv);
    })
    if (statusFetched == 1) {
        clearInterval(runner)
    }
}, 100);


function createData(data, search) {
    proContainer.innerHTML = "";
    let method = "";
    let radio = document.getElementsByName("sortPrice")
    radio.forEach(function (r) {
        if (r.checked) {
            method = r.value;
        }
        else {
            // console.log("else Radioi");
        }
    })

    if (method == "lth") {
        data = data.sort(function (a, b) { return a.price - b.price })
        // console.log(data);
    }
    else if (method == "htl") {
        data = data.sort(function (a, b) { return b.price - a.price })
    }
    else {
        // console.log("else 85");
        data = producTable;
    }

    let tagy = document.querySelectorAll(".tagInput")
    let selectedTags = new Set();
    if (selectedTags)
        tagy.forEach(function (tag) {
            if (tag.checked == true) {
                selectedTags.add(tag.value)
            }
        })
    // console.log(selectedTags.size)

    if (selectedTags.size > 0) {
        let newData = []
        selectedTags.forEach(function (tag) {
            let hasTag = producTable.filter(pro => pro.tags.includes(tag));
            hasTag.forEach(function (ht) {
                newData.push(ht);
            })
        })
        // newData = uniqBy(newData, JSON.stringify)
        dupDel = new Set(newData)
        data = []
        dupDel.forEach(function (s) {
            data.push(s)
        })
    }

    if (search != "" | search != " ") {
        // console.log(typeof (data));
        data = data.filter(function (pro) {
            let product = String(pro['name']).toLowerCase();
            if (product.includes(String(search).toLowerCase())) {
                return true;
            }
        })
        // console.log(data);
    }
    else {
        // Do nothing
        console.log("Else 99");
    }

    // Creating Main Dispay Content
    createDisplay(data)

}


function createDisplay(data) {

    data.forEach(function (pro, i) {
        // console.log("data . foreach");
        let searchNameL = pro['name'];
        searchNameL = String(searchNameL).toLowerCase();
        let newPro = document.createElement("div");
        newPro.classList.add("product");
        newPro.innerHTML = `
    <img src="${pro["image"]}" alt="${pro["name"]}" height="200px" width="300px">
    <h3 class="pro-title">${pro["name"]}</h2>
    <h5>${pro["price"]} $</h3>
    <p>Tags: ${pro["tags"]}</p>
    `;
        proContainer.appendChild(newPro);
    });
}


// create all products on display
let creator = setInterval(function () {
    createData(producTable, "");
    if (statusFetched == 1) {
        clearInterval(creator)
    }
}, 150);

clear.onclick = () => {
    console.log("Clear Clecked");
    document.querySelectorAll(".tagInput").forEach(f => f.checked = false)

    createDisplay(producTable);
}

searchBt.onclick = () => {

    let val = searchIN.value;
    createData(producTable, val);

}

applyTag.onclick = () => {

    createData(producTable, "")

}

// producTable.filter(pro => pro.tags.includes("beauty"))

// document.querySelectorAll(".tagInput").forEach(f => f.click())