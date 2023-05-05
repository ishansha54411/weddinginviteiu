import React from 'react'
import CountDown from './Countdown';
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store'

const Jumbotron = ({ title, unmarrieddesc,marrieddesc, date, bgImage }) => {
	const auth = useSelector((state) => {
		return state.Auth
	});

	const dispatch = useDispatch();
	return (<><nav className="fh5co-nav" role="navigation">
		<div className="container">
			<div className="row">
				<div className="col-xs-2">
					<div id="fh5co-logo"><a href="index.html">Wedding<strong>.</strong></a></div>
				</div>
				<div className="col-xs-10 text-right menu-1">
					<ul>
						{
							(auth.isSignedIn && new Date(auth.expirationTime) > new Date()) ? <>
								<li >
									<NavLink
										className="navbar-item"
										activeClassName=""
										to="/register"
										exact
									>
										register
									</NavLink>
								</li>
								<li>
									<span className='navbar-item'>
										<a href='#'>Welcome: {auth.userId}</a>
									</span>
								</li>
								<li>
									<a className='navbar-item' onClick={() => {
										dispatch(logout())
									}}>
										Logout
									</a>
								</li>
								</> : <li>
								<NavLink className="navbar-item" activeClassName="is-active" to="/login" exact>
									login
								</NavLink></li>
						}



					</ul>
				</div>
			</div>

		</div>
	</nav>

		<header id="fh5co-header" className="fh5co-cover" role="banner" style={{
			backgroundImage: `url(${bgImage})`
		}}>
			<div className="overlay"></div>
			<div className="container">
				<div className="row">
					<div className="col-md-8 col-md-offset-2 text-center">
						<div className="display-t">
							<div className="display-tc animate-box" data-animate-effect="fadeIn">
								<h1>{title}</h1>
								{(date>new Date()?<><h2>{unmarrieddesc}</h2>
								<CountDown date={date} /></>:<h2>{marrieddesc}</h2>)}
								{/* <h2>{desc}</h2>
								<CountDown date={date} /> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header></>);
}

export default Jumbotron;