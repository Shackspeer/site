<template>
  <div v-if="addedState==true" class="MSG MSG_added alert-success" ref="success">Product successfully added to cart</div>
  <div v-if="!addedState" class="MSG MSG_add_error alert-danger" ref="fail"> Product could not be added to the cart</div>

  
  <div class="logo position-absolute">
    <img src="../assets/libslogo.png">
  </div> 

  <userMenu v-if="isLogedin"></userMenu>

  <!-- Registry -->
    <div v-if="mustLogin" class="mobileRegistry" ref="mobileRegistry">
      <mobile/>
    </div>
  
  
  
    <div v-if="mustLogin" class="position-absolute registryMain" ref="desktopRegistry">
      <div class="registry login text-light px-3 text-center mx-2 d-flex" style="width: 100px;height:30px;border-radius: 15px;justify-content: center;align-items: center;font-size: 14px;cursor: pointer;transition: all 0.4s;"><a @click="rotateToLogin()">Login</a></div>
      <div class="registry signin text-light px-3 text-center mx-2 d-flex" style="width: 100px;height:30px;border-radius: 15px;justify-content: center;align-items: center;font-size: 14px;cursor:pointer;transition: all 0.4s;"><a @click="rotateToSignin()">Register</a></div>
    </div>
  







  
  
  <!-- Banner -->

  <div class="container-fluid  bg-white vw-100 vh-100 d-flex text-center align-items-center" >
    <div class="container-fluid bg-white w-50 bannerLayout_1">
      <h1 class="text-uppercase">Choose your design</h1>
      <p>Chose your most wished web page that approved by <img src="../assets/libslogo.png" style="width: 100px; height: 100px;user-select: none;-webkit-user-drag:none;position: relative;right: 15px;"></p>
      <button class="btn btn-secondary"><a href="#Vue" class="text-light">Start explore</a></button>
    </div>
    <div class="container-fluid bg-white w-50 h-100  align-items-center bannerImage">
      <img src="../assets/10168.jpg" class="w-100 h-75">
    </div>  
  </div>

  <!-- Referance Logos -->

  


  <!-- Vue Header -->
  
  
  <div class="container-fluid vw-100 vh-100 bg-light  position-relative text-center vue_templates" style="top: 460px;z-index: 7;" id="Vue">
    <div class="position-absolute  bg-light text-dark p-5" style="top:-150px;left: 0;width: 100vw">
      <h1><img src="../assets/logo.png" style="width: 50px;height:60px;"> VUE TEMPLATES</h1>
    </div>
    <div class="container-fluid h-100 bg-light text-dark d-grid singleProduct">
      <h3>Vue Page 1</h3>
      <img  src="../assets/web-site-2.png" class="w-75 h-100 position-relative p-3 mx-auto websites" style="top:0px;filter: drop-shadow(1px 1px 5px black);">
      <h4>Ingredients</h4>
      <!-- List of ingredients-->
      <ul class="d-grid" style="list-style-type: none;justify-content: center;">
        <li><i class="fa-solid fa-square-check"></i> HD photos</li>
        <li><i class="fa-solid fa-square-check"></i> Donate System</li>
        <li><i class="fa-solid fa-square-check"></i> powered with Vue.Cli</li>
        <li><i class="fa-solid fa-square-check"></i> Coded with Vue</li>
        <li><i class="fa-solid fa-square-check"></i> Responsive build</li>
        <li><i class="fa-solid fa-square-check"></i> Bootstrap</li>
      </ul>
      <!-- Buttons -->
      <div class="d-flex container position-relative" style="width: 100%;height: 40px;justify-content: center;">
        <button @click="rotate1()" class="btn btn-success mx-1">Preview</button>
        <button class="btn btn-light border border-dark mx-1 adder" @click="addToCart()">Add to cart</button>
      </div>
    </div>
    
    
    <div class="line" style="border: 1px solid #333;width: 0px; height: 650px;box-sizing: border-box;position: absolute;left: 50.5%;top:-10px;"></div>
    
    
    <div class="container-fluid h-100 bg-light text-dark d-grid  singleProduct" >
      <h3>Vue Page 2</h3>
      <img  src="../assets/web-site-2.png" class="w-75 h-100 position-relative p-3 mx-auto websites" style="top:0px;filter: drop-shadow(1px 1px 5px black);">
      <h4>Ingredients</h4>

       <!-- List of ingredients-->
      <ul class="d-grid" style="list-style-type: none;justify-content: center;">
        <li><i class="fa-solid fa-square-check"></i> HD photos</li>
        <li><i class="fa-solid fa-square-check"></i> Donate System</li>
        <li><i class="fa-solid fa-square-check"></i> Not Responsive</li>
        <li><i class="fa-solid fa-square-check"></i> powered with Vue.Cli</li>
        <li><i class="fa-solid fa-square-check"></i> Coded with Vue</li>
      </ul>

      <!-- Buttons -->
      <div class="d-flex container position-relative" style="width: 100%;height: 40px;justify-content: center;">
        <button class="btn btn-success mx-1 preview">Preview</button>
        <button class="btn btn-light border border-dark mx-1 adder" @click="addToCart()">Add to cart</button>
      </div>
    </div>
    
  </div>
  
  
