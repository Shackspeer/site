<template>
  <userMenu></userMenu>
  <div ref="announcer" class="announcer alert alert-success position-absolute d-flex align-items-center justify-content-start"><span class="material-symbols-outlined px-2">done</span>message</div>
  <div class="d-flex">
    
    <div class="container position-absolute bg-light  d-grid profilePreview" style="height: 100vh;width:25vw;box-shadow: 0px 5px 10px #333;">
        <h3 class="text-center pt-5">Preview</h3>
        <img src="" class="image" ref="image">
        <input type="file" @change="getImage" ref="file" id="uploadFile" accept="image/png,image/jpg">
        <label class="btn btn-dark uploadButton" for="uploadFile">Upload</label>
        <p class="profilePreviewHeader" style="--i:1">Username</p>
        <p class="userInfo" style="--i:1">{{ data.pseudo }}</p>
        <p class="profilePreviewHeader" style="--i:2">Email</p>
        <p class="userInfo" style="--i:2">{{ data.email }}</p>
        <p class="profilePreviewHeader" style="--i:3">Phone</p>
        <p class="userInfo" style="--i:3">{{ data.gsm }}</p>
        <p class="profilePreviewHeader" style="--i:4">Gender</p>
        <p class="userInfo text-capitalize" style="--i:4">{{ data.gender }}</p>
        <p class="profilePreviewHeader" style="--i:5.2">Hobbies</p>
        <p class="userInfo text-capitalize" style="--i:5.2">{{ spesificData[0] }}</p>
        <p class="profilePreviewHeader" style="--i:6.2">Education</p>
        <p class="userInfo text-capitalize" style="--i:6.2;text-align: start;">{{ spesificData[1] }}</p>
        <p class="profilePreviewHeader" style="--i:7.2">Goal</p>
        <p class="userInfo text-capitalize" style="--i:7.2">{{ spesificData[2] }}</p>
    </div>
    
    
    
    <div class="d-grid w-100 h-100">
        <div class="container-fluid bg-dark" style="height:20vh ;">
        <button class="goMain btn btn-success" @click="goToMain()">Go home</button>
        </div>

        <div class="dataSettings">
            <div class="setData">
                <p>Change username</p>
                <div class="d-flex">
                    <input type="text" :placeholder="data.pseudo" v-model="newPseudo" style="border:none;border-bottom:1px solid #333;outline: none;">
                    <button @click="changeName()" :disabled="newPseudo.length<=8" style="width: 30px;height: 30px;margin-left: 10px;text-align: center;display: grid;justify-content: center;align-items: center;" class="btn btn-success"><span class="material-symbols-outlined" style="font-size: 22px;">done</span></button>
                </div>
                <p>Change email</p>
                <div class="d-flex">
                    <input type="text" :placeholder="data.email" v-model="newEmail" style="border:none;border-bottom:1px solid #333;outline: none;">
                    <button @click="changeEmail()" :disabled="newEmail.length<=12" style="width: 30px;height: 30px;margin-left: 10px;text-align: center;display: grid;justify-content: center;align-items: center;" class="btn btn-success"><span class="material-symbols-outlined" style="font-size: 22px;">done</span></button>
                </div>
            </div>
            
            
            
            <div class="setContent">
                <div style="position: relative;top:30px">
                    <p style="position: relative;top: 30px;">About your hobbies</p>
                    <div class="d-flex position-relative" style="top: 45px;">
                    <input type="text" class="item"  style="border:none;outline: none;border-bottom: 1px solid #333;" v-model="hobbies">
                    <button  @click="addHobbies()" class="btn btn-success"  :disabled="hobbies.length<1" style="width: 30px;height: 30px;margin-left: 10px;text-align: center;display: grid;justify-content: center;align-items: center;"><span class="material-symbols-outlined" style="font-size:22px">done</span></button>
                </div>
                </div>
                <div style="position: relative;top: 5px;">
                    <p style="position: relative;top: 30px;">About your education</p>
                    <div class="d-flex position-relative" style="top: 45px;">
                    <input type="text" class="item" style="border:none;outline: none;border-bottom: 1px solid #333;" v-model="education">
                    <button @click="addEducation()" class="btn btn-success"  :disabled="education.length<1" style="width: 30px;height: 30px;margin-left: 10px;text-align: center;display: grid;justify-content: center;align-items: center;"><span class="material-symbols-outlined" style="font-size:22px">done</span></button>
                </div>
                </div>
                <div style="position: relative;bottom: 30px;">
                    <p style="position: relative;top: 30px;">About your goal</p>
                    <div class="d-flex position-relative" style="top: 45px;">
                    <input type="text" class="item" style="border:none;outline: none;border-bottom: 1px solid #333;" v-model="goal">
                    <button @click="addGoal()" class="btn btn-success"  :disabled="goal.length<1" style="width: 30px;height: 30px;margin-left: 10px;text-align: center;display: grid;justify-content: center;align-items: center;"><span class="material-symbols-outlined" style="font-size:22px">done</span></button>
                </div>
                </div>
               
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import userMenu from '../components/userMenu.vue'
export default {
    

    data(){
        return{
            image : null,
            data : JSON.parse(sessionStorage.getItem("userData")),
            newPseudo : '',
            newEmail : '',
            newGender : '',
            hobbies : '',
            education : '',
            goal : '',
            spesificData : [null,null,null]
           
        }
    },
    async mounted(){
        console.log(this.data)  
        await this.getAllSpesifics()
        this.putDataInElement()
        this.$refs.file.value = ''
        if(localStorage.getItem("profileImage")!==null&&localStorage.getItem("profileImage")!==undefined){
            this.$refs.image.src = localStorage.getItem("profileImage")
            this.$refs.image.style = "box-shadow: 3px 3px 10px #333;border:none"
        }
        if(sessionStorage.getItem("hobbies")!==undefined&&sessionStorage.getItem("hobbies")!==null){
            this.spesificData[0] = sessionStorage.getItem("hobbies")
        }
        if(sessionStorage.getItem("education")!==undefined&&sessionStorage.getItem("education")!==null){
            this.spesificData[1] = sessionStorage.getItem("education")
        }
        if(sessionStorage.getItem("goal")!==undefined&&sessionStorage.getItem("goal")!==null){
            this.spesificData[2] = sessionStorage.getItem("goal")
        }

    },
    methods:{
        getImage(){
           
            
                
            

           if(this.$refs.file.files[0]&&this.$refs.file.files){
            const reader = new FileReader()

            reader.addEventListener("load",()=>{
                localStorage.setItem("profileImage",reader.result)
                this.$refs.image.src = localStorage.getItem("profileImage")
            })
            reader.readAsDataURL(this.$refs.file.files[0])
            this.$refs.file.value = ''
           }
           this.$refs.image.style = "box-shadow: 3px 3px 10px #333;border:none"
            
        },
        goToMain(){
            window.parent.location.href = "http://localhost:8080"
        },
        async changeName(){
            
            let body =  {
                id : this.data.id,
                pseudo : this.newPseudo
            }


            let options = {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(body)
            }

            await fetch("http://localhost:3000/updatePseudo",options)
            .then(resp=>resp.json())
            .then(resp=>console.log(resp))
            .catch(err=>console.log(err.message))

            body = {
                email : this.data.email
            }
            options = {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(body)
            }

            await fetch("http://localhost:3000/userData",options)
            .then(resp=>resp.json())
            .then(resp=>{
                let newData = resp[0]
                sessionStorage.setItem("userData",JSON.stringify(newData))
            })

        },
        async changeEmail(){
            
            let body =  {
                id : this.data.id,
                email : this.newEmail
            }


            let options = {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(body)
            }

            await fetch("http://localhost:3000/updateEmail",options)
            .then(resp=>resp.json())
            .then(resp=>console.log(resp))
            .catch(err=>console.log(err.message))

        },


        // Add hobbies to database

        async addHobbies() {

                // define body of request

                let body = {
                    id : this.data.id,
                    hobbies : this.hobbies
                }

                // define options of fetch
                
                let options  = {
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body:JSON.stringify(body)
                }

                // send a POST request to server and wait for response

                await fetch("http://localhost:3000/addHobbies",options)
                .then(resp=>resp.json())
                .then(resp=>{
                    if(resp.Updated!==undefined&&resp.Updated!==null){
                        this.$refs.announcer.innerText = "Your hobbies has updated successfully"
                        this.$refs.announcer.style = "right:20px;opacity:1;"
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:300px;opacity:0;"
                        },2000)
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:-300px"
                        },2400)
                    }
                    else if(resp.Saved!==undefined&&resp.Saved!==null){
                        this.$refs.announcer.innerText = "Your hobbies has saved successfully"
                        this.$refs.announcer.style = "right:20px;opacity:1;"
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:300px;opacity:0;"
                        },2000)
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:-300px"
                        },2400)
                    }
                })
            
                // save hobbies in session storage for preview

                sessionStorage.setItem("hobbies",this.hobbies)

        },

        // Add education to database

        async addEducation() {

            // define body of request
            
            let body = {
                id : this.data.id,
                education : this.education
            }
            // define options of fetch
            
            let options  = {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body:JSON.stringify(body)
            }


            // send a POST request to server and wait for response
            
            await fetch("http://localhost:3000/addEducation",options)
            .then(resp=>resp.json())
            .then(resp=>{
                if(resp.Updated!==undefined&&resp.Updated!==null){
                        this.$refs.announcer.innerText = "Your education has updated successfully"
                        this.$refs.announcer.style = "right:20px;opacity:1;"
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:300px;opacity:0;"
                        },2000)
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:-300px"
                        },2400)
                    }
                    else if(resp.Saved!==undefined&&resp.Saved!==null){
                        this.$refs.announcer.innerText = "Your education has saved successfully"
                        this.$refs.announcer.style = "right:20px;opacity:1;"
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:300px;opacity:0;"
                        },2000)
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:-300px"
                        },2400)
                    }
            })

            sessionStorage.setItem("education",this.education)
        },

        // Add goal to database
        async addGoal() {

            // define body of request

            let body = {
                id : this.data.id,
                goal : this.goal
            }

            // define options of fetch

            let options  = {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body:JSON.stringify(body)
            }

             // send a POST request to server and wait for response

            await fetch("http://localhost:3000/addGoal",options)
            .then(resp=>resp.json())
            .then(resp=>{
                if(resp.Updated!==undefined&&resp.Updated!==null){
                        this.$refs.announcer.innerText = "Your goal has updated successfully"
                        this.$refs.announcer.style = "right:20px;opacity:1;"
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:300px;opacity:0;"
                        },2000)
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:-300px"
                        },2400)
                    }
                    else if(resp.Saved!==undefined&&resp.Saved!==null){
                        this.$refs.announcer.innerText = "Your goal has saved successfully"
                        this.$refs.announcer.style = "right:20px;opacity:1;"
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:300px;opacity:0;"
                        },2000)
                        setTimeout(()=>{
                            this.$refs.announcer.style = "right:-300px"
                        },2400)
                    }
            })

            sessionStorage.setItem("hobbies",this.hobbies)
        },

        
        // get all spesific informations
        async getAllSpesifics(){
            let body = {
                id : this.data.id 
            }

            let options = {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(body)
            }

       

            await fetch("http://localhost:3000/getSpesifics",options)
            .then(resp=>resp.json())
            .then(resp=>{
              
                if(resp.length>0){
                        
                    if(resp[0].hobbies!==undefined&&resp[0].hobbies!==null){
                        sessionStorage.setItem("hobbies",resp[0].hobbies)
                    }
                    if(resp[0].education!==undefined&&resp[0].education!==null){
                        sessionStorage.setItem("education",resp[0].education)
                    }
                    if(resp[0].goal!==undefined&&resp[0].goal!==null){
                        sessionStorage.setItem("goal",resp[0].goal)
                    }
                }

            })
        },
        putDataInElement(){
           let elements = document.querySelectorAll(".item")
           let data = ['hobbies','education','goal']
           elements.forEach((e,index = 0)=>{
            if(sessionStorage.getItem(`${data[index]}`)!==undefined&&sessionStorage.getItem(`${data[index]}`)!==null)
            e.placeholder = sessionStorage.getItem(`${data[index]}`)
            index += 1
           })
        }
        
    },
    components :{
        userMenu
    }
}
</script>

