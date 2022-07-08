import React from 'react'

const LibrarySong = ( {song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs, }) => {

    //select each song on library
const songSelectHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === id)
    await setCurrentSong(selectedSong[0])
   
    //new songs map over
const newSongs = songs.map((song) => {
        if (song.id === id){
            return {
                ...song,
                active: true,
            };                      //reseting each song after clicking
        } else {
            return {
                ...song, 
                active: false,
            };
        };
    });
    setSongs(newSongs);
    
    if(isPlaying) audioRef.current.play();    //play
}

        //For the library part; images, name, artist 
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
            <img alt = {song.name} src={song.cover} className = "library-image"/>
            
            <div className='song-description'>
            <h3 className='library-name'>{song.name}</h3>
            <h4 className='library-artist'>{song.artist}</h4> 
            </div>
        </div>
    )
}

export default LibrarySong