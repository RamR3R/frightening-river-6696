let api = `https://63f59a1b3f99f5855dc408c8.mockapi.io/Assets/Products/?type=bag`;
let DataBase;
fetch(api)
.then(result=>result.json())
.then(data=>{
    console.log(data);
    DataBase = data;
    display(DataBase);
})
.catch(Error=>{console.error(Error)})


let search = document.getElementById("search-btn");
search.addEventListener("click",()=>{
    let searchInput  = document.getElementById("search-input")
    searchInput = searchInput.value;
    searchInput = searchInput.toLowerCase();
    console.log(searchInput)
    let filterData = DataBase.filter((element)=>{
        if(element.color.toLowerCase().includes(searchInput) || element.name.toLowerCase().includes(searchInput)|| element.type.toLowerCase().includes(searchInput) || element.sex.toLowerCase().includes(searchInput))
        return true;
        else
        return false;
    })
    console.log(filterData);
    display(filterData)
})

let filter = document.querySelector("#submitprice");
filter.addEventListener("click",()=>{
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    let filterData = DataBase.filter((element)=>{
        if(element.price <= to && element.price>= from)
        return true;
        else
        return false;
    })
    display(filterData);
})
let reset = document.getElementById("reset");
reset.addEventListener("click",()=>{
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
    display(DataBase);
})

function display(data)
{
    let body  = document.querySelector("#container");
    body.innerHTML = null;
    if(data.length == 0){
        let h1 = document.createElement("h1");
        h1.innerText = "No result Found :(";
        body.append(h1);
    }
    else
    data.forEach(element => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src",element.image1);
        img.addEventListener("click",()=>{
            localStorage.setItem("indi",JSON.stringify(element));
            window.location.href = "./indi.html";
        })
        let title = document.createElement("h3");
        title.innerText = element.name;
        let price = document.createElement("h4");
        price.innerText = element.price;
        let add = document.createElement("div");
        let wish = document.createElement("button");
        wish.innerText = "Add to WishList";
        wish.addEventListener("click",()=>{
            wish.innerText = "WishListed"
            wish.style.backgroundColor = 'pink';
            let LS  =  JSON.parse(localStorage.getItem("wish")) || [];
            if(contains(element,LS))
            {
            alert("Already in cart");
            }
            else{
            element.quantity = 1;
            LS.push(element);
            localStorage.setItem("cart",JSON.stringify(LS));
            alert("Product Added to Cart");
            }
        })
        let buy = document.createElement("button");
        buy.innerText = "Buy";
        buy.addEventListener("click",()=>{
            let LS  =  JSON.parse(localStorage.getItem("cart")) || [];
            LS.push(element);
            localStorage.setItem("cart",JSON.stringify(LS));
            alert("Product added to cart");
        })
        add.append(wish,buy);
        card.append(img,title,price,add);
        body.append(card);
    });
    
}


function contains(obj,list)
{
    for(let i = 0 ; i<list.length ;i++)
    {
        if(list[i].name==obj.name)
        return true;
    }
    return false;
}