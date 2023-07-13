<template>
  <userMenu />
  <div class="mainContainer" ref="main">
    
    <div class="cart">
      <cart class="subCart" @getLength="getNewLength" @sendRows="getRows"/>
    </div>
    <div class="totalAmount" ref="amount">
      <h3 class="totalHeader ">Cart totals</h3>
      <h5 class="totalProduct">Products</h5>

      <div class="mainCountBox">
        <div class="countBox" v-for="count in amount" :key="count.propertyId">
          <span class="c_productName">{{ productNameHandler(count.propertyId) }} <span style="padding-left: 300px;"><span class="mx-2">x</span><span>{{ count.count }}</span></span></span>
        </div>
      </div>
      <div class="totalPayment">
        <span style="font-size:16px">Total<span style="padding-left: 350px;font-size: 14px;">$ {{ this.total }}</span></span>
      </div>
      
      
    </div>
  </div>
  
</template>

<script>
import cart from '../components/cart.vue'
import userMenu from '../components/userMenu.vue'

export default {
    data(){
      return{
        total : 0,
        data : JSON.parse(sessionStorage.getItem("userData")),
        tempData : [],
        amount : [],
        rows : [],
        length1 : 0,
        screenWidth : screen.width

        
      }
    },
    components : {
        cart,
        userMenu
    },
    methods:{
      getNewLength(length){
        this.length1 = length
      },
      getRows(rows){
        
        this.rowController(rows)
        this.amountController(rows)
        this.calcTotal(this.rows)
        console.log(this.amount)
        console.log(this.rows)
      },
      amountController(array){
        this.amount = []
        array.filter((e)=>{
          if(e.count!==undefined&&e.count!==null){
            this.amount.push(e)
          }
        })
      },
      rowController(array){
        this.rows = []
        array.filter((e)=>{
          if(e.rows!==null&&e.rows!==undefined){
            this.rows.push(e.rows)
          }
        })
      },
      async calcTotal(array){
        this.total = 0
        let newArray = this.decodeData(array); 
        newArray.forEach(e=>{
          let totalText = this.total + Number(e.propertyPrice)
          this.total = Number(totalText.toString().slice(0,7))
          
        })
        
       
      },
      productNameHandler(id){
        switch(id){
          case 1 : return "Vue template 0"
          case 2 : return "Vue template 1"
          case 3 : return "Vue template 3"
        }
      },
      decodeData(encodedArray){
        let decodedArray = encodedArray[0].map((e)=>({
              propertyId: e.propertyId,
              propertyIdentity: atob(e.propertyIdentity),
              propertyPrice: atob(e.propertyPrice),
              id: e.id
        }))
        return decodedArray
      }
      
    },
   
    
    async mounted(){




       setTimeout(async ()=>{
        
        await new Promise(()=>{
          if(window.innerWidth<480){
            this.$refs.amount.style.top = 50*(this.length1) - 100 + "vh";
          }
          else{
            this.$refs.amount.style.top = "0vh";
          }
        })
        
       },30)
       
       
      
    },
    watch:{
      screenWidth(newValue){
        if(newValue<480){
          this.$refs.amount.style.top = 50*(this.length1) - 100 + "vh";
        }
      }
    }
    
}
</script>

<style scoped>

  *{
    color: #555;
  }
  .cart{
    position: relative;
    width: 60vw;
    height: 100vh;
    background-color: 	#F8F9FA;
  }
  .mainContainer{
    width: 100vw;
    height: max-content;
    display: flex;
  }
  .totalAmount{
    position: relative;
    display: grid;
    width: 40vw;
    height: 100vh;
    box-shadow: 0px -1px 5px #999;
    justify-items: center;
    align-items: start;
  }
  .totalHeader{
    position: relative;
    top: 100px;
    width: 80%;
    padding: 50px 270px 15px 0px;
    font-weight: 400;
    margin-right: 30px;
   
  }
  .totalProduct{
    display: grid;
    justify-content: start;
    border-top: 1px solid #999;
    position: relative;
    margin-top: 50px;
    padding: 50px 0 15px 10px;
   
    height: 150px;
    font-weight: 400;
    width: 80%;
  }

  .countBox{
    
    width: 100%;
    height: 40px;
    text-align: start;
    padding-left: 20px;
    background: transparent;
    font-size: 14px;
    opacity: 0.8;
  }
  .mainCountBox{
    position: relative;
    height: max-content;
    bottom: 120px;
    width: 100%;
    margin-left: 120px;
  }
  .totalPayment{
    position: relative;
    border-top: 1px solid #999;
    width: 80%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    opacity: 0.8;
  }




  @media only screen and (max-width:480px) {
    .mainContainer{
      display: grid;
    }
    .totalAmount{
      width: 100vw;
      height: 100vh;
      
    }
    .totalProduct{
      top: -100px
    }
    .cart{
      width: 100vw;
    }
    
  }
</style>