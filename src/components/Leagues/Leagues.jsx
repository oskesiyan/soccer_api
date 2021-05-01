import { useState, useEffect } from 'react';
import React from 'react';
import s from './Leagues.module.css';
import { Link } from 'react-router-dom';
import { getData } from './../../utils/index';

const Leagues = () => {
  const [leagueData, setLeagueData] = useState([]);
  const [leagueYears,setLeagueYears] = useState([]);
  const [selectValue, setSelectValue] = useState(['Сезон']);

  const handleChange = (e) => {
    setSelectValue(e.target.value)
  }

  const getYears = () => {
  const years = leagueData.map(el => new Date(el.currentSeason?.startDate).getFullYear())
  const uniqueYears = new Set(years)
  setLeagueYears(['Сезон', ...uniqueYears])//.sort((a, b) => b - a)
  }  

  useEffect(async () => {
    const result = await getData("http://api.football-data.org/v2/competitions?plan=TIER_ONE");
    setLeagueData(result.data?.competitions)
      
  }, [])

  useEffect(() => {
    if (leagueData){
      getYears()
    }    
  }, [leagueData])
    
  return (    
      <div className = {s.appContent}>
        <h1>Лиги</h1>
        <span>
          <select id = 'select' value={selectValue} onChange={handleChange} className = {s.select}>          
          {leagueYears.map(el => {return ( <option>{el}</option>)})}          
          </select>
        </span>
        <div className = {s.textcolsRow} >        
          {leagueData && (
          leagueData.filter(item => {
              return  `${selectValue}` === 'Сезон'? item: item.currentSeason?.startDate.substr(0, 4) === `${selectValue}`}).map(el => {
                return (
                  <Link to = {`/calendarLeague/${el.id}` } className = {s.textLink} >
                    <div key={el.id} className = {s.textcolsItem}>
                      <img className = {s.displayed} src = {el.emblemUrl!==null?el.emblemUrl:"/footballCup.png" } width="80" height="80"></img>
                      <div>{el.name}</div>
                      <div> { new Date(el.currentSeason?.startDate).getFullYear()}</div>
                    </div>
                  </Link>
                )})
                )
          }              
        </div>
      </div>
    );
}


export default Leagues