import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  useLocation
} from "react-router-dom";
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
export default function Data() {
    let query = useQuery();
    const ID = query.get("id");
    const classes = useStyles();
    const [checked, setChecked] = useState(true);
    const [nutrition, setNutrition] = useState({})
            
        
    useEffect(() => {
        const getData = async () => {
            const result = await axios(`nutrition/${ID}`);
            const nutrition = await result.data;
            setNutrition(nutrition);
            };
        getData();
    }, [ID]);
    
    return (
        <div>
            
        </div>
    )
}
