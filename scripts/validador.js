//creacion de input para links
for(let j=0;j<5;j++){
    let contenedorlinks = document.getElementById("link-input");
    
    
    let divlink = document.createElement("div");
    divlink.class = 'links';
    divlink.id = `link${j}`;
    divlink.style.display = "flex"
    divlink.style.alignItems = "center"
    divlink.style.display = "block";
    if (j!=0){
        divlink.style.display = "none";
    }

    let seleccion = document.createElement("select");
    seleccion.name=`redsocial${j}`;
    let opciones = ["Whatsapp", "Telegram", "X", "Instagram", "Tiktok", "Otra"];

    opciones.forEach( (opcion) => {
        let newopcion = document.createElement('option');
        newopcion.value = opcion;
        newopcion.text = opcion;
        seleccion.appendChild(newopcion);
    });
    divlink.appendChild(seleccion);

    let textinput = document.createElement("input");

    textinput.id = `textlink${j}`; 
    textinput.type = "text";
    textinput.minLength = "4";
    textinput.maxLength = "90";
    textinput.name = `red${j}.text`
    
    divlink.appendChild(textinput);

    let btnmaslink= document.createElement("button");
    btnmaslink.innerHTML= `+`;
    btnmaslink.type = "button";
    btnmaslink.hidden = "true";
    divlink.appendChild(btnmaslink);
    if (j==4){
        divlink.removeChild(btnmaslink);
    }

    textinput.addEventListener("change", () => {
        btnmaslink.removeAttribute("hidden");
    })

    btnmaslink.addEventListener("click", () => {
        let siguente = document.getElementById(`link${j+1}`);
        siguente.style.display = "block";
        btnmaslink.style.display = "none";
    })


    contenedorlinks.appendChild(divlink);
    
}

//creacion de input para fotos
for(let i = 0; i<5; i++){
    let contenedorfotos = document.getElementById("mascotafoto-input");

    let divfoto = document.createElement("div");
    divfoto.class = "fotos";

    divfoto.id = `divfoto${i}`;
    divfoto.style.display = "flex";
    divfoto.style.alignItems = "center";
    divfoto.style.display = "block";
    if (i!=0){
        divfoto.style.display = "none";
    }

    let inputfoto = document.createElement("input");
    inputfoto.id = `foto${i}`;
    inputfoto.type = "file";
    divfoto.appendChild(inputfoto);
    

    let btnmasfoto = document.createElement("button");
    btnmasfoto.innerHTML= `+`;
    btnmasfoto.type = "button";
    btnmasfoto.hidden = "true";
    divfoto.appendChild(btnmasfoto);
    if (i==4){
        divfoto.removeChild(btnmasfoto);
    }

    inputfoto.addEventListener("change", () => {
        btnmasfoto.removeAttribute("hidden");
    })

    btnmasfoto.addEventListener("click", () => {
        let siguente = document.getElementById(`divfoto${i+1}`);
        siguente.style.display = "block";
        btnmasfoto.style.display = "none";
    })

    contenedorfotos.appendChild(divfoto);
}


const validarsector = (sector) => {
    return (sector.length < 100);
}

const validarnombre = (nombre) => {
    return (nombre && nombre.length > 2 && nombre.length<100);
}

const validaremail = (email) => {
  if (!email) return false;
  let lengthValid = email.length > 15;

  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/;
  let formatValid = re.test(email);

  return lengthValid && formatValid;
};


const validartel = (tel) => {
    if (tel){
        // solo si hay telefono verificamos
        const validnum = /^\+[1-9]{3,3}\.[0-9]{8,8}$/;
        const teltest = validnum.test(tel); // Returns true
        return (teltest);
    }else{
        return true;
    }
    
}

// para link simple, queda ver para mas links
const validarlink = () => {
    let valid = true;

    let linkdiv= document.getElementById("link-input");
    let textlinks = linkdiv.querySelectorAll("input");
    textlinks.forEach(link => {
        if (link && link.value.length<4){
        valid = false;
        }
        if (link && link.value.length>50){
        valid = false;
        }
    });
    return valid;
}

// mismo para las fotos
const validarfotos = () => {
    let valid = true;

    let fotodiv= document.getElementById("mascotafoto-input");
    let fotosinput = fotodiv.querySelectorAll("input");
    fotosinput.forEach(foto => {
        // si no hay archivo no pasa nada
        // si hay archivo debemos ver que sea una foto

        if (foto.files.length > 0){
            if(!foto.files[0].type.startsWith("image/")){
                valid = false;
            }
        }

    });
    return valid;
}

const validardatos_mascota= (tipo, cantidad, edad, unidadedad) => {
    let v_tipo = (tipo.value !=="0");
    let v_cantidad = (cantidad.value>=1);
    let v_edad = (edad.value>=1);
    let v_unidadedad =(unidadedad!="0");
    
    return (v_tipo && v_cantidad && v_edad && v_unidadedad);
}

const validaregioncomuna = (region,comuna) => {
    return (region.value !== "0" && comuna.value !== "0");
}
const poblarregiones = () => {
    let regionselect = document.getElementById('regiones');
    region_comuna.regiones.forEach(region => {
        let option = document.createElement("option");
        option.value = region.nombre;  
        option.text = region.nombre;   
        regionselect.appendChild(option);
    });
}