</template>

<script>

// @ is an alias to /src

import userMenu from '../components/userMenu.vue'
import mobile from '../components/mobileLogin.vue'
export default {
  name: 'HomeView',
  data(){
    return{
      addedState : null,
      sections : [{name:"INTRODUCTION",src:"#introduction"},{name:"WEB PAGES",src:"#webpages"}],
      isLogedin : sessionStorage.getItem("status"),
      userData : JSON.parse(sessionStorage.getItem("userData")),
      mustLogin : true,
      SCvisible : false,
      inserted : false,
      isMobile : false,
      data : []
    }
  },

 
  components:{
    userMenu,
    mobile
   
  },
  methods:{
    rotate1(){
      window.parent.location.href = "/wb2"
    },
    rotateToLogin(){
      sessionStorage.clear()
      sessionStorage.setItem('login',true)
      window.parent.location.href = "/registry"
    },
    rotateToSignin(){
      sessionStorage.clear()
      sessionStorage.setItem('register',true)
      window.parent.location.href = "/registry"
    },
    async addToCart(){

      if(this.isLogedin){let body = {
        id : this.userData.id,
        propertyId : 2,
        propertyIdentity : "vue template 1",
        propertyPrice : 49.99
      }


      let options = {
        method : "POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify(body)
      }



      await fetch("http://192.168.184.214:3000/createCart",options)
      .then(resp=>resp.json())
      .then(resp=>{
          this.inserted = resp.inserted
          this.addedState = this.inserted    
               
        
      })
      
      setTimeout(()=>{
        document.querySelectorAll(".adder").forEach(e=>e.disabled=true)
        document.querySelector(".MSG").style = "right:0px;opacity:1" 
      },50)
      setTimeout(()=>{
        document.querySelector(".MSG").style = "right:300px;opacity:0;"
      },1550)
      setTimeout(()=>{
        document.querySelector(".MSG").style = "right:-450px;opacity:0"
        document.querySelectorAll(".adder").forEach(e=>e.disabled=false)
      },2050)}
      else{
        this.rotateToSignin()
      }
    }

  
  },
  mounted(){
    sessionStorage.getItem("status") ? this.mustLogin = false : this.mustLogin = true
    sessionStorage.getItem("status") ? this.isLogedin = true : this.isLogedin = false

    if(!this.isLogedin){
      window.addEventListener("resize",()=>{
      if(window.innerWidth<=600){
        this.mobile = !this.mobile
      }
      else if(window.innerWidth>600){
        this.mobile = !this.mobile
      }
    })
    }
  }
 
}
</script>
<style scoped>
  *{
    scroll-behavior: smooth;
  }
  .logo{
    top:-50px;z-index: 7;
  }
  .singleProduct{
    width: 50vw;
    padding-bottom: 100px;
  }
  .vue_templates{
    display: flex;
  }
  .bannerImage{
    display:grid
  }

  ul li{
    text-align: start;
  }
  i{
    color: #175;
  }
  a{
    text-decoration: none;
  }
  .section{
   
   height: 30px;
   width: 100px;
   display: flex;
   justify-content: center;
   align-items: center;
   margin-bottom: 5px;
   transition: all 0.5s;
   position: relative;
   right: -100px;
   opacity: 0;
   transition-delay: calc(60ms * var(--i));
  }
 
  .dropdown{
    width: 70px;
    height: 35px;
    display: grid;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #222;
  }
  .dropdown:hover .section{
    display: flex;
    right: 0;
    opacity: 1;
  }
  .dropdown:hover{
    background-color: #444;
  }
  a{
    text-decoration: none;
  }
  .registry{
    background-color: #222;
  }
  .registry:hover{
    background-color: #444;
    opacity: 0.7;
  }
  .MSG{
    width: 400px;
    height: 35px;
    position: fixed;
    bottom: 0px;
    z-index: 999;
    margin: 0 20px 20px 0px;
    right:  -450px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s all;
  }
  .registryMain{
    display: flex;
    z-index: 8;
    right: 50px;
    top: 20px;
  }
  .singleProduct{
    width: 100vw;
    height: 100px;
    padding-top: 200px;
    border-top: 1px solid #333;
  }
  .logo img{
    width: 200px;height: 200px;
  }
  .mobileRegistry{
    display: none;
  }
  
  @media screen and (max-width: 900px){
    
    .bannerImage{
      display: none;
      
    }
    .bannerLayout_1{
      position: relative;
      top: 100px;
    }

  }

  @media screen and (max-width: 600px){
    .vue_templates{
      display: grid;
    }
    .line{
      display: none;
    }
    .registryMain{
      display: none;
    }
    .logo{
      position: absolute;
      margin: auto;
      inset: 0;
      right: 40px;
      top: -20px;
    }
    .logo img{
      width: 300px;
      height: 300px;
    }
    .mobileRegistry{
      display: grid;
    }
  }
  
  

</style>