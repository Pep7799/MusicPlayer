import React from "react";
import LibrarySong from "./LibrarySong";

//mapping over each song in the library
export default function Library ( {songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus} ) {
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song)=>(
                    <LibrarySong 
                    key={song.id}
                    songs = {songs}
                    setCurrentSong = {setCurrentSong} 
                    song={song}
                    id = {song.id}
                    audioRef = {audioRef}
                    isPlaying = {isPlaying}
                    setSongs = {setSongs}
                    />
                ))}

            </div>
        </div>
    )
}