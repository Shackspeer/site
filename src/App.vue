<template>
  <nav>
    
  </nav>
  <router-view/>
</template>

<style>
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
}

nav {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  
}

nav a {
  font-weight: bold;
  color: white;
  font-size: 20px;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-family: 'Roboto Mono', monospace;
  letter-spacing: 0px;
  margin-right: 100px;
}

nav a.router-link-exact-active {
  color: #001669
}
</style>
