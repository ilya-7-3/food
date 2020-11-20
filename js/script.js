window.addEventListener('DOMContentLoaded',()=>{
    tabContent=document.querySelectorAll('.tabcontent');
    tabHeaderItems=document.querySelector('.tabheader__items');
    tabHeaderItem=document.querySelectorAll('.tabheader__item');
    hideTabContent();
    OpenTabContent();
    tabHeaderItems.addEventListener('click',function(event){
        if(event.target && event.target.classList.contains('tabheader__item')){
            tabHeaderItem.forEach(function(item,i){
                if(event.target==item){
                    hideTabContent();
                    OpenTabContent(i);
                }
            })
        }
    })
});
function hideTabContent(){
    tabContent.forEach( item => {
        item.style.display='none';
        tabHeaderItem.forEach(function(item){
            item.classList.remove('tabheader__item_active');
        })
    });
}
function OpenTabContent(i=0){

        tabContent[i].style.display='block';
        tabHeaderItem[i].classList.add('tabheader__item_active');
}


let btnOpen = document.querySelectorAll('[data-open]'),
    btnClose = document.querySelector('[data-close]'),
    modal=document.querySelector('.modal');
    
    
    function open(){
        modal.style.display='block';
        document.body.style.overflow='hidden';
        clearTimeout(timeId);
    }
    function close(){
        modal.style.display='none';
        document.body.style.overflow='';
    }
    btnOpen.forEach(function(item){
        item.addEventListener('click',open); 
    });

    
    
    modal.addEventListener('click',function(e){
        if(e.target===modal || e.target.getAttribute('data-close')==''){
            close();
        }
        
    });
    document.addEventListener('keydown',(e)=>{
        if(e.code==="Escape"){
            close();
        }
    });
    let timeId = setTimeout(open,5000);
    
    function showModalByScroll(){
       
            
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            open();
            window.removeEventListener('scroll',showModalByScroll);    
        }
        
    }
    
    window.addEventListener('scroll', showModalByScroll);



class MyCart{
    constructor(src,alt,menuSubtitle,descr,price){
        this.src=src;
        this.alt=alt;
        this.menuSubtitle=menuSubtitle;
        this.descr=descr;
        this.price=price;
    }
    appOnWindow (){
        const element=document.createElement('div');
        element.innerHTML=`<div class="menu__item">
        <img src="${this.src}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">Меню "${this.menuSubtitle}"</h3>
        <div class="menu__item-descr">Меню "${this.menuSubtitle}" - ${this.descr}!</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`;
        document.querySelector('.menu .container').append(element);
    }
}

const newCart= new MyCart("img/tabs/elite.jpg","elite","Новая Карточка","Новый Текст","199")
newCart.appOnWindow();

const message = {
    loading:'Загрузка',
    success:'Мы с вами скоро свяжемся',
    error:'Произошла ошибка...'
};

const forms = document.querySelectorAll('form');

forms.forEach(item=>{
    postData(item);
});

function postData(form){
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
    
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.style.display='none';
        open();
        const thanksModal=document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=`
        <div class="modal__content">
        <div data-close class="modal__close">×</div>
        <div class="modal__title">${message.loading}</div>
        </div>`;
        document.querySelector('.modal').append(thanksModal);

        const formData = new FormData(form);
        
        fetch('server.php',{
            method:"POST",
            /* headers:{
                'Content-type':'application/json'
            }, */
            body:formData
        }).then(data=>data.text())
        .then(data=>{
            console.log(data);
                form.reset();
                document.querySelectorAll('.modal__title')[1].innerHTML=message.success;
                
                
                setTimeout(()=>{
                    thanksModal.remove();
                    prevModalDialog.style.display='block';
                    close();
                },4000);
        }).catch(()=>{
            document.querySelectorAll('.modal__title')[1].innerHTML=message.error;
        }).finally(()=>{
            form.reset();
        });
        /* request.addEventListener('load',()=>{
            if(request.status === 200){
                console.log(request.response);
                form.reset();
                document.querySelectorAll('.modal__title')[1].innerHTML=message.success;
                
                
                setTimeout(()=>{
                    thanksModal.remove();
                    prevModalDialog.style.display='block';
                    close();
                },4000);
            }
            else{
                showThanksModal(message.error);
            }
        }); */
    });
}

 /* fetch('db.json')
 .then(data=>data.json())
 .then(res=>console.log(res))
 */


let offerSliderWr = document.querySelector('.offer__slider-wrapper'),
offerSlider=document.querySelector('.offer__slider'),
slider = document.querySelectorAll('.offer__slide'),
current = document.querySelector('#current'),
total = document.querySelector('#total'),
next = document.querySelector('.offer__slider-next'),
back = document.querySelector('.offer__slider-prev'),
fl=0;
offerSlider.style.position='relative';
indicator = document.createElement('ol');
indicator.classList.add('indicator');
indicator.style.cssText=`
    position:absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display:flex;
    justify-content:center;
    margin-right:15%;
    margin-left:15%;
    list-style:none;
    `;
offerSlider.append(indicator);

for(let i=0;i<slider.length;i++){
    
dot = document.createElement('li');
dot.classList.add('dot');
dot.style.cssText=`
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right:3px;
    margin-left: 3px;
    cursor: pointer;
    background-color:#fff;
    background-clip:padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity:.5;
    transition:opasity .6s ease;
    list-style-type: none; 
    `;
indicator.append(dot);

}

dots=document.querySelectorAll('.dot');


total.innerHTML=slider.length;
function openSlider(i=0){
        slider[i].style.display='block';
        current.innerHTML=i+1;
        dots[i].style.backgroundColor='black';
}
function closeSlider(){
    slider.forEach(function(item,i){
        item.style.display='none';
        dots.forEach(function(item){
            item.style.backgroundColor='white';
        });
    });
}
closeSlider();
openSlider(fl);

next.addEventListener('click',function(){
    
    if(fl==slider.length-1){
        fl=-1;
    }
    fl++;
    closeSlider();
    openSlider(fl);
    
});
back.addEventListener('click',function(){
    if(fl==0){
        fl=slider.length;     
    }
    fl--;
    closeSlider();
    openSlider(fl);
});

indicator.addEventListener('click',function(event){
    if(event.target && event.target.classList.contains('dot')){
        dots.forEach(function(item,i){
            if(event.target==item){
                closeSlider();
                openSlider(i);
            }
        });
    }
});






