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
const pagePrev = document.getElementById('pagePrev');
const pageNext = document.getElementById('pageNext');
const atpage = document.getElementById('atpage');
const cEmpty = document.getElementById("cEmpty");
const cFilled = document.getElementById("cFilled");
const cart = document.getElementById("cartMain");
const cartClose = document.getElementById("cartClose");
const cartList = document.getElementById("cartList");


// API Reference
// https://dummyjson.com/docs/products
const productApi = "https://dummyjson.com/products";


let allProducts = [];
let producTable = [];
let statusFetched = 0

let cartItems = [];

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
            id: p["id"],
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

let appliedData = []
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
        appliedData = data
        // console.log(data);
    }
    else if (method == "htl") {
        data = data.sort(function (a, b) { return b.price - a.price })
        appliedData = data
    }
    else {
        // console.log("else 85");
        data = producTable;
        appliedData = data
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
            appliedData.push(s)
        })
        appliedData = data
    }

    if (search != "" | search != " ") {
        // console.log(typeof (data));
        data = data.filter(function (pro) {
            let product = String(pro['name']).toLowerCase();
            if (product.includes(String(search).toLowerCase())) {
                return true;
            }
        })
        appliedData = data
        // console.log(data);
    }
    else {
        // Do nothing
        console.log("Else 99");
    }

    // Creating Main Dispay Content
    // createDisplay(data)
    // paginateData(appliedData, 6, 0)

}

function paginateData(data, limit, start) {
    let pData = []
    // console.log(data.length)
    for (let i = start; i < limit; i++) {
        pData.push(data[i])
    }
    createDisplay(pData)
}

// window.onload = function () {
//     localStorage.setItem("initial", 0)
// }

let page = parseInt(atpage.textContent)
pagePrev.onclick = () => {
    pageNext.style.pointerEvents = "all"
    page--;
    atpage.textContent = page;
    let limit = page * 6;
    let start = limit - 6;
    paginateData(appliedData, limit, start)
    if (page <= 1) {
        pagePrev.style.pointerEvents = "none";
    }

}

pageNext.onclick = () => {
    pagePrev.style.pointerEvents = "all";
    page++;
    atpage.textContent = page;
    let limit = page * 6;
    let start = limit - 6;
    // console.log(limit)
    // console.log(start)

    paginateData(appliedData, limit, start)

    let pageCount = Math.ceil(appliedData.length / 6)
    console.log(pageCount);
    if (page >= pageCount) {
        pageNext.style.pointerEvents = "none"
        console.log(appliedData.length)
    }
}

// function createDisplay(data) {

//     for (let [i, pro] of data.entries()) {
//         console.log(pro)
//         console.log(i)
//         // console.log("data . foreach");
//         let searchNameL = pro['name'];
//         searchNameL = String(searchNameL).toLowerCase();
//         let newPro = document.createElement("div");
//         newPro.classList.add("product");
//         newPro.innerHTML = `
//         <img src="${pro["image"]}" alt="${pro["name"]}" height="200px" width="300px">
//         <h3 class="pro-title">${pro["name"]}</h2>
//         <h5>${pro["price"]} $</h3>
//         <p>Tags: ${pro["tags"]}</p>
//         `;
//         proContainer.appendChild(newPro);
//     }
// }

let atcBTNS;
function createDisplay(data) {
    proContainer.innerHTML = "";
    data.forEach(function (pro, i) {
        // console.log("data . foreach");
        let searchNameL = pro['name'];
        searchNameL = String(searchNameL).toLowerCase();
        let newPro = document.createElement("div");
        newPro.classList.add("product");
        newPro.innerHTML = `
    <img class="thumb" src="${pro["image"]}" alt="${pro["name"]}" height="200px" width="300px">
    <h3 class="pro-title">${pro["name"]}</h2>
    <h5>${pro["price"]} $</h3>
    <p>Tags: ${pro["tags"]}</p>
    <button class="atcButton" id="${pro["id"]}"> Add To Cart </button>
    `;
        proContainer.appendChild(newPro);
    });

    atcBTNS = "";
    atcBTNS = document.querySelectorAll(".atcButton")
    atcBTNS.forEach(function (b) {
        b.onclick = () => {
            cEmpty.style.display = "none";
            cFilled.style.display = "block";
            console.log("Clickecd", b.getAttribute("id"))
            // let item = document.getElementById(b.getAttribute("id"))
            cartItems.push(appliedData.find(f => f.id == b.getAttribute("id")));
        }
    })

}


// create all products on display
let creator = setInterval(function () {
    if (statusFetched == 1) {
        createData(producTable, "");
        paginateData(appliedData, 6, 0)
        clearInterval(creator)
    }
}, 150);

clear.onclick = () => {
    console.log("Clear Clecked");
    document.querySelectorAll(".tagInput").forEach(f => f.checked = false)
    pageNext.style.pointerEvents = "all"
    pagePrev.style.pointerEvents = "none";
    page = 1
    atpage.textContent = page;
    // createDisplay(producTable);
    paginateData(producTable, 6, 0)
}

searchBt.onclick = () => {
    let val = searchIN.value;
    createData(producTable, val);
    page = 1;
    atpage.textContent = page;
    paginateData(appliedData, appliedData.length, 0)
    pageNext.style.pointerEvents = "all"
    pagePrev.style.pointerEvents = "none";

}

applyTag.onclick = () => {
    createData(producTable, "")
    // createDisplay(appliedData)
    atpage.textContent = page;
    page = 1;
    paginateData(appliedData, appliedData.length, 0)
    pageNext.style.pointerEvents = "all"
    pagePrev.style.pointerEvents = "none";

}

// producTable.filter(pro => pro.tags.includes("beauty"))

// document.querySelectorAll(".tagInput").forEach(f => f.click())


cEmpty.onclick = () => {
    cart.style.display = "flex";
}
cFilled.onclick = () => {
    cart.style.display = "flex";
    cartList.innerHTML = "";

    let cartUL = document.createElement("ul");
    cartItems.forEach(function (i, index) {
        let cartProduct = document.createElement("li")
        cartProduct.innerHTML = `
            ${index} . ${i.name}
        `
        cartUL.appendChild(cartProduct);
    })

    cartList.innerHTML = cartUL;

}

cartClose.onclick = () => {
    cart.style.display = "none";
}