const poblarcomunas = () => {
    let regionselect = document.getElementById('regiones');
    let comunaselect = document.getElementById('comuna');
    let selectedregion = regionselect.value;    

    let region = region_comuna.regiones.find(r => r.nombre === selectedregion);

    if (region){
        region.comunas.forEach(comuna => {
            let option = document.createElement('option');
            option.value = comuna.nombre;
            option.text = comuna.nombre;
            comunaselect.appendChild(option);
        });
    }   
}


const validar = () => {
    let mensajefinal = "";
    let correcto = true;
    let formulario = document.getElementById("adopcion-form");

    // donde?
    let region = document.getElementById('regiones');
    let comuna = document.getElementById('comuna');
    let sectorinput = document.getElementById("sector");

    if (!validaregioncomuna(region,comuna)){
        mensajefinal +="region y/o comuna invalida<br>"
        correcto = false
    }

    if (!validarsector(sectorinput.value)){
        mensajefinal +="sector invalido<br>"
        sectorinput.style.borderColor = "red";
        correcto = false
    } else {
        sectorinput.style.borderColor = "";
    }


    //quien?
    let nombreinput = document.getElementById("nombre");
    let emailinput = document.getElementById('email');
    let telinput = document.getElementById("tel");

    if (!validarnombre(nombreinput.value)){
        mensajefinal +="nombre invalido<br>"
        nombreinput.style.borderColor = "red";
        correcto = false
    } else {
        nombreinput.style.borderColor = "";
    }

    if (!validaremail(emailinput.value)){
        mensajefinal +="email invalido<br>"
        emailinput.style.borderColor = "red";
        correcto = false
    } else {
        emailinput.style.borderColor = "";
    }

    if (!validartel(telinput.value)){
        mensajefinal +="telefono invalido<br>"
        telinput.style.borderColor = "red";
        correcto = false
    } else {
        telinput.style.borderColor = "";
    }

    if (!validarlink()){
        mensajefinal +="uno o mas links de los proporcionados son invalidos<br>"
        correcto = false
    } else {
    }
    

    //mascota?
    let tipo = document.getElementById('mascotatipo');
    let cantidad = document.getElementById('mascotacantidad');
    let edad = document.getElementById('mascotaedad');
    let unidadedad = document.getElementById('mascotatipoedad');

    let fotoinput = document.getElementById('mascotafotos');
    let fechaEntrega = document.getElementById("mascotaentrega");
     

    if (!validardatos_mascota(tipo,cantidad,edad,unidadedad)){
        mensajefinal +="hay datos de mascota los cuales son invalidos<br>"
        correcto = false
    } 

    if (!validarfotos()){
        mensajefinal +="una o mas de las fotos ingresadas son invalidas<br>"
        correcto = false
    } 

    // ya dejo la confirmacion de la fecha aparte 
    

    if (fechaEntrega.value && fechaEntrega.value < fechaEntrega.min) {
        mensajefinal += "La fecha debe ser al menos 3 horas después de ahora.<br>";
        fechaEntrega.style.borderColor = "red";
        correcto = false;
    } else {
        fechaEntrega.style.borderColor = "";
    }
        
    
    if (correcto===true) {
        formulario.style.display = "none";

        let boxvalidacion = document.getElementById("val-box");
        let mensajevalidacion = document.getElementById("val-msg");
        let listavalidacion = document.getElementById("val-list");

        mensajevalidacion.innerText = "¿Está seguro que desea agregar este aviso de adopción?";
        listavalidacion.textContent = "";

        boxvalidacion.style.backgroundColor = "#ddffdd57";
        boxvalidacion.style.borderLeftColor = "#4CAF50";
        

        let submitButton = document.createElement("button");
        submitButton.innerText = "Enviar";
        submitButton.style.marginRight = "10px";

        submitButton.addEventListener("click", () => {
            mensajevalidacion.innerText = "Hemos recibido la información de adopción, muchas gracias y suerte!";
            submitButton.style.display = 'none';
            backButton.style.display = 'none';
            let indexbutton = document.createElement('a');
            indexbutton.innerHTML=  `<a href="index.html">
                                        <button>Volver a la portada</button>
                                    </a>`;
            listavalidacion.appendChild(indexbutton);
        });

        let backButton = document.createElement("button");
        backButton.innerText = "Volver";
        backButton.addEventListener("click", () => {
        // Mostrar el formulario nuevamente
        formulario.style.display = "block";
        boxvalidacion.hidden = true;
        });

        listavalidacion.appendChild(submitButton);
        listavalidacion.appendChild(backButton);

        // hacer visible el mensaje de validación
        boxvalidacion.hidden = false;
    }else{
        document.getElementById("mensajefin").innerHTML = mensajefinal;
        let errores = document.getElementById("cajaerrores");
        errores.style.display = "block";
        }
}

document.getElementById("botonsumbit").addEventListener("click",validar);
document.getElementById('regiones').addEventListener("change",poblarcomunas);

window.onload = () =>{
    poblarregiones();
    let fechaEntrega = document.getElementById("mascotaentrega");

    let ahora = new Date();

    ahora.setHours(ahora.getHours() + 3);
    let minimo = ahora.toISOString().slice(0,16);

    fechaEntrega.min = minimo;
    fechaEntrega.value = minimo;
};
