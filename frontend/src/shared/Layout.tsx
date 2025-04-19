import { Outlet } from "react-router"
import Navbar from "./Navbar";

export default function Layout() {

    const name = "sigma";
    return <Navbar name = {name}/>;
}