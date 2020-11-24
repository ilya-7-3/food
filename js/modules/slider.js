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