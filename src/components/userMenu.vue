<template>
    <div  class="sideBarBg">
        <div class="menu">  
            
            <p class="personalSettings mainSections" @click="openPersonalSetting()"><span class="material-symbols-outlined" style="position: relative;right: 130px;top: 5px;cursor: pointer;" v-text="psIcon1"></span>Personal settings</p>
            <div class="section" style="--i:1"><a href="#" @click="toProfile()">Profile <span class="material-symbols-outlined" style="padding:0 10px 0px 20px">person</span></a></div>
            <div class="section" style="--i:2"><a href="#" @click="toCart()">Shopping Cart <span class="material-symbols-outlined" style="padding:0 10px 0px 20px">shopping_cart</span></a></div>
            <div class="section" style="--i:3"><a href="#">Notifications <span class="material-symbols-outlined" style="padding:0 10px 0px 20px">notifications</span></a></div>
            <p class="templates mainSections" @click="openTemplates()"><span class="material-symbols-outlined" style="position: relative;right: 180px;top: 5px;cursor: pointer;" v-text="psIcon2"></span>Templates</p>
            <div class="templateBox">
                <div class="section2" style="--i:1"><a href="/#Vue">Vue templates <i class="fa-brands fa-vuejs" style="padding:0 10px 0px 20px;font-size: 20px;"></i></a></div>
                <div class="section2" style="--i:2"><a href="#">Vanilla templates<i class="fa-solid fa-ice-cream" style="padding:0 10px 0px 20px;font-size: 20px;"></i></a></div>
            </div>
            
        </div>
    </div>
    <div class="toggle" @click="openSideBar()">
        <span class="material-symbols-outlined" v-text="icon"></span>
    </div>
</template>

<script>
export default {


    data()
    {

        return{
            isOpened : false,
            personalSettings : false,
            templates : false,
            icon : 'chevron_right',
            psIcon1 : 'expand_more',
            psIcon2 : "expand_more"
        }

    },
    methods:{
        openSideBar(){
            this.isOpened = !this.isOpened

            if(this.isOpened){
                document.querySelector(".sideBarBg").style = "right:0px;box-shadow: 0px -5px 10px #666;"
                document.querySelector(".toggle").style = "right:300px;"
                


                this.icon = 'chevron_left'
            }
            else if(!this.isOpened){
                
                document.querySelector(".sideBarBg").style = "right:-300px;box-shadow: 0px 0px 0px #666;"
                document.querySelector(".toggle").style = "right:0px;"
                this.icon = 'chevron_right'
            }
        },
        
        
        openPersonalSetting(){
            this.personalSettings = !this.personalSettings
            if(this.personalSettings){
                document.querySelector(".personalSettings").style = "opacity:0.7"
                document.querySelector(".templates").style.top = "225px"
                document.querySelector(".templateBox").style.top = "270px"
                this.psIcon1 = 'expand_less'
                setTimeout(()=>{
                    let elements = document.querySelectorAll(".section")
                    elements.forEach((e)=>{
                        e.style.display = "flex"
                        
                        setTimeout(()=>{
                            e.style.left = "0px"
                        },100)
                       
                    })
                },20)

            }
            else if(!this.personalSettings){
                document.querySelector(".personalSettings").style = "opacity:1"
                
                this.psIcon1 = 'expand_more'
                setTimeout(()=>{
                    let elements = document.querySelectorAll(".section")
                    
                    elements.forEach((e)=>{
                        e.style.left = "300px"
                        setTimeout(()=>{
                           e.style.display = "none"
                           document.querySelector(".templates").style.top = "125px"
                           document.querySelector(".templateBox").style.top = "170px"
                        },400)
                    })
                },20)
            }
        },
        openTemplates(){
            
            this.templates = !this.templates
            if(this.templates){
                document.querySelector(".templates").style.opacity = 0.7
                
                this.psIcon2 = 'expand_less'
                setTimeout(()=>{
                    let elements = document.querySelectorAll(".section2")
                    elements.forEach((e)=>{
                        e.style.display = "flex"
                        setTimeout(()=>{
                            e.style.left = "0px"
                        },100)
                       
                    })
                },20)

            }
            else if(!this.templates){
                document.querySelector(".templates").style.opacity = 1
                
                this.psIcon2 = 'expand_more'
                setTimeout(()=>{
                    let elements = document.querySelectorAll(".section2")
                    
                    elements.forEach((e)=>{
                        e.style.left = "300px"
                        setTimeout(()=>{
                           e.style.display = "none"
                          
                        },400)
                    })
                },20)
            }
        },
        toProfile(){
            window.parent.location.href = "/profile"
        },
        toCart(){
            window.parent.location.href = "/cart"
        }
    },
    mounted(){
        
        
    }

    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cookie&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap');




.sideBarBg{
    top: 0px;
    right: -300px;
    width: 300px;
    height: 100vh;
    background: whitesmoke;
    position: fixed;
    z-index: 9999;
    transition: all 0.4s;
    color: #333;
    
}
.toggle{
    top: 45%;
    position: fixed;
    z-index: 10;
    cursor: pointer;
    right: 0px;
    transition: all 0.4s;
    box-shadow: 2px -2px 10px #333;
}
.toggle span{
    height: 60px;
    width: 30px;
    font-size: 30px;
    color: whitesmoke;
    background: #333;
    border-radius: 0;
    
    display: flex;
    align-items: center;
}
.menu{
    margin-top: 70px;
    width: 100vh;
    display: grid;
    align-items: start;
    color: black;
    
}
.section{
    top: 40px;
    position: relative;;
    left: 300px;
    right: -300px;
    width: 280px;
    height: 35px;
    display: none;
    justify-content: center;
    align-items: center;
    transition: all 0.4s;
    transition-delay: calc(60ms * var(--i));
    margin-left: 10px;
    border-radius: 17px;
    background: whitesmoke;
    font-weight: 500;
}
.section:hover{
    background-color: 	rgb(207, 207, 216);
    color: white;
    
}
.section a{
    text-decoration: none;
    color: #333;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: inherit;
    height: inherit;
    
}

.personalSettings{
    color: black;
    position: absolute;
    right: 5px;
    opacity: 1;
    transition: all 0.4s;
    font-size: 16px;
}
.templates{
    color: black;
    position: absolute;
    right: 4px;
    top: 125px;
    opacity: 1;
    transition: all 0.1s;
    font-size: 16px;
    z-index: 19;
    
}
.section2{
    position: relative;
    left: 300px;
    right: -300px;
    width: 280px;
    height: 35px;
    display: none;
    justify-content: center;
    align-items: center;
    transition: all 0.4s;
    transition-delay: calc(60ms * var(--i));
    margin-left: 10px;
    border-radius: 17px;
    background: whitesmoke;
    font-weight: 500;
}
.section2:hover{
    background-color: 	rgb(207, 207, 216);
    color: white;
    
}
.section2 a{
    text-decoration: none;
    color: #333;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: inherit;
    height: inherit;
    
}
.templateBox{
    position: absolute;
    top: 170px;
    right: 13.5px;
}
</style>