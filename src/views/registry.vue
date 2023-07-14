<template>
    <div class="container-fluid" style="width: 100%;margin: 0px;padding: 0px;">
        <img src="../assets/vecteezy_polygon-texture-abstract-background-3d-rendering_7259895_719.jpg" style="width: 100%;height: 100vh;">
    </div>
    <div class="container-fluid h-100 bg-light position-absolute d-grid align-items-center" style="z-index: 9;top: 0px;width: 700px;right: 0px;box-shadow: 0px -3px 10px rgb(75, 75, 75)">
        
        <!-- Sign in -->
        <div :class="{hidden : !signin}" style="overflow:hidden;overflow-y: scroll;position: relative;height:700px;">
            
            <div class="d-grid align-items-center position-relative" style="top:100px;">
                
                <p class="text-start mx-auto d-flex align-items-center position-relative" style="width: 600px;font-size: 13px;height: 25px;top: 10px;left: 105px;">Email<span style="margin-left:195px;opacity: 0.5;width: 200px;">Please enter an active email</span></p>
                
                <input class="form-control mx-auto position-relative" id="email" type="text" style="width: 400px;height: 25px;outline;" v-model="email" @keyup.enter="sendData()">
                    
                <div v-if="errorStatus[0]" class="alert alert-danger d-flex align-items-center justify-content-start mx-auto mt-2 py-1" style="width: 400px;height: 35px;font-size: 12px; padding-left: 0px;text-align: start;"><span class="material-symbols-outlined" style="padding-right: 5px;">close</span>emails cannot contain any characters other than '@ . _ 0-9 a-zA-Z' and cannot be empty</div>
            
                
                <p class="text-start mx-auto d-flex align-items-center position-relative" style="width: 400px;font-size: 13px;height: 25px;top: 10px;left: 5px;">Pseudo<span style="margin-left:210px;opacity: 0.5;width: 200px;">Choose a pseudo name</span></p>
                
                <input class="form-control mx-auto position-relative" id="pseudo" type="text" style="width: 400px;height: 25px;outline;" v-model="pseudo" @keyup.enter="sendData()" maxlength="16">
                
                <div v-if="errorStatus[1]" class="alert alert-danger d-flex align-items-center justify-content-start mx-auto mt-2 py-1" style="width: 400px;height: 34px;padding: 1px;font-size: 12px;padding-left: 0px;text-align: start;"><span class="material-symbols-outlined" style="padding-right: 5px;">close</span> Pseudo cannot contain specific character , cannot be empty and must be between 8-16 characters</div> 
                
                <p class="text-start mx-auto d-flex align-items-center position-relative" style="width: 500px;font-size: 13px;height: 30px;top: 10px;left: 55px;">Password<span style="margin-left:160px;opacity: 0.5;width: 400px;">Please type a string password</span></p>
                
                <input class="form-control mx-auto position-relative" id="password" type="password" style="width: 400px;height: 25px;outline;" v-model="pasw" @keyup.enter="sendData()">
                
                <div v-if="errorStatus[2]" class="alert alert-danger d-flex align-items-center justify-content-start mx-auto mt-2 " style="width: 400px;height: 35px;font-size: 12px; padding:0px;text-align: start;"><span class="material-symbols-outlined" style="padding-right: 5px;">close</span> {{ passwordContent }}</div>
                
                <p class="text-start mx-auto d-flex align-items-center position-relative" style="width: 700px;font-size: 13px;height: 30px;top: 10px;left: 155px;">Confirm Password<span style="margin-left:90px;opacity: 0.5;width: 400px;">Please type your password again</span></p>
                
                <input class="form-control mx-auto position-relative" type="password" style="width: 400px;height: 25px;outline;" v-model="repasw" @keyup.enter="sendData()">
                
                <div v-if="errorStatus[3]" class="alert alert-danger d-flex align-items-center justify-content-start mx-auto mt-0 py-1" style="width: 400px;height: 30px;font-size: 12px; padding-left: 0px;"><span class="material-symbols-outlined" style="padding-right: 5px;">close</span> {{ passwordContent2 }}</div>
                
                <div style="position: relative;bottom: 10px;">
                    <p class="text-start mx-auto d-flex align-items-center position-relative" style="width: 700px;font-size: 13px;height: 30px;top: 20px;left: 155px;">GSM<span style="margin-left:70px;opacity: 0.5;width: 400px;">Please type your phone number with country code</span></p>
                    <input class="form-control  position-relative" id="gsm" type="tel" maxlength="10" onkeydown="return event.keyCode > 47 && event.keyCode < 58 || event.keyCode == 8" style="width: 400px;height: 30px;outline;" v-model="gsm">
                    <div v-if="errorStatus[4]" class="alert alert-danger d-flex align-items-center justify-content-start mx-auto mt-2" style="width: 400px;height: 30px;font-size: 12px;text-align: start;padding-left: 0px;"><span class="material-symbols-outlined" style="padding-right: 5px;">close</span> Phone number must be contain just numbers and cannot be empty</div>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                    <div style="width: 200px;height: 40px;border:1px solid rgb(212, 216, 217) " class="position-relative  bg-white mt-0 d-flex align-items-center justify-content-start" >
                        <input id="gender" type="radio" name="gender" class="form-check-input mx-3 position-relative" value="Male" style="bottom:3px" v-model="gender"> Male
                    </div>
                    <div style="width: 200px;height: 40px;border:1px solid rgb(212, 216, 217)  " class="position-relative  bg-white d-flex align-items-center justify-content-start">
                        <input id="gender" type="radio" name="gender" class="form-check-input mx-3" value="Female" v-model="gender"> Female
                    </div>
                </div>
                <div v-if="errorStatus[5]" class="alert alert-danger d-flex align-items-center justify-content-start mx-auto mt-2 py-1" style="width: 400px;height: 40px;font-size: 12px; padding-left: 4px;">Please select your gender</div>
            
                <button class="btn btn-primary mx-auto mt-2" style="width: 400px;" @click="sendData()">{{ registryContent }}</button>
                <p class="text-secondary mt-1">Already have an account on LibsTech ? <span class="text-primary" @click="setRegistry()" style="cursor:pointer">Login</span></p>
            </div>
            <div v-if="this.createdStatus[0]" class="alert alert-success text-secondary mx-auto d-flex align-items-center position-relative created"><span class="material-symbols-outlined" style="padding-right: 5px;">done</span>{{ createdStatus[1] }}</div>
            <div v-if="this.createdError[0]" class="alert alert-danger text-secondary mx-auto d-flex align-items-center position-relative createdError"><span class="material-symbols-outlined" style="padding-right: 5px;">close</span>{{ createdError[1] }}</div>
        </div>

        <!-- Login -->
        <div :class="{hidden : !login}">
            
            <h3 style="margin-bottom: 50px">Keep Improving Yourself</h3>
            
            <p class="text-start mx-auto d-flex align-items-center position-relative" style="width: 600px;font-size: 13px;height: 30px;top: 10px;left: 105px;">Email<span style="margin-left:195px;opacity: 0.5;width: 200px;">Please enter an active email</span></p>
            
            <input class="form-control mx-auto position-relative"  type="text" style="width: 400px;height: 30px;outline;" v-model="loginEmail" @keyup.enter="toLogin()">
            
            <div v-if="loginStatus[0]" class="alert alert-danger d-flex align-items-center justify-content-start mx-auto mt-2 py-1" style="width: 400px;height: 40px;font-size: 12px; padding-left: 4px;"><span class="material-symbols-outlined">close</span>Email section cannot be left empty</div>

            <p class="text-start mx-auto d-flex align-items-center position-relative" style="width: 500px;font-size: 13px;height: 30px;top: 10px;left: 55px;">Password<span style="margin-left:160px;opacity: 0.5;width: 400px;">Please type a string password</span></p>
            
            <input class="form-control mx-auto position-relative"   type="password" style="width: 400px;height: 30px;outline;" v-model="loginPasw" @keyup.enter="toLogin()">
            
            <div v-if="loginStatus[1]" class="alert alert-danger d-flex align-items-center justify-content-start mx-auto mt-2 py-1" style="width: 400px;height: 40px;font-size: 12px; padding-left: 4px;"><span class="material-symbols-outlined">close</span>Password section cannot be left empty</div>
            
            <button class="btn btn-primary mx-auto my-5" style="width: 400px;" @click="toLogin()">Login</button>

            <p class="mx-auto" style="width: 400px;">Havent an account on LibsTech ? <span class="text-primary" @click="setRegistry()" style="cursor: pointer;">Sign up</span></p>
            
            <div  class="alert alert-success d-flex align-items-center justify-content-start mx-auto mt-2 py-1 position-relative loginSuccess"><span class="material-symbols-outlined">done</span>Loged in successfully</div>
            
            <div  class="alert alert-danger d-flex align-items-center justify-content-start mx-auto mt-2 py-1 position-relative loginError"><span class="material-symbols-outlined">close</span>Login failed</div>
            
            
        </div>
    
    </div>
