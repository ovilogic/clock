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
  const [sec, setSec] = useState('60')
  const [on, setOn] = useState(0)
  // on: if you hit play or pause, it changes. Also the 3rd useEffect
  // gets going, which sets off a new function. 
  
  const [dist, setDist] = useState(0)
  const [red, setRed] = useState({})

  const clock = useRef()
  const tLabel = useRef()


  let parsed

  const prettyMinutes = () => {
    parsed = clock.current.innerText.split(':')

    if (parsed[0].length < 2 ) {
      parsed[0] = '0' + parsed[0]

      clock.current.innerText = parsed.join(':')
    }
  }
  


  var audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
  


  // 1. Only when the min changes (in setInterval by setMin).
  // Prepare for break at t-1 minute:
  useEffect(() => {
    console.log('1st useEffect rendered')
    
    parsed = clock.current.innerText.split(':')


    // Prepare for a break:
 
    if ( Number(parsed[0]) == 0 ) {
      setRed({ color: 'red' })
      
    }
    else if ( Number(parsed[0]) != 0) {setRed({})}
    
    if ( Number(parsed[0]) == -1 && Number(parsed[1]) == 0
    && tLabel.current.innerText == 'session' ) {
      // We go to break mode:
      console.log('We go to break mode:')
      setCurrent('break');
      audio.play()
      parsed[0] = brk
    }
    else if (Number(parsed[0]) == -1 && Number(parsed[1]) == 0
    && tLabel.current.innerText == 'break' ) {
      console.log('We go to sesssion mode:')
      setCurrent('session');
      audio.play()
      parsed[0] = session
    }

    // Rewind the clock:
    
    clock.current.innerText = parsed.join(':');
    prettyMinutes()
  }, [min])


  
  // 2.Only when the session counter changes (up-down arrows).
  // Make the minutes pretty:
  useEffect(() => {
    console.log('2nd useEffect rendered')
    prettyMinutes()
    console.log('2nd useEffect: makes minutes pretty:', clock.current.innerText)
    
  }, [session])
 

  console.log(on)

  var x
 
  useEffect(() => {
    console.log('3rd useEffect rendered')

    // You don't want variables outside useEffect because they will be updated with each
    // new render. Had d been defined outside, it would create a new time 0 (d) with each 
    // new render. This means that what gets passed to the on == 2 section is a new d, not
    // the old one, that the setInterval() started with.
    // So the interval function that keeps running after on == 1 does not have a brand new
    // d created for it, but uses the one declared the first time useEffect ran (on turned
    // from 0 to 1). 

    var d = new Date()

    var countDownDate

    x = setInterval(() => {

      prettyMinutes()

      if (tLabel.current.innerText == 'break' &&
          clock.current.innerText == '0' + brk + ':00' ) {
          
          d.setMinutes(d.getMinutes() + brk);
          countDownDate = d.getTime()
        }
      
      if (tLabel.current.innerText == 'session' &&
        clock.current.innerText == '0' + session + ':00' ) {
      
        d.setMinutes(d.getMinutes() + session);
        countDownDate = d.getTime()
      }

      console.log('setInterval function started')
      if (on == 0) clearInterval(x)
   
      if (on == 1) {
        

        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
          
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000) + 1;
        
        // Making the seconds and minutes look pretty:
        
        seconds = String(seconds)
        minutes = String(minutes)
        

        if (seconds == '60') {
          seconds = '00'}
          
        if ( seconds.length == 1) {
          seconds = '0' + seconds
        }

        if ( minutes.length == 1) {
          minutes = '0' + minutes
        }
    
        // And the final product sent to the screen:
        clock.current.innerText = minutes + ':' + seconds

        setMin(minutes)
        setSec(seconds)
        setDist(distance)

      }

      else if (on == 2) {
        
      }

      else if (on == 3) {

        countDownDate = d.getTime() + dist

          var now = new Date().getTime();
        
    
          // Find the distance between now and the count down date
          let distance = countDownDate - now;
    
          // Time calculations for days, hours, minutes and seconds
            
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000) + 1;
          
          // Making the seconds look pretty:
          
          seconds = String(seconds)
          minutes = String(minutes)

          if (seconds == '60') {
            seconds = '00'}
            
          if ( seconds.length == 1) {
            seconds = '0' + seconds
          }

          
          if ( minutes.length == 1) {
            minutes = '0' + minutes
          }


    
          // And the final product sent to the screen:
          clock.current.innerText = minutes + ':' + seconds


          setMin(minutes)
          setSec(seconds)
          setDist(distance)
        }
        console.log('setInterval function at the end')
        }, 1000);
    
     

     return () => {
       console.log('clearing setInterval')
       clearInterval(x);
       console.log('after setInterval has been cleared')
     }
     console.log('end of 3rd useEffect')
    }, [on]); 
    
    
    


  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="panel">
        <div className='break' id='break-label'>
          <h2>break length</h2>
          
          <div className='functions'>
          <BsArrowDownCircleFill className='dArrow'
           onClick={() => {
             if (on > 0) {  }
             else {
               if (brk > 1) {
                 setBrk(brk - 1)}}}}
             id='break-decrement' />
          <div className='brk-session' id='break-length'>
            {brk}
          </div>
          <BsArrowUpCircleFill className='uArrow'
           onClick={() => {
             if (on > 0) {  }
             else setBrk(brk + 1)}}
            id='break-increment'/>
          </div>
        </div>
        <div className='session' id='session-label'>
          <h2>session length</h2>
          
          <div className='functions'>
            <BsArrowDownCircleFill className='dArrow'
             onClick={() => {
              if (on > 0) {  }
              else {
                if (session > 1) {
              setSession(session - 1);
              clock.current.innerText = session - 1 + ':00'}}
            }}
              id='session-decrement' />
            <div className='brk-session'
              id='session-length'>{session}</div>
            <BsArrowUpCircleFill className='uArrow'
             onClick={() => {
               if (on > 0) {  }
               else {
              setSession(session + 1);
              clock.current.innerText = session + 1 + ':00'}
            }}
              id='session-increment'/>
          </div>
        </div>
      </div>
    <div className="display" >
        <h1 id='timer-label'
          ref={tLabel} style={red}>{current}</h1>
        <div className='timer'>
          <div className='current'
            id='time-left'
            ref={clock}
            style={red}>
              {min}:{sec}</div>
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
          
              setDist(0);
              setOn(0);
              clearInterval(x);
              setMin(25);
              clock.current.innerText = '25:00'
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
