import { useEffect, useState } from "react";
import axios from "axios";


function App() {


  useEffect(() => {
    const getData = () => {
      axios.get("http://127.0.0.1:5000").then((res) => {
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

    const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Upload response:', response.data);

  };
  


  return (
    <div className="flex justify-center items-center h-screen">
      <form action="" onSubmit={handleSubmit}>
        <input className="" type="file" id="fileInput"/>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default App;
