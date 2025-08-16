let listaCarrito = document.querySelector('.table tbody')


document.addEventListener('DOMContentLoaded',()=>{
    getProductCart();
})

let infoOrder = (pos)=>{
    let countProduct = document.querySelectorAll(".quantity input.number");
    let btnDecrement = document.querySelectorAll(".decrement i");
    let btnIncrement = document.querySelectorAll(".increment i");
    let totalPro = document.querySelectorAll(".total-Pro"); 

    //Eventos a los botones + y -
    let newValuePro = parseFloat(totalPro[pos].textContent.replace(/[^0-9.]/g, "")) || 0;
    btnIncrement[pos].addEventListener("click",()=>{
        let currentValue= Number(countProduct[pos].value);
        countProduct[pos].value = currentValue + 1;
        totalPro[pos].textContent = newValuePro + Number(totalPro[pos].textContent);
    });     
    btnDecrement[pos].addEventListener("click",()=>{
        let currentValue= Number(countProduct[pos].value);
        if(currentValue > 1){
            countProduct[pos].value = currentValue -1;
            totalPro[pos].textContent =  Number(totalPro[pos].textContent) - newValuePro;
        }
        
        
    });
    //Mostrar en consola las variables
    //   console.log(countProdut[pos]);
 }


let getProductCart =()=>{
    let product= []
    let productoPrevius = JSON.parse( localStorage.getItem('carrito'))
    if (productoPrevius !=null) {
        product = Object.values(productoPrevius);
    }
     
    product.forEach((dato, i)=>{
       let row = document.createElement('tr')
    row.innerHTML = `
               <td class="product-block">
               <a href="#" class="remove-from-cart-btn"><i class="fa-solid fa-x"></i></a>
               <img src="${dato.imagen}" alt="">
                <a href="product-detail.html" class="h6">${dato.nombre}"</a>
                </td>
               <td>
                    <p class="lead color-black">$${dato.precio}"</p>
                </td>
                 <td>
                   <div class="quantity quantity-wrap">
                     <div class="decrement"><i class="fa-solid fa-minus"></i></div>
                     <input type="text" name="quantity" value="1" maxlength="2" size="1" class="number">
                     <div class="increment"><i class="fa-solid fa-plus"></i></div>
                   </div>
                </td>
                <td>
                  <h6 class="total-Pro">${dato.precio}"</h6>
                </td>
    
        `
        listaCarrito.appendChild(row)
        infoOrder(i);


    })
}