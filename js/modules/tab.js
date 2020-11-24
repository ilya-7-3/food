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