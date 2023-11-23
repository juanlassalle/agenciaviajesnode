import { Testimoniales } from "../models/Testimoniales.js"

const guardarTestimonial = async (req,res) => {

    // Validar
    const {nombre, correo, mensaje} = req.body

    const errores = []

    if (nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacío'})
    }
    if(correo.trim() === ''){
        errores.push({mensaje : 'El correo está vacio'})
    }
    if (mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje está vacio'})
    }

    //Si al menos hay un campo sin llenar
    if (errores.length > 0) {
        // Consultar Testimoniales Existentes
        const testimoniales = await Testimoniales.findAll()
        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores: errores,
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
            testimoniales
        })
    }else {
        //Almacenar en la base de datos

        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}