import { useContext } from "react";
import NavBaar from "./Navbar";
import UserContext from "../ContextApi/UserContext";
import UserNav from "./UserNav";

export default function JobPortalNavbar() {
    const { signUser } = useContext(UserContext)
    return (
        <>
            {signUser && signUser.name ? (
                <UserNav />
            ) : (
                <NavBaar />
            )}
        </>
    )
}
