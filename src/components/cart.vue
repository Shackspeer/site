<template>
  <div v-if="true" class="mainContainer1" ref="cart">
    <div v-if="emptyState" class="emptyCartMessage"><p>Your cart is still empty <span><a href="/">Click here for filling cart</a></span></p></div>
    <div >
      <div class="singleCart" ref="singleCart" v-for="cart in rows" :key="cart.propertyId">
        <img :src="require(`../assets/web-site-${cart.propertyId}.png`)" class="singleImage">
        <div class="productData">
          <div><span class="productIdentity text-capitalize">{{ cart.propertyIdentity }}</span></div>
          
        </div>

        
        <div class="productPricing">
          <h5 class="priceHeader">Price</h5>
          <span class="price">${{ cart.propertyPrice }}</span>
          <button class="btn btn-dark" @click="deleteSomething(cart.id)">remove</button>
        </div>
        
      </div>
    </div>
  </div>
  
  
</template>

<script>
import {removeProduct} from '../methods/remover'



export default {
  data() {
    return {
      data: JSON.parse(sessionStorage.getItem("userData")),
      amount : [],
      rows: [],
      emptyState: false,
      src: require('../assets/web-site-2.png'),
      length: 0
    }
  },
  async created() {
    await this.getUserData();
    this.$emit("sendRows",this.amount)
    this.emptyStateController();
  },
  methods: {
    //Get user data
        async getUserData() {
          try {
            const response = await fetch(`http://192.168.184.214:3000/createCart/${this.data.id}`);
            const data = await response.json();
            this.amount = await data
            const encodedData = data[data.length - 1].rows;
            
            const decodedData = encodedData.map(e => ({
              propertyId: e.propertyId,
              propertyIdentity: atob(e.propertyIdentity),
              propertyPrice: atob(e.propertyPrice),
              id: e.id
            }));
            this.rows = decodedData;
            
            this.length = this.rows.length;
            this.$emit("getLength", this.rows.length);
          } catch (error) {
            console.error(error);
          }
    },
    emptyStateController() {
      this.emptyState = this.length === 0;
    },
    async deleteSomething(productId) {
      await removeProduct(this.data.id, productId);
      await this.getUserData();
      this.$emit("sendRows",this.amount)
    },
    

  },
  watch: {
    rows(newRows) {
      this.length = newRows.length;
      this.emptyStateController();
    }
  }
}

</script>

<style scoped>

     .mainContainer1{
        position: absolute;
        display: grid;
        width: 60vw;
        height: 100vh;
        overflow: hidden;
        overflow-y: scroll;
    }

    .mainContainer1::-webkit-scrollbar{

      width: 15px;
    }
     .mainContainer1::-webkit-scrollbar-thumb{
      background-color: #333;
      
    }
     .mainContainer1::-webkit-scrollbar-track{
      
      background-color: #f0f0f0;
    }
    .singleCart{
      width: 100%;
      height: 184px;
      display: flex;
      justify-content: start;
      padding-left: 40px;
      align-items: center;
      border-bottom : 1px solid hsl(0,2%,89%)
    }
    .singleImage{
      width: 150px;
      height: 100px;
      filter: drop-shadow(0px 0px 2px black);
    }
    .productPricing{
      position: relative;
      display: grid;
      justify-content: end;
      align-items: center;
      width: 80%;
      height: 100%;
      margin-right: 10px; 
    }
    .btn{
      width: 140px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .price{
      font-size: 16px;
      position: relative;
      margin-top: 0px;
    }
    .priceHeader{
      margin-top: 50px;
    }
    .productData{
      display: grid;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 184px;
      margin-left: 40px;
    }
    .emptyCartMessage{
      position: relative;
      width: 60vw;
      height: 100vh;
    }
    .emptyCartMessage p{
      position: absolute;
      inset: 0;
      margin: auto;
      width: 350px;
      height: 40px;
    }
    .emptyCartMessage a{
      text-decoration: none;
      color: #175;
    }
    .productIdentity{
      font-size: 18px;
      font-weight: 600;
    }
    

    @media only screen and (max-width:480px) {
    .mainContainer1{
      display: grid;
      justify-content: start;
      align-items: start;
      position: relative;
      width: 100vw;
      height: max-content;
      overflow: hidden;
    }
    .singleCart{
      width: 100vw;
      height: 50vh;
      background-color: #F8F9FA;
      display: grid;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }
    .singleImage{
      position: relative;
      right: 5px;
    }
    .productPricing{
      position: relative;
      bottom: 0;
      display: grid;
      width: max-content;
      height: 150px;
      justify-content: center;
      align-items: center;
      padding: 0;
      margin: 0;
      left: 10px;
    }
    .productPricing h5,.productPricing span{
      text-align: center;
    }
    .productData{
      display: none;
    }
  }
</style>