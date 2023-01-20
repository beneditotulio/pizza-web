import React, { useState, useEffect } from "react";


const Pizza = ({ pizza }) => {
   const [data, setData] = useState(pizza);
   const [dirty, setDirty] = useState(false);

   function update(value, fieldName, obj) {
     setData({ ...obj, [fieldName] : value });
     setDirty(true);
   }

   function onSave() {
     setDirty(false);
     // make rest call
   }

   return (<React.Fragment>
     <div>
     <h3>
       <input onChange={(evt) => update(evt.target.value, 'name', data)} value={data.name} /> 
     </h3>
     <div>
       <input onChange={(evt) => update(evt.target.value, 'description', data)} value={data.description} />
     </div>
     {dirty ? 
      <div><button onClick={onSave}>Save</button></div> : null
     }
     </div>
   </React.Fragment>);
}

const Main = () => {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    fetchData();
  }, [])

  function fetchData() {
    fetch("/pizza")
      .then(response => response.json())
      .then(data => setPizzas(data)) 
  }

  const data = pizzas.map(pizza => <Pizza pizza={pizza} />)

  return (<React.Fragment>
    {pizzas.length === 0 ?
     <div>No pizzas</div> :
     <div>{data}</div>
    }
  </React.Fragment>)
}

export default Main;