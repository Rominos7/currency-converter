
let buttons=document.querySelectorAll('.convert_buttons button');
let $how_much_input = document.querySelector('.input_currency_from input');
let $result_input = document.querySelector('.output_currency_to input');

let radio_buttons_from = document.querySelectorAll('.radio_buttons_from input');
let radio_buttons_to = document.querySelectorAll('.radio_buttons_to input');
let radio_bnt_buy_sale = document.querySelectorAll('.radio_bnt_buy_sale input');

let info_form = document.querySelector('.data');
let result_request;

let xml = new XMLHttpRequest();

let API_url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';


fetch(API_url)
.then(function(response){
    if(response.status !=200){
        console.log(`Alert ${response.status}`);
        return;
    }
    response.json().then(function(value){
        result_request = value;
        Show_info_val_buy();
     }) 
})
.catch(function(data){
    alert(`Error ${data}`);
})

for(let i = 0; i<radio_bnt_buy_sale.length;i++){ // Налаштовуємо клавіши вибору продажу/покупки валюти
    radio_bnt_buy_sale[i].addEventListener('click',function(){
       
       fetch(API_url)
       .then(function(response){
            if(response.status!=200){
                alert(`Alert ${response.status}`);
                return;
            }
            response.json().then(function(value){
                 result_request = value;
                 if(radio_bnt_buy_sale[0].checked == true){
                    Show_info_val_buy();
                 }
                 else if(radio_bnt_buy_sale[1].checked == true){
                    Show_info_val_sale();
                 }
            })
       })
       .catch(function(data){
           alert(`Error ${data}`);
       })
    
    
    
    })
}

buttons[0].addEventListener('click',function(){

    fetch(API_url)
    .then(function(response){
      if(response.status!=200){
        alert(`Alert ${respons.status}`);  
        return;
      }

      response.json().then(function(value){
         
        result_request = value;
        
        if(radio_bnt_buy_sale[0].checked == true){
              
            Show_info_val_buy();

            if(radio_buttons_from[0].checked==true){
                ChooseTo(0,0);
            }
            else if(radio_buttons_from[1].checked==true){
                ChooseTo(0,1);
            }
            else if(radio_buttons_from[2].checked==true){
                ChooseTo(0,2);
            }
            else if(radio_buttons_from[3].checked==true){
                ChooseTo(0,3);
            }

        }
        else if(radio_bnt_buy_sale[1].checked == true){

            Show_info_val_sale();

            if(radio_buttons_from[0].checked==true){
                ChooseTo(1,0);
            }
            else if(radio_buttons_from[1].checked==true){
                ChooseTo(1,1);
            }
            else if(radio_buttons_from[2].checked==true){
                ChooseTo(1,2);
            }
            else if(radio_buttons_from[3].checked==true){
                ChooseTo(1,3);    
            }

        } 


      })
    })
    .catch(function(data){
        alert(`Error ${data}`);
    })


})


