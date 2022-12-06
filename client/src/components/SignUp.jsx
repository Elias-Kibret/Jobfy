
import { useState } from "react"
 const [info, setInfo] = useState([{
     Name: '',
     Email: ''
     }])
	
 const inputsProperty = [
    {
        id:1,
        type: 'text',
        name: 'Name',
        placeHolder:'FirstName'
    }, //Add emial,password,location,
    { 
        id: 2,
        type: 'email',
        name: 'Email',
        placeHolder:'Email'
    },	
 ]	
 const handleOnChange = (e) => {
     setInfo({...info,[e.target.name]:[e.target.value]})
 }
 export const SignUp = () => {
   return (
       <div>
         {
              inputsProperty.map((items) => {
						
                 return (
                     <input key={items.id}
                         type={items.type}
                         name={items.name}
                         value={info.value}
                         placeholder={items.placeHolder}
                         onChange={handleOnChange} />
                 )
             })
         }
     </div>
   )
 }
                          //  👦 Your boy Elias Kibret