</template>

<script>

import { createCart } from '@/methods/create'






export default {
    data(){
        return{
            registryContent : "Sign up",
            signin :null ,
            login :null,
            email : '',
            pseudo: '',
            pasw : '',
            repasw : '',
            gsm : '',
            gender : '',
            phone :'',
            errorStatus : [false,false,false,false,false,false,false],
            passwordStatus : false,
            passwordContent : '',
            passwordContent2 : '',
            status : false,
            createdStatus : [true,null],
            createdError : [true,null],
            loginEmail : '',
            loginPasw : '',
            loginStatus : [false,false],
            loginStatus0 : false

        }
    },
    
    mounted(){
        sessionStorage.getItem('register') ? this.signin = true : this.signin = false
        sessionStorage.getItem("login") ? this.login = true : this.login = false

        const field = document.querySelector("#gsm")
    
        const phoneInput = window.intlTelInput(field,{
            utilsScript :
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            
        })
        	this.phone = phoneInput

    },
    methods:{

        
        //posting data and creating new user
        async sendData (){
            
           let options = {
                method : 'POST',
                headers : {
                    "Content-type" : "Application/json"
                },
                body : JSON.stringify({
                    pseudo : this.pseudo,
                    email : this.email,
                    pasw : this.pasw,
                    gsm : this.phone.getNumber(),
                    gender : this.gender,
                    repasw : this.repasw
                })
            }
            

            
            



            await fetch("http://localhost:3000/addUser",options)
            .then(resp=>resp.json())
            .then(resp=>{
                
                if(resp[0]!==null&&resp[0]!==undefined){
                    this.errorStatus[0] = resp[0].emailError
                }
                else{
                    this.errorStatus[0] = false
                }
                if(resp[1]!==null&&resp[1]!==undefined){
                    this.errorStatus[1] = resp[1].pseudoError
                }
                else{
                    this.errorStatus[1] = false
                }
                if(resp[2]!==null&&resp[2]!==undefined){
                    this.passwordContent = "Password must contain at least one special character, uppercase letters and numbers, and must be more than 8 characters"
                    this.errorStatus[2] = resp[2].paswError
                    
                }
                else{
                    this.errorStatus[2] = false
                }
                if(resp[3]!==null&&resp[3]!==undefined){
                    this.errorStatus[4] = resp[3].phoneError
                }
                else{
                    this.errorStatus[4] = false
                }
                if(resp[4]!==null&&resp[4]!==undefined){
                    this.errorStatus[5] = resp[4].genderError
                }
                else{
                    this.errorStatus[5] = false
                }
                if(resp[5]!==null&&resp[5]!==undefined){
                    this.passwordContent2 = "passwords do not match"
                    this.errorStatus[3] = resp[5].matchError
                    
                }
                else{
                    this.errorStatus[3] = false
                }
                if(resp[6]!==null&&resp[6]!==undefined){
                    this.passwordContent2 = "Confirm password section cannot be left empty"
                    this.errorStatus[3] = resp[6].repaswEmptyError
                }
                else{
                    this.errorStatus[3] = false
                }
                if(resp.CreatedSuccessfully==true){
                    this.createdStatus[1] = 'Account has been created'
                    this.createdStatus[0] = true
                    this.getUserData(this.email)
                    
                    debugger
                    document.querySelector(".created").style = "opacity:1;top:100px;"
                    setTimeout(() => {
                        document.querySelector(".created").style = "opacity:0;top:100px;"
                    }, 4000);  
                    setTimeout(()=>{
                        
                       
                        sessionStorage.setItem("status",true)
                        window.parent.location.href = "/"
                    },2000)  
                }
                else if(resp.CreatedSuccessfully==false){
                    this.createdError[1] = 'Account could not be created, Phone number is in use'
                    this.createdError[0] = true
                    document.querySelector(".createdError").style = "opacity:1;top:45px;"
                    setTimeout(() => {
                        document.querySelector(".createdError").style = "opacity:0;top:45px;"
                    }, 4000);    
                }
            })
        },

      
        setRegistry(){
            this.signin = !this.signin
            this.login = !this.login 
        },
        async getUserData(email){

           

           const options = {
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({email : email})
            }


            await fetch("http://localhost:3000/userData",options)
            .then(resp=>resp.json())
            .then(resp=>sessionStorage.setItem("userData",JSON.stringify(resp[0])))
            console.log(JSON.parse(sessionStorage.getItem("userData")).id)
            await createCart(JSON.parse(sessionStorage.getItem("userData")).id)
        
            
        },


        // Login 

        async toLogin(){

            

            const bodyVar = {
               email : this.loginEmail,
               pasw : this.loginPasw      
            }

        

            const options = {

                method:'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(bodyVar)


            }



            await fetch("http://localhost:3000/userControl",options).then(resp=>resp.json())
            .then(resp=>{
                
                if(resp[0]!==null&&resp[0]!==undefined){
                    this.loginStatus[0] = resp[0].emailError
                }
                else{
                    this.loginStatus[0] = false
                }
                if(resp[1]!==null&&resp[1]!==undefined){
                    this.loginStatus[1] = resp[1].paswError
                }
                else{
                    this.loginStatus[1] = false
                }




                if(resp.isLogin==true){
                    this.loginStatus0 = true
                    document.querySelector(".loginSuccess").style = "opacity:1;top:10px;"
                    this.getUserData(this.loginEmail)
                    
                    setTimeout(() => {
                        document.querySelector(".loginSuccess").style = "opacity:0;top:10px;"
                    }, 4000);
                    setTimeout(()=>{
                        sessionStorage.setItem("status",true)
                        
                        window.parent.location.href = "/"
                    },2000) 
                }
                else if(resp.isLogin==false){
                    this.loginStatus0 = false
                    document.querySelector(".loginError").style = "opacity:1;top:-45px;"
                    setTimeout(() => {
                        document.querySelector(".loginError").style = "opacity:0;top:-45px;"
                    }, 4000);
                }
            })
        },

    },
    

}
    
   

</script>

<style scoped>
   
    input::placeholder{
        opacity: 0.5;
    }
    .iti{
        left: 100px;
    }
    html{
        height: 150vh;
    }
    .hidden{
        display: none;
    }
    .created{
        width:400px;
        height: 40px;
        text-align: start;
        left: 20px;
        top: 200px;
        opacity:0;
        font-size: 12px;
        transition: all 0.4s ease-out;
    }
    .createdError{
        width:400px;
        height: 40px;
        text-align: start;
        left: 20px;
        top: 145px;
        opacity:0;
        font-size: 12px;
        transition: all 0.4s ease-out;
    }
    .loginError{
        transition: all 0.4s ease-out;
        opacity: 0;
        width: 400px;
        height: 40px;
        font-size: 12px;
        padding-left: 4px;
        top: 0px;
    }
    .loginSuccess{
        transition: all 0.4s ease-out;
        opacity: 0;
        width: 400px;
        height: 40px;
        font-size: 12px;
        padding-left: 4px;
        top: 55px;
    }
</style>