import { useEffect } from "react";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL of the API endpoint you want to call
    console.log("changing");
    const apiUrl = "https://restcountries.com/v3.1/all";

    // Fetch data from the API
   const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      {data ?
        data.map((ele) => {
          return (
            <div className="card">
              <div className="img">
                <img src={ele.flags.png} alt={ele.flags.alt} />
              </div>
              <div>{ele.capital}</div>
            </div>
          );
        }):<div>{error?<div>{error}</div>:""}</div>}
    </div>
  );
}
