//varaibles globales
let iconCart = document.querySelector(".carrito");
let iconCount = document.querySelector(".contar-pro");
let btnProducts = document.querySelectorAll(".btn-product");
let contentProducts = document.querySelector('.content-pro')
let con = 1;

//evento al navegador
document.addEventListener("DOMContentLoaded",()=>{
    getProductData();
})

let getInfoProduct = (id)=>{
    let product= []
    let productoPrevius = JSON.parse( localStorage.getItem('productos'))
    if (productoPrevius !=null) {
        product = Object.values(productoPrevius);
    }
    console.log(product[id]);
    

    

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
