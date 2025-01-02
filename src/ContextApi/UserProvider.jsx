import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserContext from "./UserContext";
import Swal from "sweetalert2";

export default function UserProvider({ children }) {
    const [signUser, setSignUser] = useState("")
    const [addedUsers, setAddedUsers] = useState([])
    const [usersById, setUsersById] = useState([])
    const [userCounting, setUserCounting] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const allUsers = async () => {
        const res = await fetch(`${apiUrl}/api/user/getUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }) 
        const data = await res.json()
        setAddedUsers(data);
    }

    const userById = async (id) => {
        const res = await fetch(`${apiUrl}/api/user/getUserById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setUsersById(data)
    }

    const deleteUserById = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "User has been deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        });
        if(isConfirmed){
            const res = await fetch(`${apiUrl}/api/user/delUser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.ok) {
                allUsers()
            }
        }
    }

    const countUser = async () => {
        const res = await fetch(`${apiUrl}/api/user/userCount`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setUserCounting(data)
    }

    useEffect(() => {
        allUsers()
        countUser()
        const getSignUser = JSON.parse(sessionStorage.getItem("userData") || "{}")
        if (getSignUser) {
            setSignUser(getSignUser)
        }
    }, [])

    return (
        <UserContext.Provider value={{ addedUsers, usersById, allUsers, userById, setUsersById, deleteUserById,setSignUser, signUser, userCounting }}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};