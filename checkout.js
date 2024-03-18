function increaseQuantity(x){
    const noOfItems = document.getElementById(`count${x}`);
    noOfItems.textContent = parseInt(noOfItems.textContent)+1;

    const val = JSON.parse(localStorage.getItem(x));
    val.quantity = parseInt(val.quantity)+1; 
    
    
    localStorage.setItem(x,JSON.stringify(val));
    changeCalculations(x,"add");
}

function decreaseQuantity(x){
    const noOfItems = document.getElementById(`count${x}`);

    let val = parseInt(noOfItems.textContent);
     if(val>1){  
        noOfItems.textContent = parseInt(noOfItems.textContent)-1;
        const val = JSON.parse(localStorage.getItem(x));
        val.quantity = parseInt(val.quantity)-1; 
        localStorage.setItem(x,JSON.stringify(val));

        changeCalculations(x,"minus");
        }
    else if(val === 1){
        localStorage.removeItem(x);
        window.location.reload();
        }
}

function changeCalculations(x,y){
    const itemPrice = document.getElementById(`pricexquantity${x}`);
    const val = JSON.parse(localStorage.getItem(x));
    val.quantity = parseInt(val.quantity); 
    itemPrice.innerHTML = `&#8377;${parseInt(val.price.slice(1))*val.quantity}`;

    const totalprice_without_gst = document.getElementById(`totalprice_without_gst`);
    let a = parseInt((totalprice_without_gst.innerHTML).slice(1));
    if(y==="add"){
        //here slice is used to remove the rupee symbol and get only the cost.
        totalprice_without_gst.innerHTML = `&#8377;${a+parseInt(val.price.slice(1))}`;
    }
    else{
        totalprice_without_gst.innerHTML = `&#8377;${a-parseInt(val.price.slice(1))}`;
    }
    const gst = document.getElementById('gst');                         // updating gst and restaurent charges.
    gst.innerHTML = `&#8377;${parseInt(totalprice_without_gst.innerHTML.slice(1))/10}`;

    const amountToBePaid = document.getElementById("amountToBePaid");   // updating the total amount to be paid.
    let b = parseInt(totalprice_without_gst.innerHTML.slice(1));
    amountToBePaid.innerHTML = `&#8377;${b+b/10}`;
}


function displayCartItems(){
    let x=0;
    if(localStorage.length>0){
        for(let i=0;i<localStorage.length;i++){
            const key = localStorage.key(i);
            const val = JSON.parse(localStorage.getItem(key));
            const title = val.title;
            const price = parseInt(val.price.slice(1));
            const quantity = parseInt(val.quantity);
            x += price*quantity;
            const container = document.querySelector('#container');
            const temp = 
                        `<div class="flex p-1 mt-1 ">
                            <div class="inline ml-6 w-48 text-sm text-wrap text-gray-500">${title}</div>
                            <div id="added" class="inline ml-2 border border-gray-400 rounded-sm bg-white w-16 h-6 text-green-500 text-center leading-5 justify-around font-semibold text-sm">
                                <button type="button" class="minus" id="minus${key}" onclick="decreaseQuantity(${key})">-</button>
                                <span  class="count" id="count${key}">${quantity}</span>
                                <button type="button" class="plus" id="plus${key}" onclick="increaseQuantity(${key})">+</button>
                            </div>
                            <div id="pricexquantity${key}" class="mx-6 text-sm text-gray-500">&#8377;${quantity*price}</div>
                        </div>`

            // 
            container.innerHTML += temp;
        }
        const totalprice_without_gst = document.getElementById("totalprice_without_gst");
        const gst = document.getElementById("gst");
        const finalAmount = document.getElementById("amountToBePaid");
        
        // amountToBePaid
        const charges = x/10;
        gst.innerHTML = `&#8377;${charges}`;
        totalprice_without_gst.innerHTML=`&#8377;${x}`;
        finalAmount.innerHTML = `&#8377; ${x+charges}`;
        
    }
}

displayCartItems();

