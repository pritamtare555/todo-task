import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Home =()=>{

const [data,setData] = useState();
const [userData,setUserData] = useState();
const [isVisible,setIsVisible]= useState(false);
const [search,setSearch] = useState();



const getData = async ()=>{
    const result = await axios.get("https://jsonplaceholder.typicode.com/todos");
    let newResponse = result?.data.slice(0,10);
    setData (newResponse);    
   console.log(result.data);
}

useEffect(() => {
    getData();
}, []);



const handleViewUser= async(value)=>{
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${value.id}`)
    if(response.status==200){
        setIsVisible(true);
    }
    response.data["title"]=value.title;
    response.data["todoid"]=value.id;

    setUserData(response.data)
    // console.log(response.data);
    // console.log(id)
}

const handleSearch=()=>{
    const list = data?.filter((value,i)=>{
        if(search == value.id || search == value.title || search == value.completed.toString){
            return value;
        }    
    })
    setData(list);  
}

return(<>
 
 <div className="main">
    <div className="container">
   
        <div className="wrapper">

<div className="display-data">
<div className="search">
            <input type="text" name="search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            <button onClick={handleSearch}>Search</button>
            <button onClick={()=>{setSearch(""); getData()}}>Clear Search</button>
            
    </div>
              <table>
                  <tr className="tr">
                      <th>Todo Id</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Action</th>
                  </tr>

{
    data?.map((value,index)=>{
        return (
            <tr className="tr" key={index}>

                    <td>{value.id}</td>
                    <td>{value.title}</td>
                    <td>{value.completed.toString()}</td>
                    <td>{<button onClick={()=>{handleViewUser(value)}}>view user</button>}</td>
                    <hr/>
                  
            </tr>

           
        )
        
   })
   }         
              </table>
</div>



<div className="view-data">
<div className="view-data-content">
<h2 >User Details</h2>
{

    isVisible && (      
<ul>
    <li>Todo ID :{userData?.todoid}</li>
    <li>User ID:{userData?.id}</li>
    <li>ToDo Title:{userData?.title}</li>
    <li>Name:{userData?.name}</li>
    <li>Email:{userData?.email}</li>
</ul> )
}
</div>
</div>


        </div>
    </div>
 </div>
</>);
};


export default Home ;