



export const removeProduct = async(ID,productID) =>{
    let state 
    await fetch(`http://192.168.184.214:3000/remove/${ID}/${productID}`)
    .then(resp=>resp.json())
    .then(resp=> state = resp)
    return state 
}





