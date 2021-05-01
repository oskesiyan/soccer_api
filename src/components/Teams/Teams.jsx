import s from  './Teams.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { getData } from './../../utils/index';
import { Link } from 'react-router-dom';

const Teams = () => {
  const [teamData, setTeamData] = useState([]);
  const [teamYears, setTeamYears] = useState([]);
  const [selectValue, setSelectValue] = useState(['Год основания']);

  const handleChange = (e) => {
    setSelectValue(e.target.value)
    console.log(e.target.value)
  }

  const getYears = () => {
    const years = teamData.filter(el => el.founded!==null).map(el => `${el.founded}`)
    const uniqueYears = new Set(years)
  setTeamYears(['Год основания', ...uniqueYears].sort((a, b) => b - a))//.sort((a, b) => b - a)
  }  

  useEffect(async () => {
      const result = await getData("http://api.football-data.org/v2/teams");
      setTeamData(result.data?.teams)
  }, [])

  useEffect(() => {
    if (teamData){
      getYears()
    }
  }, [teamData])

  return (
    <div className = {s.appContent}>
      <h1>Команды</h1>
      <span>
        <select id = 'select' value={selectValue} onChange={handleChange} className = {s.select}>          
          {teamYears.map(el => {return ( <option>{el}</option>)})}          
        </select>
      </span>
      <div className = {s.textcolsRow}>
        {teamData && (
          teamData.filter(el =>{ return `${selectValue}` === 'Год основания'? el: el.founded == `${selectValue}`}).map(el => {
              return (
                <Link to = {`/calendarTeam/${el.id}`} className = {s.textLink} >
                  <div key={el.id} className = {s.textcolsItem}>
                    <img src = {el.crestUrl} width="80" height="80"></img>
                    <div>{el.name}<div>{el.founded}</div></div>
                  </div>
                </Link>
              )})//
            )}
        </div>          
    </div>
  )  
}


export default Teams