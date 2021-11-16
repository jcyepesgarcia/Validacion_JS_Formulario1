document.getElementById('nickName').focus();

const form = document.getElementById('user-form');
const submitButton = document.getElementById('submit-btn');

let timeout = null;//Se crea esta variable para agegar un tiempo de espera en el evento 'keydown' con el método setTimeout(), y que el evento no recoja de uno en uno los caracteres digitados por el ususario.

//El objeto errors contiene los diferentes atributos name, de cada uno de los elementos input contenidos en las etiquetas div con clase .form-box 
let errors = {
    nickName: true,
    email: true,
    password: true
}

const mailFormatRegex = /^[^@]+@\w+(\.\w+)+\w$/;//Expresión regular para la validación de estructura de un email.

document.querySelectorAll('.form-box').forEach((form_box) => {

    let boxInput = form_box.querySelector('input');

    boxInput.addEventListener('keydown', () => {
        clearTimeout(timeout);
        //El usuario tiene un tiempo de espera de 0.5 seg una vez se detiene de digitar para continuar digitando, antes de que el evento se reinicie.
        timeout = setTimeout(() => {
            //console.log(`Input ${boxInput.name} value: ${form_box.querySelector('input').value}`);
            validation(form_box, boxInput);//Validación del Nombre
        }, 500);
    });

});

//La función valida si el ususario ingresa un nombre. Si no ingresa un nombre agrega la clase .form-error al div form_box. Si ingresa un nombre agrega la clase .form-success al div form_box. 
validation = (form_box, boxInput) =>{

    if(boxInput.value==''){
        showErrorOrSuccess(true, form_box, boxInput);
    }else{
        showErrorOrSuccess(false, form_box, boxInput);
    };

    if(boxInput.name=='email'){
        if(!boxInput.value.match(mailFormatRegex)){
            showErrorOrSuccess(true, form_box, boxInput);
        }else{
            showErrorOrSuccess(false, form_box, boxInput);
        }
    };

    if(boxInput.name=='password'){
        if(boxInput.value.length <= 6){
            showErrorOrSuccess(true, form_box, boxInput);
        }else{
            showErrorOrSuccess(false, form_box, boxInput);
        }
    }

    sumitController();
}

showErrorOrSuccess = (check, form_box, boxInput) => {
    if(check){
        form_box.classList.remove('form-success');
        form_box.classList.add('form-error');
        errors[boxInput.name] = true;
    }else{
        form_box.classList.remove('form-error');
        form_box.classList.add('form-success');
        errors[boxInput.name] = false;
    }
}

//Desabilita el botón sumit, dependiendo de si la validación del input es correcta o no.
sumitController = () =>{
    console.log(errors);
    if(errors.nickName || errors.email || errors.password){
        submitButton.toggleAttribute('disabled', true);
    }else{
        submitButton.toggleAttribute('disabled', false);
    }
}


//Este código es para mostrar por consola lo que esta devolviendo el formulario 
form.addEventListener('submit', (event) => {
    
    event.preventDefault();//Evita el comportamiento por defecto del botón sumit
    
    const formData = new FormData(event.target);//Encapsulamiento de todos los datos del formulario en una variable a través de la clase FormData
    
    console.log([...formData]);//Muestra los datos en consola en un array
    
    for(let [key, value] of formData.entries()){
        console.log(`${key}: ${value}`);
    }//Muestra los datos por consola de manera más amigable
    
});
