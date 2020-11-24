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