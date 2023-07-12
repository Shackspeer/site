<template>
    <button @click="counter" style="margin-top: 300px;">Arttır</button>
    <p>Value: {{ count }}</p>
    <p>Message: {{ message }}</p>
    
    
</template>

<script>



export default {
   data(){
    return{
        count : 0,
        message : "çift"
    }
   },
   mounted(){
    this.changeText
   },
   computed:{
    changeText(){
        this.message = this.count % 2 === 0 ? "çift" : "tek"
    }
   } ,
   methods:{
    counter(){
        this.count = this.count +1;
    }
   }, 
   watch:{
    message(newMessage){
        this.message = newMessage
    }
   }  
    
}
</script>

<style>

</style>