import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle,                          
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";                   //icons        

    //This is for the play part, time control, back and forward 
const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songTime,
  setSongTime,
  songs,
  setCurrentSong,
  setSongs,
}) => {                                                         //passing needed ones here


  const libHandler = (backforth) => {                   
    const newSongs = songs.map((song) => {          //skip back and forward function handler
      if (song.id === backforth.id) {
        return { ...song, active: true, };
      } 
      else {
        return { ...song, active: false, };
      }
    }
  
    
    );
    setSongs(newSongs);
  }
    
  const playSongHandler = () => {                     //play songs icon function  
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {                                                 //get duration time 
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {                                                //when a click is done on the input(the function)
    setSongTime({ ...songTime, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  const SkipTrackHandler = async (direction) => {                             //function for back and forward
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      libHandler(songs[(currentIndex + 1) % songs.length])
     
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length ===  -1){
       await setCurrentSong(songs[songs.length - 1]);
       libHandler(songs[songs.length - 1])
       if(isPlaying) audioRef.current.play();
       return;
      }
      await setCurrentSong(songs[(currentIndex - 1 ) % songs.length])
      libHandler(songs[(currentIndex - 1 ) % songs.length])
    }
       if(isPlaying) audioRef.current.play();

     
    }
   
  const timeCheck = {                                     //time styles
    transform: `translateX(${songTime.timePercent}%)`,
  };

    //each display on screen
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songTime.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="time"
        >
          <input
            min={0}
            max={songTime.duration || 0}
            value={songTime.currentTime}
            type="range"
            name=""
            id=""
            onChange={dragHandler}
          />
          <div style={timeCheck} className="time-part"></div>
        </div>
        <p>{songTime.duration ? getTime(songTime.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => SkipTrackHandler("skip-back")}
          className="back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPauseCircle : faPlayCircle}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => SkipTrackHandler("skip-forward")}
          className="next"
          icon={faAngleRight}
          size="2x"
        />
      </div>
    </div>
  );
};
export default Player;