import React from 'react'
import Countdown from 'react-countdown';

const CountDown=({date})=>{
    const getRemainingMonths=(date)=>{
        let months=0;
        let newDate=new Date();
        newDate.setMonth(newDate.getMonth()+1);
        while(newDate<date)
        {
            months++;
            newDate.setMonth(newDate.getMonth()+1)
        } 
        // console.log(newDate.getMonth());
        return months;
    }
    const getRemainingDays=()=>{
        // let newDate=new Date();
        let newDate=new Date();
        newDate.setMonth(newDate.getMonth()+1);
        while(newDate<date)
        {
            newDate.setMonth(newDate.getMonth()+1)
        }
        newDate.setMonth(newDate.getMonth()-1)
        return Math.ceil(Math.abs(newDate-date)/ (1000 * 60 * 60 * 24))-1;

    }
    const Completionist = () => <span>Already Married!</span>;

    // Renderer callback with condition
    const renderer = ({ days,hours, minutes, seconds, completed }) => {
        
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        let remainingMonths=getRemainingMonths(date);
        return (
            <div className="simply-countdown simply-countdown-one">
                {remainingMonths>0?(<div className="simply-section simply-days-section">
                    <div>
                        <span className="simply-amount">{remainingMonths}</span>
                        <span className="simply-word">months</span>
                    </div>
                </div>):<></>}
                {/* <div className="simply-section simply-days-section">
                    <div>
                        <span className="simply-amount">{remainingMonths}</span>
                        <span className="simply-word">months</span>
                    </div>
                </div> */}
                <div className="simply-section simply-days-section">
                    <div>
                        <span className="simply-amount">{getRemainingDays(date)}</span>
                        <span className="simply-word">days</span>
                    </div>
                </div>
                <div className="simply-section simply-hours-section">
                    <div>
                        <span className="simply-amount">{hours}</span>
                        <span className="simply-word">hour</span>
                    </div>
                </div>
                <div className="simply-section simply-minutes-section">
                    <div>
                        <span className="simply-amount">{minutes}</span>
                        <span className="simply-word">minutes</span>
                    </div>
                </div>
                {remainingMonths>0?<></>:<div className="simply-section simply-seconds-section">
                    <div>
                        <span className="simply-amount">{seconds}</span>
                        <span className="simply-word">seconds</span>
                    </div>
                </div>}
                {/* <div className="simply-section simply-seconds-section">
                    <div>
                        <span className="simply-amount">{seconds}</span>
                        <span className="simply-word">seconds</span>
                    </div>
                </div> */}
            </div>);
      }
    };
    return <Countdown
    date={date}
    renderer={renderer}
  />
}

export default CountDown;