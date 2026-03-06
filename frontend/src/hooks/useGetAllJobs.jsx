import { setAllJobs, setStatus, setError } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);

    useEffect(()=>{
        const fetchAllJobs = async () => {
            dispatch(setStatus('loading'));
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    dispatch(setError(res.data.message || 'Failed to fetch jobs'));
                }
            } catch (error) {
                console.error(error);
                dispatch(setError(error.message));
            }
        }
        fetchAllJobs();
    },[searchedQuery, dispatch])
}

export default useGetAllJobs