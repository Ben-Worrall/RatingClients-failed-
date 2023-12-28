import { Link} from "react-router-dom";
import './styles/JoinRoom.css'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Home from "../Home";
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField} from 'firebase/firestore'

const db = getFirestore()

const JoinRoom = () => {
    let navigate = useNavigate();
    async function GoHomeBNT(){
        navigate('/')
        const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      document.getElementById('root')
    )
}

async function JoinRoomBNT(){
    //get code the user typed up
    let roomcodeINPUT = document.getElementById('JoinRoomInput').value
    

    //check if its a 4 digit number and if its between 1000 and 9999
    if(roomcodeINPUT.length == 4){
        if(roomcodeINPUT >= 1000 && roomcodeINPUT <= 9999){
            
            //now that u have a legal code, check if its in the database, 
            //if its not in the database then its being usedi n a server and u can connect
            const querySnapshot = await getDocs(collection(db, "AvailableCodes"));
            querySnapshot.forEach((doc) => {
                
                if(roomcodeINPUT == doc.data()[roomcodeINPUT]){
                    console.log('in database')
                    alert('There is no server with that code. Please check code and try agian')
                } else {
                    console.log('not in database')
                    
                }
                
               });


            
            
            
            console.log(roomcodeINPUT, " yes it works")
        } else {
            alert('Whoops! Make sure you have the right code and try again')
        }
    } else {
        alert('Whoops! Make sure you have the right code and try again')
    }



} 

    return (
        
        
        
        <div id='JoinRoomHolder'>

           
            <button id='JoinRoomBackBNT' onClick={GoHomeBNT}>back</button>
            <div id="JoinRoomMain">
            <input placeholder="Username" id='JoinRoomUserName' autocomplete="off" type="text" ></input>
            <input placeholder="Room Code" id='JoinRoomInput' autocomplete="off" type="number"    ></input>
            <input value="Join Room" id="JoinRoomBNT" type="submit" onClick={JoinRoomBNT} ></input>
            </div>
        </div>
    )
}


export default JoinRoom