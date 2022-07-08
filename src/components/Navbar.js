import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faMusic } from "@fortawesome/free-solid-svg-icons";

//Navbar side
export default function Navbar( {setLibraryStatus, libraryStatus}) {
    return (
        <nav>
            <h1>Bed Time Music</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    )
} 

