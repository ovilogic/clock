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
  
  
 
  const d = new Date()

  
  d.setMinutes(d.getMinutes() + session)
  // console.log(d)
  var countDownDate = d.getTime();


  // Update the count down every 1 second
  
  var x
  

  useEffect(() => {
    x = setInterval(() => {
       
      if (on == 1) {
      
      
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

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

      }

      else if (on == 2) {
        const mid = new Date()
        // console.log('one', mid)
        mid.setMinutes(mid.getMinutes() + Number(min))
        // console.log('two', mid)

        mid.setSeconds(mid.getSeconds() + Number(sec))
        // console.log('final', mid)
        
        countDownDate = mid.getTime()
        // console.log('mid milisecs', countDownDate)
      }

      else if (on == 3) {
    
          console.log('on is 3', countDownDate)
          
          var now = new Date().getTime();
    
          // Find the distance between now and the count down date
          var distance = countDownDate - now;
    
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
          <div className='brk-session'>
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
            <div className='brk-session'>{session}</div>
            <BsArrowUpCircleFill className='uArrow' onClick={() => {
              setSession(session + 1);
              clock.current.innerText = session + 1 + ':00'
            }}
              id='session-increment'/>
          </div>
        </div>
      </div>
      <div className="display">
        <h2>{current}</h2>
        <div className='timer'>
          <div className='current' ref={clock}>{min}:{sec}</div>
        </div>
      </div>
      <div className="controls">
        <FaPlay className='ctrl' onClick={() => {
          if (on == 0) {
            setOn(on + 1);
          }
          else if (on == 1) {
            setOn(on + 1)
          }
          else if (on == 2) {
            setOn(3)
          }
          
          }}/>
        <FaPause className='ctrl' />
        <MdReplayCircleFilled className='ctrl' onClick={() => {
              setSession(25);
              clock.current.innerText = 25 + ':00';
              clearInterval(x)
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
