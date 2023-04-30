import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

export const CommonFunctions={
    Message: function(messageType,message){
        if(messageType===1){
            toast.success(message);
        }
        else if(messageType===0){
            toast.error(message);
        }
        else{
            toast.info(message);
        }
    }
}

