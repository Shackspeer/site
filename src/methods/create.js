





export const createCart = async (id) => {
    let body = { id: id };
  
    let options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    };
  
    try {
      const response = await fetch('http://localhost:3000/createUserCart', options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  