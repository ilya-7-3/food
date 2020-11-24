function carts(){
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

    let newCart= new MyCart("img/tabs/elite.jpg","elite","Новая Карточка 1","Новый Текст","199");
    newCart.appOnWindow();

    let secondCart= new MyCart("img/tabs/elite.jpg","elite","Новая Карточка 2","Новый Текст","199");
    secondCart.appOnWindow();

    let thirdCart= new MyCart("img/tabs/elite.jpg","elite","Новая Карточка 3","Новый Текст","199");
    thirdCart.appOnWindow();

    }

    module.exports = carts;