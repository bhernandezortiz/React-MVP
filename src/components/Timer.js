// import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import StartButton from './StartButton';
import PauseButton from './PauseButton';
import SettingButton from './SettingButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';

const red = '#323435';
const green = '#78F051';

function Timer() {
    const settingsInfo = useContext(SettingsContext);

    const [isPaused,setIsPaused] = useState(true)
    const [mode, setMode] = useState('work')
    const [secondsLeft, setSecondsLeft] = useState(0)

    const secondsLeftRef = useRef(secondsLeft)
    const isPausedRef = useRef(isPaused)
    const modeRef = useRef(mode)
    
    const tick = () => {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current)
    }

    useEffect(() => {

        function switchMode() {
          const nextMode = modeRef.current === 'work' ? 'break' : 'work';
          const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
    
          setMode(nextMode);
          modeRef.current = nextMode;
    
          setSecondsLeft(nextSeconds);
          secondsLeftRef.current = nextSeconds;
        }
    
        secondsLeftRef.current = settingsInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);
    
        const interval = setInterval(() => {
          if (isPausedRef.current) {
            return;
          }
          if (secondsLeftRef.current === 0) {
            return switchMode();
          }
    
          tick();
        },1000);
    
        return () => clearInterval(interval);
      }, [settingsInfo]);
//   const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     let interval = null;
//     if (isActive && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft(timeLeft - 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isActive, timeLeft]);

//   const toggleTimer = () => {
//     setIsActive(!isActive);
//   };

//   const resetTimer = () => {
//     setIsActive(false);
//     setTimeLeft(25 * 60);
//   };

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;
const totalSeconds = mode === 'work' 
? settingsInfo.workMinutes * 60
: settingsInfo.breakMinutes * 60

const percentage = Math.round(secondsLeft/totalSeconds * 100)

const minutes = Math.floor(secondsLeft / 60);
let seconds = secondsLeft % 60
if(seconds < 10) seconds = '0' + seconds
 
return (
    <div>
        <div className='Clock'>
        <CircularProgressbar
            value={percentage}
            text={minutes + ':' + seconds}
            styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: 'butt',
            textSize: '16px',
            pathTransitionDuration: 0.5,
            pathColor: green,
            textColor: '#FEFFFE',
            trailColor: red,
            backgroundColor: '#3e98c7',
            })} />
        </div>
    <div className='container'>
        <div>
        {isPaused
          ? <StartButton className='startColor' onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
          : <PauseButton className='pauseColor' onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
        </div>
        <div>
         <SettingButton onClick={() => settingsInfo.setShowSettings(true)}/>
        </div>
    </div>
      {/* <h1>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button> */}
    </div>
  );
  
}

export default Timer;
