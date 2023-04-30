import React, { useEffect, useState } from "react";
import portalAPI from '../../api/index'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery'
import { toast } from "react-toastify";
import { CommonFunctions } from "../../methods";

const Invite = ({ bgImage }) => {
    const [invites, setInvites] = useState([])
    const [selectedInvites, setSelectedInvites] = useState([])
    const [InviteURL, setInviteURL] = useState('');
    const auth = useSelector((state) => {
        return state.Auth
    });
    const GenerateLink = async () => {
        if (selectedInvites != '') {
            const response = await portalAPI.post('invites/generate-invite',
                {
                    inviteURL: window.location.origin + '/weddinginviteiu/#?event=',
                    selectedInvites: selectedInvites.join('|')
                });
            setInviteURL(response.data.data)
        }
        else {
            CommonFunctions.Message(0, "please select an invite to continue.")
        }
    }
    useEffect(() => {
        var GetInvites=(async () => {
            let response;
            const [hash, query] = window.location.href.split('#')[1].split('?')
            const params = Object.fromEntries(new URLSearchParams(query))
            if (auth.isSignedIn && new Date(auth.expirationTime) > new Date() && params.event == null) {
                response = await portalAPI.get(`invites/get-all-invites`)
            }
            else if (params.event != null) {
                response = await portalAPI.post(`invites/get-invites`, {
                    key: params.event
                })
            }
            if (response != null) {
                if (response.data.statusCode == 1) {
                    setInvites(response.data.data)
                }
                else {
                    CommonFunctions.Message(response.data.statusCode, response.data.message)
                }
            }

        })
        GetInvites()
        // alert("hi")

    })
    console.log(selectedInvites)
    if (invites.length > 0) {
        return (<div id="fh5co-event" class="fh5co-bg" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'right' }}>
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box fadeInUp animated-fast">
                        <span>Our Special Events</span>
                        <h2>Wedding Events</h2>
                        {(auth.isSignedIn && new Date(auth.expirationTime) > new Date()) ? <><span>
                            <a onClick={GenerateLink}>Generate A Invite</a></span>
                            <div class="row" style={{ color: 'whitesmoke' }}>
                                {InviteURL}
                            </div></> : <></>}

                    </div>
                </div>

                <div class="row">
                    <div class="display-t">
                        <div class="display-tc">
                            <div class="col-md-10 col-md-offset-1 invite-container" style={{ display: '-webkit-inline-box', overflow: 'auto' }}>
                                {
                                    invites.map((invite) => {
                                        return (<div class="col-md-6 col-sm-6 text-center">
                                            <div class="event-wrap animate-box fadeInUp animated-fast">
                                                <h3>
                                                    {
                                                        (auth.isSignedIn && new Date(auth.expirationTime) > new Date()) ?
                                                            <><input type="checkbox" onChange={function (ele) {
                                                                if (ele.target.checked) {
                                                                    setSelectedInvites(oldArray => [...oldArray, invite.id]);

                                                                }
                                                                else {
                                                                    setSelectedInvites(selectedInvites.filter(e => e != invite.id))
                                                                }
                                                            }} /></> : <></>
                                                    }
                                                    {invite.title}
                                                </h3>

                                                <div class="event-col" onClick={() => {
                                                    var url = "https://maps.google.com/?q=" + invite.latitude + "," + invite.longitude;
                                                    window.open(url);
                                                }}>
                                                    <i class="icon-location"></i>
                                                    <span>{invite.location}</span>
                                                    <span>{invite.address}</span>
                                                </div>
                                                <div class="event-col">
                                                    <i class="icon-calendar"></i>
                                                    {invite.dateTime.split('|').map((schedule) => {
                                                        return (<span>{schedule}</span>);
                                                    })}
                                                </div>

                                                <p style={{ display: 'inline-block' }}>{invite.messageTitle}</p>
                                                <p>{invite.messageDesc}</p>
                                            </div>
                                        </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
    else {
        return <></>;
    }

}

export default Invite;