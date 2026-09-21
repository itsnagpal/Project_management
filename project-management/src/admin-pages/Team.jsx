import { useEffect, useState } from "react"
import {users} from "../data/userMockData"
import StatsCard from "../Components/StatsCard"
import {useUsers} from "../context/UserContext"
import "../styles/team.css"

export default function Team(){

    const {users} = useUsers()
 
    const [allUsers, setAllUsers]= useState(users)
    useEffect(()=>{
        localStorage.setItem("users", JSON.stringify(allUsers))
        console.log("hello")
    },[allUsers])
    console.log(users)
    function Users(){
        return(
        allUsers.map(function(user){
            return(
                <StatsCard
                key={user.id} 
                value={user.name} 
                label={user.id}/>
            )
        }))
    }
    return(
      <>
        <div className="card-grid">
        <Users/>
        </div>
    
      </>
    )
}