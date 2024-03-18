const url = 'https://food-recipes-with-images.p.rapidapi.com/?q=chicken%20soup';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'da477da93amsh5d68c1ce65accb5p18115ejsn1c15c85043aa',
		'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
	}
};

const itemsInCart={};   // Object to store the food items going to order

function addItemToCart(x,y=1){
    const add = document.getElementById(`add${x}`);
    const added = document.getElementById(`added${x}`);
    const noOfItems = document.getElementById(`count${x}`);

    add.style.display='none';
    added.style.display='flex';
    noOfItems.textContent = y;

    storeLocally(x,y);  // storing the item to localstorage 
}

function increaseQuantity(x){
    const plus = document.getElementById(`plus${x}`);
    const noOfItems = document.getElementById(`count${x}`);
    noOfItems.textContent = parseInt(noOfItems.textContent)+1;
    storeLocally(x,noOfItems.textContent);
}

function decreaseQuantity(x){

    const add = document.getElementById(`add${x}`);
    const added = document.getElementById(`added${x}`);
    const noOfItems = document.getElementById(`count${x}`);
    const minus = document.getElementById(`minus${x}`);

    let val = parseInt(noOfItems.textContent);
     if(val>1){  
        noOfItems.textContent = --val;
        storeLocally(x,noOfItems.textContent);
        }
    else if(val === 1){
        add.style.display = 'inline';
        added.style.display = 'none';
        noOfItems.textContent = --val;
        localStorage.removeItem(x);
        }
}

function storeLocally(x,y){
    const title = document.getElementById(`title${x}`).textContent;
    const price = document.getElementById(`price${x}`).textContent;
    const noOfItems = document.getElementById(`count${x}`);
                
    const obj ={
                "title":title,
                "price":price,
                "quantity":y
                }

    itemsInCart[`${x}`]=obj;
    localStorage.setItem(x,JSON.stringify(obj));

}

function clearCart(){
    for(let i=0;i<localStorage.length;i++){
        let key = localStorage.key(i);        
        const add = document.getElementById(`add${key}`);
        const added = document.getElementById(`added${key}`);
        const noOfItems = document.getElementById(`count${key}`);
        
        add.style.display = 'inline';
        added.style.display = 'none';
        noOfItems.textContent = 0;
        // localStorage.removeItem(key);
    }
    localStorage.clear();

}


async function handlePromise(){
try {
	const response = await fetch(url, options);
	const result = await response.json();
	
    let container = document.querySelector(".collection");
    let no_of_items = result.d.length;
    
    function item_count(id,count=0){
        const ele = document.getElementById(id);
    }
    
    for(let i=0;i<no_of_items;i++){
        let title = result.d[i].Title;
        let img_link = result.d[i].Image;
        let img =`<img class="rounded-xl w-32 h-28 object-cover ml-10 my-4" src="${img_link}" alt="">`;
        let description = result.d[i].Instructions.slice(0,90);
        let cost = result.d[i].id%1000;
        let idForItem = result.d[i].id;

        const template = `
        <div class="food-item max-w-screen-md flex flex-col m-auto mt-4">
            <hr class="hr-line border-gray-300 border w-[100%]">
            <div class="flex justify-between">
                <div class="food-description mt-4 ">
                    <i class="fa-regular fa-circle-stop text-red-600"></i>
                    <p id="title${idForItem}" class="title font-bold">${title}</p> 
                    <p id="price${idForItem}" class="price text-sm">&#8377; ${cost}</p>  <!-- price -->
                    <p id="description${idForItem}" class="description mt-4 text-gray-400 text-sm">${description}</p> 
                </div>
                <div class="food-img relative ">
                    ${img} 
                    <div id="cart${idForItem}" class="cart">

                        <div id="add${idForItem}" class="add absolute bottom-2 left-16 cursor-pointer border  border-gray-400 rounded-md bg-white text-green-500 text-sm  font-bold w-20 h-8 text-center leading-7" onclick="addItemToCart(${idForItem},1)" >ADD  
                        </div>

                        <div id="added${idForItem}" class="added absolute bottom-2 left-16 hidden border  border-gray-400 rounded-md bg-white w-20 h-8 text-green-500 text-center leading-7 justify-around font-semibold text-xl">
                            <button class="minus" id="minus${idForItem}" onclick="decreaseQuantity(${idForItem})">-</button>
                            <span class="count" id="count${idForItem}">0</span>
                            <button class="plus" id="plus${idForItem}" onclick="increaseQuantity(${idForItem})">+</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            
        </div> `;
        container.innerHTML +=template;

    }
    updateQuantity() // calling the function to update quantity from local storage if present

} catch (error){
	console.error(error);
}

}

handlePromise();




function updateQuantity() {
    
	
    if(this.localStorage.length>0){

        for(let i=0;i<localStorage.length;i++){
            let key = localStorage.key(i);
            let val = JSON.parse(localStorage.getItem(key));
            
            console.log(key,val);
            console.log("Inside update quantity")

            const add = document.getElementById(`add${key}`);
            const added = document.getElementById(`added${key}`);
            const noOfItems = document.getElementById(`count${key}`);

            
            add.style.display='none';
            added.style.display='flex';
            noOfItems.textContent = val.quantity;
        }
    }
    
};
