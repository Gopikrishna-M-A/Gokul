import { useEffect, useState } from "react";
import axios from "axios";


function App() {

  const [data,setData] = useState('')

  useEffect(() => {
    const getData = () => {
      axios.get("https://gokul-75e2.onrender.com").then((res) => {
        console.log(res.data);
      });
    };
    getData();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.elements.fileInput.files[0]
    // console.log('Uploaded file:', file);
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('https://gokul-75e2.onrender.com/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Upload response:', response.data);
    setData(response.data)

  };
  


  return (
    <div className="flex justify-center items-center h-screen">
      <form action="" onSubmit={handleSubmit}>
        <input className="" type="file" id="fileInput"/>
        <button type='submit'>submit</button>
        <p>response from server : {data ? data : 'waiting ...'}</p>
      </form>
    </div>
  );
}

export default App;
