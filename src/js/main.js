/*ADD / REMOVE INTEREST*/
function addInterest(){
    var name_interest = document.getElementById("name-interest");
    var interests = document.getElementById("interests");
    if(name_interest.value != '' && name_interest.value != ' '){
        var span = document.createElement('span');
        span.className='interest';
        span.innerHTML = name_interest.value;
        interests.insertBefore(span, interests.firstChild);
        span.addEventListener("click", remove);
    }
}

remove=function(e){
	if (typeof this.remove === 'function') {
		this.remove();
	} else {
		this.parentNode.removeChild(this);
	}
    //this.remove();
}

for(var i = 0; i < document.getElementsByClassName('interest').length; i++) {
    document.getElementsByClassName('interest')[i].addEventListener("click", remove)
}

/*CHANGE INFO USER*/
function setDisplayForChangeUserInfo(elem, id_input_for_new_value){
    elem.style.display="none";
    input_for_new_value = document.getElementById(id_input_for_new_value);
    input_for_new_value.style.display="block";
    input_for_new_value.focus();
    
    input_for_new_value.value = elem.textContent;
        
    input_for_new_value.onblur = (function(){
        if(input_for_new_value.value != ''){
            elem.textContent = input_for_new_value.value;
            localStorage.setItem(elem.id, input_for_new_value.value);
        }
        elem.style.display="block";
        input_for_new_value.style.display="none";        
    });
    
}

/*LOCAL STORAGE*/
function ready() {
    if (localStorage.getItem('username') !== null) {
        document.getElementById("username").innerHTML = localStorage.getItem('username');
    }
    if (localStorage.getItem('value-user-phone') !== null) {
        document.getElementById("value-user-phone").innerHTML = localStorage.getItem('value-user-phone');
    }
    if (localStorage.getItem('value-user-email') !== null) {
        document.getElementById("value-user-email").innerHTML = localStorage.getItem('value-user-email');
    }
}
  
document.addEventListener("DOMContentLoaded", ready);
