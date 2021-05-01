import React from 'react';
import { useState, useEffect } from 'react';
import s from './CalendarLeague.module.css';
import { useHistory } from 'react-router';
import { getData } from './../../utils/index';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarLeague = () => {
  const [leagueCalendar, setLeagueCalendar] = useState([]);
  const [fromDate, setFromDate] = useState('');//new Date()new Date('2020-01-01T08:00:00.000Z')
  const [toDate, setToDate] = useState('');
  const history = useHistory();

  useEffect(async ()  => {    
    const currentLeague = history.location.pathname.split('calendarLeague/')[1];
    const result = await getData(`http://api.football-data.org/v2/competitions/${currentLeague}/matches`);
    setLeagueCalendar(result.data?.matches);
  }, [history])
  
  return (
    <div > 
      <h1>Расписание лиги</h1>
      <div className = {s.dPicker}>
        <DatePicker
          selected={fromDate} onChange={date => setFromDate(date)} 
          dateFormat="yyyy/MM/dd" 
          isClearable
          placeholderText="с" 
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />        
        <DatePicker
          selected={toDate} onChange={date => setToDate(date)} 
          dateFormat="yyyy/MM/dd"
          isClearable
          placeholderText="по" 
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />  
      </div>  
      <table border="1" className = {s.table_blur}>
        <tr>
          <th>Дата, время</th>
          <th>Команды</th>
          <th>Счет</th>
        </tr>
        {leagueCalendar && (
        leagueCalendar.filter(el => {return ( (fromDate ===null || toDate ==='' || fromDate ==='' || toDate ===null)? el:((new Date(el.utcDate)) >= fromDate) && ((new Date(el.utcDate)) <= toDate)
          )}).map(el => {
          return (
            <tr><td>{el.utcDate.split('T')[0]} {el.utcDate.split('T')[1].split(':00Z')[0]}</td><td> {el.homeTeam?.name} - {el.awayTeam?.name}</td><td>{el.status === 'SCHEDULED' ?'-:-':`${el.score?.fullTime.homeTeam} : ${el.score?.fullTime.awayTeam}`}</td></tr>
            )})
            )
          }
      </table>         
    </div>)  
}


export default CalendarLeague