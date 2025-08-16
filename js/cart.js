//varaibles globales
let iconCart = document.querySelector(".carrito");
let iconCount = document.querySelector(".contar-pro");
let btnProducts = document.querySelectorAll(".btn-product");
let contentProducts = document.querySelector('.content-pro')
let con = 1;
let listCard = document.querySelector('.list-cart tbody')
let btnCard =document.querySelector('.btn-cart')

//evento al navegador
document.addEventListener("DOMContentLoaded",()=>{
    getProductData();
})



//agregar evento al icono del carrito
iconCart.addEventListener('click',()=>{

    if(listCard.parentElement.style.display == 'none'){
        listCard.parentElement.style.display = 'block';
    }else
    listCard.parentElement.style.display = 'none';
})

//agregar una funcion para guargar los producto del carrito en localstorage
let storageProduct =(producto)=>{

    let product= []
    let productoPrevius = JSON.parse( localStorage.getItem('carrito'))
    if (productoPrevius !=null) {
        product = Object.values(productoPrevius);
    }
    product.push(producto)
    localStorage.setItem('carrito',JSON.stringify(product));
    location.href = 'cart.html'

}

let getInfoProduct = (id)=>{
    let product= []
    let productoPrevius = JSON.parse( localStorage.getItem('productos'))
    if (productoPrevius !=null) {
        product = Object.values(productoPrevius);
    }

    //console.log(product[id]);
    //llamar funcion addProCart
    addProCart(product[id]);
    alert('producto agregado al carrito')
    btnCard.addEventListener('click', ()=>{
        storageProduct(product[id])
    })

    
    
   
    iconCount.textContent = con;
    con++;

    
}

//funcion para llevar  el producto al  carrito
let addProCart=(pro)=>{
    let row = document.createElement('tr')
    row.innerHTML = `
        <td>${con}</td>
        <td><img src="${pro.imagen}" width="70px"> </td>
        <td>${pro.nombre} </td>
        <td>${pro.precio} </td>
        <td><button onclick="deleteCard(${con})" type="button"class="btn btn-danger btn-delete">✖︎</button> </td>
    
    `
    listCard.appendChild(row)
}


let deleteCard = (id)=>{
    let btnEliminar = document.querySelectorAll('.btn-delete')
    btnEliminar[(id-1)].parentElement.parentElement.remove();
  

    console.log(btnEliminar[(id-1)]);
    if (Number(iconCount.textContent) > 0 ) {
     iconCount.textContent = con--;   

        
    }
    
}

//funcion para traer datos de bd
let getProductData = async ()=>{
    let url = "http://localhost/backend-apicrud/productos";
    try {
        let respuesta = await fetch(url,{
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        });
        if (respuesta.status === 204) {
           console.log("No hay datos en la BD");
        }else{
            let tableData = await respuesta.json();
            console.log(tableData);
            //agregar los datos de la tabla a localStorage
            localStorage.setItem("productos", JSON.stringify(tableData));
            //agregar los datos a la tabla
            tableData.forEach((dato, i)=>{
                
                contentProducts.innerHTML += `
                
                    <div class="col-md-3 py-3 py-md-0">
                        <div class="card">
                        <img src="${dato.imagen}" alt="">
                        <div class="card-body">
                            <h3>Tasty ${dato.nombre} </h3>
                            <p><td> ${dato.descripcion} </td></p>
                            <h5>${dato.precio}
                            <span class="btn-product" onclick=" getInfoProduct(${i+1})"><i class="fa-solid fa-basket-shopping"></i></span></h5>
                        </div>
                        </div>
                    </div>
                   
                `;
                
            });
           
        }
    } catch (error) {
        console.log(error);
    }

};
