import React from 'react'
//display song (big screen)
export default function Song({currentSong}) {
    return (
        <div className='song-container'>
            <img alt = {currentSong.name} src={currentSong.cover} className = "song-image"/>
            <h2 className='song-name'>{currentSong.name}</h2>
            <h3 className='song-artist'>{currentSong.artist}</h3> 
        </div>
    )
}