import { useEffect, useState } from "react";
import axios, { spread } from "axios";
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Toaster } from "./components/ui/toaster"
import { useToast } from "./components/ui/use-toast"

function getCurrentDateTime() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const currentDate = new Date();
  const day = days[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  const formattedDateTime = `${day}, ${month} ${date}, ${year} at ${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  
  return formattedDateTime;
}





function App() {

  const [loading,setLoading] = useState(false)
  const { toast } = useToast()

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

    try{
      setLoading(true)
      const response = await axios.post('https://gokul-75e2.onrender.com/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast({
        title: response.data,
        description: getCurrentDateTime(),
      })
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false)
    }   
  };
  


  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster />
      <form action="" onSubmit={handleSubmit} className={`border border-dashed text-center p-5 rounded-md flex flex-col gap-4 ${loading && 'animate-pulse'}`}>
         <h1 className="font-bold">DeepFake Detector</h1>
        <Input className="" type="file" id="fileInput"/>
        <Button type='submit'>submit</Button>
      </form>
    </div>
  );
}

export default App;
