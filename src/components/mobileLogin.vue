<template>
  <div class="mainContainer">
    <div class="opener" @click="stateHandler()"><span class="material-symbols-outlined" style="color:whitesmoke;font-size: 40px;">{{ icon }}</span></div>
    <button class="registry btn btn-dark" style="--i:0" @click="rotateToLogin()">Login</button>
    <button class="registry btn btn-dark" style="--i:1" @click="rotateToSignin()">Sign up</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            isOpened : false,
            icon : 'chevron_right'
        }
    },
    methods:{
        stateHandler(){
            if(this.isOpened){
                document.querySelector(".mainContainer").style = "left:-300px";
                this.isOpened = !this.isOpened
            }
            else if(!this.isOpened){
                document.querySelector(".mainContainer").style = "left:0px";
                this.isOpened = !this.isOpened
            }
            
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
    }
}
</script>

<style scoped>
    .mainContainer{
        position: fixed;
        width: 300px;
        background-color: whitesmoke;
        height: 100vh;
        z-index: 9999;
        display: grid;
        justify-content: center;
        align-items: start;
        box-shadow: -2px 2px 10px #333;
        transition: all 0.4s;
        left: -300px;
    }
    .registry{
        width: 150px;
        margin: auto;
        padding: 0;
        position: absolute;
        inset: 0;
        height: 35px;
        bottom: calc(400px + (var(--i)*105px));
        
    }
    .opener{
        top: 40vh;
        position: relative;
        left: 168px;
        width: 35px;
        height:10vh;
        background-color: #333;
        display: grid;
        justify-content: center;
        align-items: center;
        border-top-right-radius: 10vw;
        border-bottom-right-radius: 10vw;
        z-index: 9998;
    }
</style>