function getErrors(errorsArray){
    let httpStatus = 500;
    const errors = errorsArray.errors;

    if (errorsArray.name == 'SequelizeValidationError') {
        httpStatus = 400;
    }

    if (Array.isArray(errors)){
        errorsMessages = [];

        errors.forEach(element => {
            errorsMessages.push(element.message)
        });

        return { status: httpStatus, errorMessage: errorsMessages };
    }
    return { status: httpStatus, errorMessage: "Desculpe pelo transtorno, houve um erro interno. Procure pelo departamento de TI."}
}

function printName () {
    console.log("Olá Danilo!");
}

module.exports = {
    getErrors,
    printName
}