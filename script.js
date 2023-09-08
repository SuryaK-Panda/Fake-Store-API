function LoadCategories(){
    fetch("http://fakestoreapi.com/products/categories")
    .then(function(response){
        return response.json();
    })
    .then(function(categories){
        categories.unshift("all");
        for(var category of categories){
            var option=document.createElement("option");
            option.text=category.toUpperCase();
            option.value=category;
            document.getElementById("listCategories").appendChild(option);
        }
    })
}
function loadProducts(url){
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(products){
        document.querySelector("main").innerHTML="";
        for(var product of products){
            var div=document.createElement("div");
            div.classNmae="card";
            div.style.width="250px";
            div.style.margin="10px";
            div.style.padding="10px";
            div.innerHTML=`
            <img src=${product.image} class="card-img-top" height="250">
            <div class="card-header text-white" style="height:100px"><p>${product.title}</p></div>
            <div class="card-body">
                <dl class="text-white">
                    <dt>Price</dt>
                    <dd>${product.price}</dd>
                    <dt>Rating</dt>
                    <dd><span class="bi-star-fill text-success">&nbsp;&nbsp;</span>${product.rating.rate} [${product.rating.count}]</dd>
                </dl>
            </div>
            <div class="card-footer">
                <button class="w-100 bg-danger text-white" style="border-radius:15px" onclick="AddClick(${product.id})">
                   <span class="bi-cart4"></span>
                   Add to Cart
                </button>
            </div>
            `;
            document.querySelector("main").appendChild(div);
        }
    })
}
function bodyload(){
    LoadCategories();
    loadProducts("http://fakestoreapi.com/products");

}
function CategoryChanged(){
    var categoryName=document.getElementById("listCategories").value;
    if (categoryName=="all"){
        loadProducts("http://fakestoreapi.com/products");
    }else{
        loadProducts(`http://fakestoreapi.com/products/category/${categoryName}`);
    }
}
function NavClick(categoryName){
    if(categoryName=="all"){
        loadProducts("http://fakestoreapi.com/products");
    }else{
        loadProducts(`http://fakestoreapi.com/products/category/${categoryName}`);
    }
}
// function addedCartItems(){
//     fetch ("http://fakestoreapi.com/products")
//     .then (function(response){
//         return response.json();
//     })
//     .then (function(products){
//         document.getElementById("addedItems").innerHTML="";
//         var tr=document.createElement("tr");
//         tr.innerHTML=`
//         <td>${products.title}</td>
//         <td>${products.price}</td>
//         <td><img src=${products.image}></td>
//         `;
//         document.getElementById("addedItems").appendChild(tr);
//     })
// }
var cartitems=[];
function GetCartitemsCount(){
    document.getElementById("lblcount").innerHTML=cartitems.length;
}
function AddClick(id){
    fetch(`http://fakestoreapi.com/products/${id}`)
    .then (function(response){
        return response.json();
    })
    .then (function(product){
        cartitems.push(product);
        alert(`${product.title}\nAdded to Cart`);
        GetCartitemsCount();
        var tr=document.createElement("tr");
        tr.style.height="50px";
        tr.innerHTML=`
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td><img src=${product.image}></td>
        `;
        document.getElementById("addedItems").appendChild(tr);
    })
}