import React from 'react'

const TimeLine=({title,message,desc,timeline})=>{
    return (<div id="fh5co-couple-story">
		<div className="container">
			<div className="row">
				<div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
					<span>{message}</span>
					<h2>{title}</h2>
					<p>{desc}</p>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12 col-md-offset-0">
					<ul className="timeline animate-box">
                        {timeline.map((value,index)=>{
                            // console.log(value.image)
                            return (<li className={`animate-box ${index%2===0?'':'timeline-inverted'}`} key={index}>
                                <div className="timeline-badge" style={{backgroundImage:`url(${value.image})`}}></div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h3 className="timeline-title">{value.title}</h3>
                                        <span className="date">{value.date}</span>
                                    </div>
                                    <div className="timeline-body">
                                        <p>{value.desc}</p>
                                    </div>
                                </div>
                            </li>);
                        })}
			    	</ul>
				</div>
			</div>
		</div>
	</div>
    )
}

export default TimeLine;