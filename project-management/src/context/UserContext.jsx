import { createContext, useContext, useEffect, useState } from "react";
import { users as mockUsers} from "../data/userMockData";

const UserContext = createContext(null)

export function UserProvider({children}){
    const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users")
    return saved ? JSON.parse(saved) : mockUsers
  })

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  function addUser(user) {
    const newUser = { ...user, id: Date.now() }
    setUsers(prev => [...prev, newUser])
    return newUser
  }

  function deleteUser(id){
    setUsers(prev=>prev.filter(u=>u.id === id))
  }

  function editUser(id,value){
    setUsers(prev=>prev.map(u=>u.id===id?{...u,...value}:u))
  }

  const value = {addUser, deleteUser, users}

  return(
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}

export function useUsers(){
    const context = useContext(UserContext)
    if (!context){
        throw new Error ("useUser must be used withing UserProvider")
    }
    return context
    console.log(context)

}