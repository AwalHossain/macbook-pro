
// Here are All Selector you can find
const memory8GB = document.getElementById('memory8gb');
const memory16GB = document.getElementById('memory16gb');
const ssd56GB = document.getElementById('ssd56gb');
const ssd512GB = document.getElementById('ssd512gb');
const ssd1TB = document.getElementById('ssd1tb');
const freeDelivery = document.getElementById('freeDelivery');
const costlyDelivery = document.getElementById('costlyDelivery')
const promocode = document.getElementById('promoCode')
const applyDiscountBtn = document.getElementById('discountApply')
//Money related Selector
const bestPrice = document.getElementById('bestPrice')
const extraMemoryCost = document.getElementById('extraMemory');
const extraStorageCost = document.getElementById('extraStorage');
const deliveryCharge = document.getElementById('deliveryCharge')
const totalPrice = document.getElementById('totalPrice')
const discountPrice = document.getElementById('discount')


//Using function for Extra charge for extra storage and memory
function extraCharge(extraProductCost){
    extraProductCost.innerText = 180;
    totalCost()
}

// Using function for neutral charge/ don't need to pay for
function neutralCharge(neutralProductCost){
    neutralProductCost.innerText = 0;
    totalCost()
}


// All the Event Listner are here in this section 

memory8GB.addEventListener('click', function(){
   neutralCharge(extraMemoryCost);
   
})
memory16GB.addEventListener('click', function(){
    extraCharge(extraMemoryCost);
})
ssd56GB.addEventListener('click', function(){
    neutralCharge(extraStorageCost);
})
ssd512GB.addEventListener('click', function(){
    extraStorageCost.innerText = 100;
    totalCost()
})
ssd1TB.addEventListener('click', function(){
    extraCharge(extraStorageCost);
})
freeDelivery.addEventListener('click',function(){
    neutralCharge(deliveryCharge);
})
costlyDelivery.addEventListener('click',function(){
    deliveryCharge.innerText = 20;
    totalCost()
})

// All the basic calculation are happened in this funtion
function calculate(){
    totalPrice.innerText= parseInt(bestPrice.innerText)+ parseInt(extraMemoryCost.innerText) + parseInt(extraStorageCost.innerText) + parseInt(deliveryCharge.innerText)
 return totalPrice.innerText;
}

// passed the calculate function to the totalCost function to hold the total value before submit promo code
function totalCost(){
discountPrice.innerText =calculate();

return discountPrice.innerText;
}

//  here, i calculate 20% discount promo code
const message= document.getElementById('error')
applyDiscountBtn.addEventListener('click', function(){
    let cost = totalCost();
    console.log(cost);
    if(promocode.value == 'stevekaku'){
        let deductionCost = cost * 20/100 ;
        discountPrice.innerText = cost - deductionCost;
        console.log(cost);
        message.style.color="green"
        message.textContent = 'Your promo code successfully added'
        promocode.value = ''
        // applyDiscountBtn.disabled=true
    }
    else{
        message.style.color="red"
message.textContent= "Coupon code is invalid!!"
    }
})
