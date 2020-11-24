/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/carts.js":
/*!*****************************!*\
  !*** ./js/modules/carts.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function modal(){
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
    


}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function slider(){
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
                    fl=i;
                }
            });
        
        }
    });

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tab.js":
/*!***************************!*\
  !*** ./js/modules/tab.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function tab(){
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
}

module.exports = tab;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 54:0-14 */
/***/ ((module) => {

function timer(id, deadline) {
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tab */ "./js/modules/tab.js");
/* harmony import */ var _modules_tab__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_tab__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_carts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/carts */ "./js/modules/carts.js");
/* harmony import */ var _modules_carts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_carts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_slider__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_calc__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_timer__WEBPACK_IMPORTED_MODULE_5__);







window.addEventListener('DOMContentLoaded',()=>{
    _modules_tab__WEBPACK_IMPORTED_MODULE_0___default()();
    _modules_modal__WEBPACK_IMPORTED_MODULE_1___default()();
    _modules_carts__WEBPACK_IMPORTED_MODULE_2___default()();
    _modules_slider__WEBPACK_IMPORTED_MODULE_3___default()();
    _modules_calc__WEBPACK_IMPORTED_MODULE_4___default()();
    _modules_timer__WEBPACK_IMPORTED_MODULE_5___default()('.timer', '2021-06-11');


});




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map