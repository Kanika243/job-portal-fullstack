import { setCompanies, setStatus, setError } from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            dispatch(setStatus('loading'));
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                } else {
                    dispatch(setError(res.data.message || 'Failed to load companies'));
                }
            } catch (error) {
                console.error(error);
                dispatch(setError(error.message));
            }
        }
        fetchCompanies();
    },[dispatch])
}

export default useGetAllCompanies