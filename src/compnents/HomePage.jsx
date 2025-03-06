import React,{ useState,useEffect} from "react"


function LoadImage(){

const [data, setData] = useState([]);
const [error, setError]= useState(null);
const catNames = ["Whiskers", "Mittens", "Luna", "Oliver", "Simba", "Nala", "Leo", "Bella", "Charlie", "Daisy"];


useEffect(()=>{
    const fetchData=async()=>{
        try{
            const response=await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
            const jsonData = await response.json();
            setData(jsonData.map((cat, index) => ({ ...cat, name: catNames[index % catNames.length] })));
        }catch(err){
            setError(err);
        }
    };
        fetchData();
});


return (
    <div>
      {error && data.size === 0 && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {data.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {data.map((cat, index) => 
          (
          <div key={index} style={{ textAlign: "center" }}>
                <img key={index} src={cat.url} alt="Random Cat" width="200" height="200" style={{ borderRadius: "10px" }} />
                <p>{cat.name}</p>
           </div>
          ))}
        </div>
      ) : (
        <p>Loading Data...</p>
      )}
    </div>
  );

}
export default LoadImage;

