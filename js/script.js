import tab from './modules/tab';
import modal from './modules/modal';
import carts from './modules/carts';
import slider from './modules/slider';
import calc from './modules/calc';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded',()=>{
    tab();
    modal();
    carts();
    slider();
    calc();
    timer('.timer', '2021-06-11');


});


