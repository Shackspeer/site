



export const removeProduct = async(ID,productID) =>{
    let state 
    await fetch(`http://localhost:3000/remove/${ID}/${productID}`)
    .then(resp=>resp.json())
    .then(resp=> state = resp)
    return state 
}





