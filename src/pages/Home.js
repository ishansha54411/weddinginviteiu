import React, { useEffect, useState } from "react";
import Footer from "../components/sub-components/Footer";
import GreetingCard from "../components/sub-components/GreetingCard";
import Jumbotron from "../components/sub-components/Jumbotron";
import TimeLine from "../components/sub-components/Timeline";
import FirstMeet from '../images/J51A2354.JPG'
import FirstDate from '../images/FirstDate.jpeg'
import Engagement from '../images/BG-Img.jpeg'
import SecondDate from '../images/3B1A82E4-1C9D-461D-94A1-B1BC1505CB42.jpeg'
import MainBackgroundImage from '../images/BG-Img.jpeg'
import GroomImage from '../images/groom_new.JPG'
import BrideImage from '../images/J51A3005.JPG'
import ThirdDate from '../images/ThirdDate.jpeg'
import PreWedding from '../images/DSC06203.JPEG'
import FindingApartment from '../images/IMG_5481.jpg'
import { useSelector } from 'react-redux'
import Invite from "../components/sub-components/Invite";
import InviteBG from '../images/DSC05128.JPG'
import portalAPI from '../api/index'
import { CommonFunctions } from "../methods";


const Home=()=>{
    const auth=useSelector((state)=>{
        return state.Auth
    });

    const [invites, setInvites] = useState([])

    useEffect(() => {
        var GetInvites=(async () => {
            let response;
            if(window.location.href.split('#')[1]!=null)
            {
                const [hash, query] = window.location.href.split('#')[1].split('?')
                const params = Object.fromEntries(new URLSearchParams(query))
                if (auth.isSignedIn && new Date(auth.expirationTime) > new Date()) {
                    response = await portalAPI().get(`invites/get-all-invites`)
                }
                else{
                    response = await portalAPI().post(`invites/get-invites`, {
                        key: params.event
                    })
                }
            }
            else
            {
                if (auth.isSignedIn && new Date(auth.expirationTime) > new Date()) {
                    response = await portalAPI().get(`invites/get-all-invites`)
                }
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

    },[])
    return <>
        <Jumbotron 
            title="Ishan & Urvashi" 
            pendingmessage="We Are Getting Married!"
            ongoingmessage="We are getting Married Today!"
            completionmessage="Happyly Married on 11 May, 2023" 
            date={new Date("2023-05-11").setHours(0,0,0,0)}
            bgImage={MainBackgroundImage}/>
        <GreetingCard 
            heading="Greetings!!" 
            heading2="11 May, 2023 Una, Himachal Pradesh" 
            msg="We would love for you all to join us on this special day!"
            bride={{Name:'Urvashi Vashisht',Message:"The very first time I met you, I knew that we were gonna have something special, and that special something will be timeless.",Image:BrideImage}}
            groom={{Name:'Ishan Sharma',Message:"All along, i thought i was lost, but now i know that was just the feeling of heart searching for you.",Image:GroomImage}}/>
        {
            (auth.isSignedIn && new Date(auth.expirationTime) > new Date())?
            <><TimeLine
                    title="Our Story!"
                    message="Together Forever"
                    desc="Time passes but memories are forever."
                    timeline={[//require('../images/J51A2354.JPG')
                            {image:FirstMeet,title:'First Meet',date:'September 28, 2022',desc:''},
                            {image:FirstDate,title:'First Date',date:'October 21, 2022',desc:''},
                            {image:Engagement,title:'Engagement',date:'December 11, 2022',desc:''},
                            {image:SecondDate,title:'Second Date',date:'December 18, 2022',desc:''},
                            {image:ThirdDate,title:'Third Date',date:'January 29, 2023',desc:''},
                            {image:FindingApartment,title:'Apartment Search',date:'March 25, 2023',desc:''},
                            {image:PreWedding,title:'Pre Wedding',date:'April 9/10, 2023',desc:''}
                        ]}
                    // timeline={}
                    />
                        </>:<></>}

                
            <Invite bgImage={InviteBG} timeline={invites}/>
        <Footer/>
    
    </>;
}

export default Home;