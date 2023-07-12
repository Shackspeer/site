

const errorFilterer = (req,res,next) =>{
    const {email,pseudo,gsm,gender,pasw,repasw} = req.body;

    let errorStatus = [];


    let regEmail = /^\S+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])\S+$/
    let regPseudo = /^\S+[^^0-9!\s#$%&'*+/=?^_`{|}~-][^^!#$%&'*\s+/=?^_`{|}~-]\S+$/
    let regPasw = /^(?=.*[A-Z]){1}(?=.*\d){1}(?=.*[@$!%*#?&]){1}[A-Za-z\d@$!%*#?&]{8,}$/
    let regPhone = /^[+]{1}[0-9]{11,}$/
    let regGender = /^(Male|Female)$/
    


    if(regEmail.test(email)==false){
        errorStatus[0] = {emailError : true} 
        
    }
    if(regPseudo.test(pseudo)==false){
        errorStatus[1] = {pseudoError : true}
    }
    if(regPasw.test(pasw)==false){
        errorStatus[2] = {paswError : true}
    }
    if(regPhone.test(gsm)==false){
        errorStatus[3] = {phoneError : true}
    }
    if(regGender.test(gender)==false){
        errorStatus[4] = {genderError : true}
    }
    if(repasw!==''&&repasw!==undefined){
        if(repasw!==pasw){
            errorStatus[5] = {matchError : true}
        }
    }
    else{
        errorStatus[6] = {repaswEmptyError : true}
    }
    
    
    if(errorStatus.length==0){
        next();
    }
    else{
        res.send(errorStatus)
    }
}   

const loginFilterer = (req,res,next) =>{
    const {email,pasw} = req.body
    let errorStatus = [];

    if(email==''||email==null||email==undefined){
        errorStatus[0] = {emailError : true}
    }
    if(pasw==''||pasw==null||pasw==undefined){
        errorStatus[1] = {paswError : true}
    }
    if(errorStatus.length==0){
        next();
    }
    else{
        res.send(errorStatus)
    }
}





module.exports = {
    errorFilterer,
    loginFilterer
}