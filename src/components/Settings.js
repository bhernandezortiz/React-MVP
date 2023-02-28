import React from "react";
import ReactSlider from 'react-slider';
import SettingsContext from "./SettingsContext";
import './slider.css'
import { useContext } from "react";
import BackButton from "./BackButton";

const Settings = () => {
    const settingsInfo = useContext(SettingsContext)
    return (
        <div className='settingsDiv' style={{textAlign:'left'}}>
            <label> Task : {settingsInfo.workMinutes}:00</label>
            <ReactSlider
            className={'slider'}
            thumbClassName={'thumb'}
            value={settingsInfo.workMinutes}
            onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
            min={1}
            max={120}
            />
            <label> Break : {settingsInfo.breakMinutes}:00</label>
            <ReactSlider
            className={'slider'}
            thumbClassName={'thumb'}
            value={settingsInfo.breakMinutes}
            onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
            min={1}
            max={120}
            />
            <div style={{textAlign:'center', marginTop:'20px'}}>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
            </div>
        </div>

    )
}

export default Settings;