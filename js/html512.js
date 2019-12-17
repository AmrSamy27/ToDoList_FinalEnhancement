let colorInput;
let toDoLists;
let divRow;
let divCol;
let itemName;
let downBtn;
let upBtn;
let deleteBtn;
let elements;
let toDoArr=[];


if (localStorage.length > 0) {
   elements=JSON.parse(localStorage.getItem('toDoList'));
   let eventElements =[];
   for (let i=0 ;i<elements.length;i++) {
        let element = elements[i];
    colorInput = document.createElement('input');
    itemName = document.createElement('p');
    colorInput.setAttribute('type', 'color');
    colorInput.value = element.color;
    itemName.innerHTML = element.name;
    createElements();

    eventElements.push(divCol);
    
}
    
    localStorageElementActions(eventElements);
} 
$('input[type="text"]').keypress(function (event) {

    if (event.keyCode == '13') {
        event.preventDefault();
        checkInputValidation();
    }

});
$('#add-btn').on('click', function () {
    if ($('form')[0].checkValidity()) {
        checkInputValidation();
    }
});

function checkInputValidation(){
    let check =true;

    let regex = /^[A-Za-z0-9 ]+$/;
    let regexSingleNum=/^\d+$/;

    if(regex.test($('input[type="text"]').val())&& !regexSingleNum.test($('input[type="text"]').val())){
let paragExist = $('#list-item div div p').length == 0 ? false : true;
if (paragExist > 0 ) {
    //////////////////////wa2ef hna
    
    $('#list-item div div p').each(function (index,element) {
        if($(this).text() == $('input[type="text"]').val().trim()){
            alert('This Name Is Already Exist');
            check = false;
            
        } 
    });
    if(check == true){
        createdElementActions(createRow());
    }

}
 else {
    
    createdElementActions(createRow());
}
}
else{
alert('The Name Shouldn\'t Has Spacial Charachter or Numbers Only!!!');
}
}


function createRow() {
    colorInput = document.createElement('input');
    itemName = document.createElement('p');
    colorInput.setAttribute('type', 'color');
    colorInput.value = '#8196a9';
    itemName.innerHTML = $('#itemName').val().trim();

        createElements();
        let elementObj;
            if(localStorage.length==0){
              
                localStorage.setItem('toDoList','[]');
                 elementObj = {
                    name:itemName.innerHTML,
                    color:colorInput.value
                };
                toDoArr.push(elementObj);
                localStorage.setItem('toDoList',JSON.stringify(toDoArr));
                toDoArr=[];

            }else{
                 elementObj = {
                    name:itemName.innerHTML,
                    color:colorInput.value
                };
                let elementArr =JSON.parse(localStorage.getItem('toDoList'));

                for (let i = 0; i < elementArr.length; i++) {
                    toDoArr.push(elementArr[i]);
                }
                
                toDoArr.push(elementObj);
        localStorage.setItem('toDoList',JSON.stringify(toDoArr));
        toDoArr=[];

            }
            
    return divCol; 
}


function createElements(){
    divRow = document.createElement('div');
    divCol = document.createElement('div');
    itemName.classList.add('text-white');
    itemName.classList.add('d-inline-block');
    downBtn = document.createElement('input');
    upBtn = document.createElement('input');
    deleteBtn = document.createElement('input');
    downBtn.setAttribute('type', 'button');
    upBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('type','button');
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('ml-1');
    deleteBtn.classList.add('btn-primary');
    deleteBtn.classList.add('float-right');
    deleteBtn.classList.add('mb-4');
    deleteBtn.classList.add('mt-4');
    deleteBtn.classList.add('buttonP');
    itemName.classList.add('float-left');
    itemName.classList.add('paragra');
    itemName.classList.add('colorIn');
    colorInput.classList.add('float-left');
    upBtn.classList.add('btn');
    upBtn.classList.add('buttonP');
    upBtn.classList.add('ml-1');
    upBtn.classList.add('float-right');
    upBtn.classList.add('btn-primary');
    upBtn.classList.add('mb-4');
    upBtn.classList.add('mt-4');
    downBtn.classList.add('btn');
    downBtn.classList.add('buttonP');
    downBtn.classList.add('btn-primary');
    downBtn.classList.add('float-right');
    downBtn.classList.add('mt-4');
    downBtn.classList.add('mb-4');
    divCol.classList.add('py-3');
    colorInput.classList.add('colorIn');
    colorInput.classList.add('ml-3');
    divRow.classList.add('my-3');
    downBtn.value = 'down';
    upBtn.value = 'up';
    deleteBtn.value = 'delete';
    divRow.classList.add('row');
    divCol.classList.add('col-12');
    divRow.appendChild(divCol);
    divCol.appendChild(itemName);
    divCol.appendChild(colorInput);
    divCol.appendChild(downBtn);
    divCol.appendChild(upBtn);
    divCol.appendChild(deleteBtn);
    divCol.style.backgroundColor = colorInput.value;
    document.querySelector('#list-item').appendChild(divRow);
}

function localStorageElementActions(parents) {
    for (let i = 0; i < parents.length; i++) {
        createdElementActions(parents[i]);
      }     
}

function createdElementActions(parent){
        let colorElement =  parent.querySelector('input[type="color"]');
             let oldColorValue = colorElement.value;
             colorElement.addEventListener('input',function(){
                 elements =JSON.parse(localStorage.getItem('toDoList'));
                 for (let i = 0; i < elements.length; i++) {
                     if(elements[i].name == this.previousSibling.innerHTML){
                        elements[i].color= this.value;
                        this.parentElement.style.backgroundColor = this.value;
                         let toDoListInLocal =JSON.stringify(elements);
                         localStorage.setItem('toDoList',`${toDoListInLocal}`);
                         oldColorValue=this.value;
                     }   
                 }
             });
             let buttons = parent.querySelectorAll('input[type="button"]');
             buttons.forEach(function(button){
                 button.addEventListener('click',function(){
                    if(button.value == 'up'){
                        let grandParent = parent.parentElement;
                        if (grandParent.previousElementSibling) {
                         grandParent.parentElement.insertBefore(grandParent, grandParent.previousElementSibling);
                     }
                     }else if (button.value == 'down'){
                        let grandParent = parent.parentElement;
                        if (grandParent.nextElementSibling) {
                     grandParent.parentElement.insertBefore(grandParent.nextElementSibling, grandParent);
                           }
                     }else if(button.value == 'delete'){
                        let text = parent.querySelector('p').innerHTML;
                        let color = parent.querySelector('input[type="color"]').value;
                          let toDO =JSON.parse(localStorage.getItem('toDoList')) ;

                             if(toDO.length == 1){
                                localStorage.removeItem('toDoList');
                             }else{
                                 for(let i = 0 ; i < toDO.length;i++){
                                    if( text == toDO[i].name ){
                                        toDO.splice(i,1);
                                    }
                                 }
                                 localStorage.setItem('toDoList',JSON.stringify(toDO));
                                 
                             }
                             parent.parentElement.remove();
                     }})})}