

const getName = async ()=>{

let name = await new Promise((resolve)=>{
    setTimeout(() => {
        resolve("emre");
    }, 1000);   
})
console.log(name)
}

getName();