import { useEffect } from "react";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL of the API endpoint you want to call
    const apiUrl = "https://restcountries.com/v3.1/all";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the JSON response
        return response.json();
      })
      .then((data) => {
        // Set the data in state
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        // Set the error in state
        setError(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="App">
      {data &&
        data.map((ele) => {
          return (
            <div className="card">
              <div className="img">
                <img src={ele.flags.png} alt={ele.flags.alt} />
              </div>
              <div>{ele.capital}</div>
            </div>
          );
        })}
    </div>
  );
}
