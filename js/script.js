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
        console.log(window.pageYOffset);
            console.log(document.documentElement.clientHeight);
            console.log(document.documentElement.scrollHeight);
            
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

 fetch('db.json')
 .then(data=>data.json())
 .then(res=>console.log(res))




