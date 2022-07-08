import React from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import './styles/app.scss';
import data from './allsongs'
import Library from "./components/Library";
import Navbar from "./components/Navbar";



function App() {

  function timeUpdateHandler (e) {                                           //time-curent&duration
    const current = e.target.currentTime
    const duration = e.target.duration
    const timePercent =Math.round((Math.round(current) / Math.round(duration)) * 100)
    setSongTime ({ 
                ...songTime, 
                 currentTime: current,
                 duration,
                 timePercent,
             })

 };
  
  const audioRef = React.useRef(null);

  
//usestates
  const [songs, setSongs] = React.useState(data());
  const [currentSong, setCurrentSong] = React.useState(songs[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [libraryStatus, setLibraryStatus] = React.useState(false);
  const [songTime, setSongTime]  = React.useState(
    {
        currentTime: 0,
        duration: 0,
        timePercent: 0
    }
)

//for song continuation ***issues
const endSong = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);  
  
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      if(isPlaying) audioRef.current.play();
    }
 
      //Returning everything on the screen
  return (
    <div className= {`App ${libraryStatus ? "active-lib" : ""}`}>
    <Navbar libraryStatus = {libraryStatus} setLibraryStatus = {setLibraryStatus}/>
     <Song currentSong = {currentSong} isPlaying = {isPlaying} />

     <Player 
     audioRef={audioRef} 
     currentSong = {currentSong} 
     isPlaying= {isPlaying} 
     setIsPlaying = {setIsPlaying}
     songTime = {songTime}
     setSongTime = {setSongTime} 
     songs = {songs}
     setCurrentSong = {setCurrentSong}
     setSongs = {setSongs}
     />

     <Library 
     setSongs={setSongs}
     audioRef={audioRef}
     songs = {songs} 
     setCurrentSong = {setCurrentSong}
     isPlaying = {isPlaying} 
     libraryStatus = {libraryStatus}
     />

     <audio 
            onLoadedMetadata={timeUpdateHandler} 
            onTimeUpdate={timeUpdateHandler} 
            ref={audioRef} 
            onEnded = {endSong}
            src={currentSong.audio}
            />
            

    </div>
  );
}


export default App;
