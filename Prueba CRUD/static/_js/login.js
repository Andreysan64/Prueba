const form = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const validator = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/

const validarForm = (e) => {
    switch (e.target.name){
        case "correo":
            if(validator.test(e.target.value)){
                document.getElementById('txtcorreo').classList.remove('txt_field');
                document.getElementById('lblcorreo').classList.add('txt_field-up');
                document.getElementById('txtcorreo').classList.add('txt_field-correct');
            }else if(e.target.value == ""){
                document.getElementById('txtcorreo').classList.remove('txt_field-correct');
                document.getElementById('lblcorreo').classList.remove('txt_field-up');
                document.getElementById('txtcorreo').classList.add('txt_field');
            } 
            else{
                document.getElementById('txtcorreo').classList.remove('txt_field-correct');
                document.getElementById('lblcorreo').classList.add('txt_field-up');
                document.getElementById('txtcorreo').classList.add('txt_field');
            }
        break;
        case "password":
            if(e.target.value != ""){
                document.getElementById('txtpassword').classList.remove('txt_field');
                document.getElementById('lblpassword').classList.add('txt_field-up');
                document.getElementById('txtpassword').classList.add('txt_field-correct');
            }else if(e.target.value == ""){
                document.getElementById('txtpassword').classList.remove('txt_field-correct');
                document.getElementById('lblpassword').classList.remove('txt_field-up');
                document.getElementById('txtpassword').classList.add('txt_field');
            } 
            else{
                document.getElementById('txtpassword').classList.remove('txt_field-correct');
                document.getElementById('lblpassword').classList.add('txt_field-up');
                document.getElementById('txtpassword').classList.add('txt_field');
            }
        break;
    };
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});

form.addEventListener('submit', (e) =>{
    e.preventDefault();
});