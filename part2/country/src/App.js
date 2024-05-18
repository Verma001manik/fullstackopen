import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    console.log("country is now", country);
    if (country) {
      axios
        .get(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {
          setMatches(response.data);
          console.log("set matches",response.data);
        })
        .catch((error) => {
          console.log(error);
          setMatches([]);
        });
    }
  }, [country]);

 
  const handleChange = (event)=>{
    console.log(event.target.value);
    setValue(event.target.value);


  }
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(value);
    setCountry(value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        find country: <input value={value} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      <h2>Matches</h2>
      <ul>
  {matches.map(match => (
    <li key={match.name.common} >{match.name.common}</li>
  ))}
</ul>

     
    </div>
  );
};

export default App;
