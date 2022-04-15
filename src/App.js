import { useEffect, useState, useRef } from 'react';
import './style/app.css'
import { BsArrowDownCircleFill, BsArrowUpCircleFill  } from 'react-icons/bs'
import { FaPlay, FaPause } from 'react-icons/fa'
import { MdReplayCircleFilled } from 'react-icons/md'






function App() {
  
  const [current, setCurrent] = useState('session')
  const [brk, setBrk] = useState(5)
  const [session, setSession] = useState(25)
  const [min, setMin] = useState(session)
  const [sec, setSec] = useState('00')
  const [on, setOn] = useState(0)
  const clock = useRef('')
  const [dist, setDist] = useState(0)
  const [dt, setDt] = useState()
  

  var x
  

  useEffect(() => {

    // You don't want variables outside useEffect because they will be updated with each
    // new render. Had d been defined outside, it would create a new time 0 (d) with each 
    // new render. This means that what gets passed to the on == 2 section is a new d, not
    // the old one, that the setInterval() started with. So the 

    var d = new Date()


    if (on == 1) {
      
      console.log(d)
      d.setMinutes(d.getMinutes() + session)
      console.log(d, 'minutes added')
      var countDownDate = d.getTime();

    }
    x = setInterval(() => {
   
      if (on == 1) {
        
      console.log('on = 1')
      
      
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      console.log('one: distance: ', distance)

      // Time calculations for days, hours, minutes and seconds
        
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000) + 1;
      
      // Making the seconds look pretty:
      
      seconds = String(seconds)
      if (seconds == '60') {
        seconds = '00'}
        
      if ( seconds.length == 1) {
        seconds = '0' + seconds
      }
      console.log(minutes, ':', seconds)

      // And the final product sent to the screen:
      clock.current.innerText = minutes + ':' + seconds
      setMin(minutes)
      setSec(seconds)
      setDist(distance)

      console.log('on = 1', 'countDwn exiting 1', countDownDate, 'and distance ', distance)
      }

      else if (on == 2) {
        console.log('d entering 2 ', d, 'distance is', dist)
        countDownDate = d.getTime() + dist
        
     
      }

      else if (on == 3) {
        console.log('d entering 3 ', d, 'distance is', dist)
        countDownDate = d.getTime() + dist
        
    
          console.log('on is 3', countDownDate)
          
          var now = new Date().getTime();
          console.log('third', now)
    
          // Find the distance between now and the count down date
          let distance = countDownDate - now;
    
          // Time calculations for days, hours, minutes and seconds
            
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000) + 1;
          
          // Making the seconds look pretty:
          
          seconds = String(seconds)
          if (seconds == '60') {
            seconds = '00'}
            
          if ( seconds.length == 1) {
            seconds = '0' + seconds
          }
          console.log(minutes, ':', seconds)
    
          // And the final product sent to the screen:
          clock.current.innerText = minutes + ':' + seconds
          setMin(minutes)
          setSec(seconds)
          setDist(distance)
        }

        }, 1000);
    
     

     return () => {
       
       clearInterval(x);
     }

    }, [on]); 
    
    
    


  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="panel">
        <div className='break' id='break-label'>
          <h2>break length</h2>
          
          <div className='functions'>
          <BsArrowDownCircleFill className='dArrow' onClick={() => setBrk(brk - 1)}
             id='break-decrement' />
          <div className='brk-session' id='break-length'>
            {brk}
          </div>
          <BsArrowUpCircleFill className='uArrow' onClick={() => setBrk(brk + 1)}
            id='break-increment'/>
          </div>
        </div>
        <div className='session' id='session-label'>
          <h2>session length</h2>
          
          <div className='functions'>
            <BsArrowDownCircleFill className='dArrow' onClick={() => {
              setSession(session - 1);
              clock.current.innerText = session - 1 + ':00'
            }}
              id='session-decrement' />
            <div className='brk-session'
              id='session-length'>{session}</div>
            <BsArrowUpCircleFill className='uArrow' onClick={() => {
              setSession(session + 1);
              clock.current.innerText = session + 1 + ':00'
            }}
              id='session-increment'/>
          </div>
        </div>
      </div>
      <div className="display">
        <h2 id='timer-label'>{current}</h2>
        <div className='timer'>
          <div className='current'
            id='time-left' ref={clock}>{min}:{sec}</div>
        </div>
      </div>
      <div className="controls">
        <FaPlay className='ctrl'
          id='start_stop' onClick={() => {
          
          if (on == 0) {
            setOn(on + 1);
          }
          else if (on == 1) {
            setOn(on + 1)
          }
          else if (on == 2) {
            setOn(3)
          }
          else if (on == 3) {
            setOn(2)
          }
          
          }}/>
        <FaPause className='ctrl' 
          onClick={() => {
          if (on == 1) {
              setOn(on + 1)
            }
            else if (on == 2) {
              setOn(3)
            }
            else if (on == 3) {
              setOn(2)
            }
            }} />
        <MdReplayCircleFilled className='ctrl'
          id='reset' onClick={() => {
              setSession(25);
              setBrk(5);
              clock.current.innerText = 25 + ':00';
              setDist(0);
              setOn(0);
              clearInterval(x);
            }}/>
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