<style scoped>
    ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #F8F9FA; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #333; 
    border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
    .image{
        width: 150px;
        height: 150px;
        border: 1px solid #747272;
        background-size: contain;
        border-radius: 75px;
        position: absolute;
        inset: 0;
        margin: auto;
        top: -350px;
        
    }
    #uploadFile{
        display: none;
    }
    .profilePreview{
        align-items: start;
        justify-content: center;
        overflow: hidden;
        overflow-y: scroll;
    }
    .uploadButton{
        width: 80px;
        height: 30px;
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        top: -150px;
        box-shadow: 2px 2px 5px #333;
    }
    .profilePreviewHeader{
        top: calc(300px + 75px * var(--i));
        left: 50px;
        position: absolute;
        inset: 1;
        margin: auto;
        font-weight: bold;
        padding-bottom: 40px;
    }
    .userInfo{
        position: absolute;
        left: 60px;
        top: calc(335px + 75px * var(--i));
        color: black;
        font-weight: 300;
        padding-bottom: 40px;
    }

    .dataSettings{
        width: 75vw;
        height: 80vh;
        position: relative;
        left: 25vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }   
    .setData ,.setContent{
        width: 50%;
        height: 100%;
        position: relative;
        display: grid;
        justify-content: start;
        align-items: center;
        padding-left: 100px;
        
    }
    .setData{
        padding-top: 50px;
        padding-bottom: 200px;
    }
    .setData p{
        text-align: start;
        padding-top: 50px;
    }
    .setData input[type='text']{
        height: 30px;
    }

    .setContent input[type="text"]{
        height: 30px;
        width: 250px;
    }
    .setContent p{
        text-align: start;
    }
    .goMain{
        position: absolute;
        inset: 0;
        margin: auto;
        width: 100px;
        height: 40px;
        bottom: 600px;
        left: 1400px;
       
    }
    .announcer{
        z-index: 1;
        width: 300px;
        height: 40px;
        right: -300px;
        bottom: 20px;
        font-size: 14px;
        transition: all 0.4s;
        opacity: 0;

    }
</style>