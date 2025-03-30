import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    
    const [search, setSearch] = useState(false);
    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: "",
    });
    const [jobs,setJobs] = useState([])

    const [showrecruiterlogin,setShowrecruiterlogin] = useState(false)

    const fetchjobs =  async()=>{
        setJobs(jobsData)
    }

    useEffect(()=>{
        fetchjobs()
    },[])

    const value = {
        search,
        searchFilter,  // ✅ Fixed typo here
        setSearch,
        setSearchFilter,
        jobs,setJobs,
        showrecruiterlogin,setShowrecruiterlogin
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
