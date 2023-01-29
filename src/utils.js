import { toast } from "react-toastify";

const utils = {
    makeResponse: function(response){
            if((response?.code||403) !== 200){
                utils.dismiss();
                return utils.informError(response?.response||'Unknown error occured');
            }
    },
    say: function(message){
        toast.dismiss();
        return toast.info(message);
    },
    informError: function(message){
        toast.dismiss();
        return toast.error(message);
    },
    success: function(message){
        toast.dismiss();
        return toast.success(message);
    },
    loading: function(loadText){
        toast.dismiss();
        return toast.loading(loadText || 'Loading...');
    },
    dismiss: function(){
        return toast.dismiss();
    },
    generateString: function(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    displayMoney: function (value){
        const formattedValue = value.toLocaleString("en-NG", { style: "currency", currency: "NGN" });
        
        // Add the naira symbol (U+20A6) to the end of the formatted value
        return formattedValue ;
        // const numFormat = new Intl.NumberFormat('en-NG', {
        //     style: 'currency',
        //     currency: 'NGN',
        // });
    
        // return numFormat.format(value).split('.', 1);
    }
}
export default utils;