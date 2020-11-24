function calc(){
    let sex='famale',growth,weight,age,fizActive=1.375,
    input=document.querySelector('#input').children, BMR,
    calculatingResult=document.querySelector('#calculatingResult'),
    error;
    error=document.createElement('div');
            error.classList.add('error');
            error.innerHTML='Заполните все поля корректно';
            error.style.cssText=`
            text-align: center;
            font-size: 15px;
            margin-top: 7px;
            color:red;
            `;
      
    function clearActive(element){
        elements=document.querySelectorAll(element);
        elements.forEach(function(item,i){
            item.classList.remove('calculating__choose-item_active');
        });
    }
    function calc(growth,weight,age,sex){
        if((growth>0 && growth<200) && (weight>0 && weight<200) && (age>0 && age<200)){
            error.remove('error');
            if(sex=='male'){
                calculatingResult.innerHTML=((88.36 + (13.4 * weight) + (4.8 * growth) - (5.7 * age))*fizActive).toFixed(0);
            }else{
                calculatingResult.innerHTML=((447.6 + (9.2 * weight) + (3.1 * growth) - (4.3 * age))*fizActive).toFixed(0);
            }
            
        }else{
            document.querySelectorAll('.calculating__subtitle')[1].append(error);        
            calculatingResult.innerHTML='___';        
        }
    }
    document.querySelector('#gender').addEventListener('click',function(e){
            
        if(e.target.getAttribute('data-gender')){
            sex=e.target.getAttribute('data-gender');
            clearActive('[data-gender]');
            e.target.classList.add('calculating__choose-item_active');
            console.log(sex);
            calc(growth,weight,age,sex);
        }
    });
    document.querySelector('#active').addEventListener('click',function(e){
        if(e.target.getAttribute('data-active')){
            fizActive=e.target.getAttribute('data-active');
            clearActive('[data-active]');
            e.target.classList.add('calculating__choose-item_active');
            console.log(fizActive);
            calc(growth,weight,age,sex);
        }
    });
    calculatingResult.innerHTML='___';
    document.querySelector('#input').addEventListener('change',function(e){
        if(e.target && e.target.classList.contains('calculating__choose-item')){
            switch(e.target.getAttribute('id')){
                case 'height':
                    growth=e.target.value;
                    break;
                case 'weight':
                    weight=e.target.value;
                    break;
                case 'age':
                    age=e.target.value;
                    break;
            }    
            calc(growth,weight,age,sex);                
        }
    });
    
}

module.exports = calc;