function ChooseTo(index_buy_sale,index){ // головна функція конвектаціїї
    let how_much_input = parseFloat($how_much_input.value);
    let result = 0;

    if(index_buy_sale==0){

        if(index==0){  //-------------------------------------------------------
            if(radio_buttons_to[0].checked == true){          
            
                result = how_much_input;
                $result_input.value = `${result}`;
     
            }
            else if(radio_buttons_to[1].checked == true){
                 result = how_much_input*result_request[0].buy;
                 $result_input.value = `${result}`;

            }
            else if(radio_buttons_to[2].checked == true){
                result = how_much_input*result_request[1].buy;
                $result_input.value = `${result}`;

            }
            else if(radio_buttons_to[3].checked == true){
                result = how_much_input*result_request[2].buy;
                $result_input.value = `${result}`; 
            }
        }
        else if(index==1){
            if(radio_buttons_to[0].checked == true){          
            
                result = (how_much_input*(1/result_request[0].buy)); //перевод у гривні по принципу  грн = кіл.долл/долл на одн грн
                $result_input.value = `${result}`; 
     
            }
            else if(radio_buttons_to[1].checked == true){
                result = how_much_input;
                $result_input.value = `${result}`;
    
            }
            else if(radio_buttons_to[2].checked == true){
                result = (how_much_input*(1/result_request[0].buy))*result_request[1].buy;
                $result_input.value = `${result}`;
            }
            else if(radio_buttons_to[3].checked == true){
                result = (how_much_input*(1/result_request[0].buy))*result_request[2].buy;
                $result_input.value = `${result}`;
            }
        }
        else if(index==2){
            if(radio_buttons_to[0].checked == true){          
            
                result = (how_much_input*(1/result_request[1].buy));
                $result_input.value = `${result}`;
     
            }
            else if(radio_buttons_to[1].checked == true){
                result = (how_much_input*(1/result_request[1].buy))*result_request[0].buy;
                $result_input.value = `${result}`;
        
            }
            else if(radio_buttons_to[2].checked == true){
                result = how_much_input;
                $result_input.value = `${result}`;
            }
            else if(radio_buttons_to[3].checked == true){
                result = (how_much_input*(1/result_request[1].buy))*result_request[2].buy;
                $result_input.value = `${result}`;
            }
        }
        else if(index==3){
            if(radio_buttons_to[0].checked == true){          
            
                result = (how_much_input*(1/result_request[2].buy));
                $result_input.value = `${result}`;
     
            }
            else if(radio_buttons_to[1].checked == true){

                result = (how_much_input*(1/result_request[2].buy))*result_request[0].buy;
                $result_input.value = `${result}`;
 
            }
            else if(radio_buttons_to[2].checked == true){
                result = (how_much_input*(1/result_request[2].buy))*result_request[1].buy;
                $result_input.value = `${result}`;
            }
            else if(radio_buttons_to[3].checked == true){
                result = how_much_input;
                $result_input.value = `${result}`;
            }
        }   
    }
    else if(index_buy_sale==1){  // --------------------------------------------------
        if(index==0){
            if(radio_buttons_to[0].checked == true){          
                
                result = how_much_input;
                $result_input.value = `${result}`;
     
            }
            else if(radio_buttons_to[1].checked == true){
                 result = how_much_input*result_request[0].sale;
                 $result_input.value = `${result}`;

            }
            else if(radio_buttons_to[2].checked == true){
                result = how_much_input*result_request[1].sale;
                $result_input.value = `${result}`;

            }
            else if(radio_buttons_to[3].checked == true){
                result = how_much_input*result_request[2].sale;
                $result_input.value = `${result}`;
            }
        }
        else if(index==1){
            if(radio_buttons_to[0].checked == true){          
            
                result = (how_much_input*(1/result_request[0].sale));
                $result_input.value = `${result}`; 
     
            }
            else if(radio_buttons_to[1].checked == true){
                result = how_much_input;
                $result_input.value = `${result}`;
    
            }
            else if(radio_buttons_to[2].checked == true){
                result = (how_much_input*(1/result_request[0].sale))*result_request[1].sale;
                $result_input.value = `${result}`;
            }
            else if(radio_buttons_to[3].checked == true){
                result = (how_much_input*(1/result_request[0].sale))*result_request[2].sale;
                $result_input.value = `${result}`;
            }
        }
        else if(index==2){
            if(radio_buttons_to[0].checked == true){          
            
                result = (how_much_input*(1/result_request[1].sale));
                $result_input.value = `${result}`;
     
            }
            else if(radio_buttons_to[1].checked == true){
                result = (how_much_input*(1/result_request[1].sale))*result_request[0].sale;
                $result_input.value = `${result}`;
        
            }
            else if(radio_buttons_to[2].checked == true){
                result = how_much_input;
                $result_input.value = `${result}`;
            }
            else if(radio_buttons_to[3].checked == true){
                result = (how_much_input*(1/result_request[1].sale))*result_request[2].sale;
                $result_input.value = `${result}`;
            }
        }
        else if(index==3){
            if(radio_buttons_to[0].checked == true){          
            
                result = (how_much_input*(1/result_request[2].sale));
                $result_input.value = `${result}`;
     
            }
            else if(radio_buttons_to[1].checked == true){

                result = (how_much_input*(1/result_request[2].sale))*result_request[0].sale;
                $result_input.value = `${result}`;
 
            }
            else if(radio_buttons_to[2].checked == true){
                result = (how_much_input*(1/result_request[2].sale))*result_request[1].sale;
                $result_input.value = `${result}`;
            }
            else if(radio_buttons_to[3].checked == true){
                result = how_much_input;
                $result_input.value = `${result}`;
            }
        } 
    }

}

function Show_info_val_buy(){
    info_form.innerHTML = '';
    info_form.innerHTML+=`<p>USD = ${result_request[0].buy} UAH</p>`;
    info_form.innerHTML+=`<p>EUR = ${result_request[1].buy} UAH</p>`;
    info_form.innerHTML+=`<p>RUB = ${result_request[2].buy} UAH</p>`;
}

function Show_info_val_sale(){
    info_form.innerHTML = '';
    info_form.innerHTML+=`<p>USD = ${result_request[0].sale} UAH</p>`;
    info_form.innerHTML+=`<p>EUR = ${result_request[1].sale} UAH</p>`;
    info_form.innerHTML+=`<p>RUB = ${result_request[2].sale} UAH</p>`;
}




