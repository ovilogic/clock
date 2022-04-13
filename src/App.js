import { useEffect, useState } from 'react';
import './style/app.css'
import { BsArrowDownCircleFill, BsArrowUpCircleFill  } from 'react-icons/bs'
import { FaPlay, FaPause } from 'react-icons/fa'
import { MdReplayCircleFilled } from 'react-icons/md'



function App() {
  
  const [current, setCurrent] = useState('session')
  const [brk, setBrk] = useState(5)
  const [session, setSession] = useState(25)
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  
  let seconds
 
  const d = new Date()
  // console.log(d)
  
  d.setMinutes(d.getMinutes() + session)
  // console.log(d)
  var countDownDate = d.getTime();
  console.log('session date', countDownDate)

  // Update the count down every 1 second
  
  // useEffect(() => setInterval(function() {

  //   // Get today's date and time
  //   var now = new Date().getTime();

  //   // Find the distance between now and the count down date
  //   var distance = countDownDate - now;

  //   // Time calculations for days, hours, minutes and seconds
   
  //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   seconds = Math.floor((distance % (1000 * 60)) / 1000) + 1;
    
    
  //   console.log(minutes, ':', seconds)
  //   setMin(minutes)
  //   setSec(seconds)


  // }, 1000), []);
  


  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="panel">
        <div className='break' id='break-label'>
          <h2>break length</h2>
          
          <div className='functions'>
          <BsArrowDownCircleFill className='dArrow'
             id='break-decrement' />
          <div className='brk-session'>{brk}</div>
          <BsArrowUpCircleFill className='uArrow'
            id='break-increment'/>
          </div>
        </div>
        <div className='session' id='session-label'>
          <h2>session length</h2>
          
          <div className='functions'>
            <BsArrowDownCircleFill className='dArrow'
              id='session-decrement' />
            <div className='brk-session'>{session}</div>
            <BsArrowUpCircleFill className='uArrow'
              id='session-increment'/>
          </div>
        </div>
      </div>
      <div className="display">
        <h2>{current}</h2>
        <div className='timer'>
          <div className='current'>{min}:{sec}</div>
        </div>
      </div>
      <div className="controls">
        <FaPlay className='ctrl' />
        <FaPause className='ctrl' />
        <MdReplayCircleFilled className='ctrl' />
      </div>
      <div className="footer">
        <h5>made by 
          <a href='https://github.com/ovilogic'> ovilogic</a>
          </h5>
      </div>
    </div>
  );
}

export default App;
