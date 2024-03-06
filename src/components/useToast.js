import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function useToast() {
    return function(message, type = 'default'){
        switch(type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'warning':
                toast.warning(message);
                break;
            default:
                toast(message);
        }
    }
}