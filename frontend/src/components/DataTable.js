import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

import axios from 'axios'
import {
    BrowserRouter as Router,
    Link,
    NavLink,
    useLocation
} from "react-router-dom";


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nameTh', headerName: 'พันธุ์ข้าว (ภาษาไทย)', width: 200 },
  { field: 'nameEn', headerName: 'Rice varieties', width: 200 },
  {
    field: 'province',
    headerName: 'แหล่งปลูก',
    width: 200,
  },
  {
    field: 'source',
    headerName: 'ที่มาของข้อมูล',
    sortable: false,
    width: 400,
  },
];



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function DataTable(props) {
  let query = useQuery();
  const name = query.get("name");
  const [dataArray, setDataArray] = React.useState([]);



    React.useEffect(() => {
        axios.get(`api/rice/search/${name}`).then(result => {
            const { data } = result
            setDataArray(data)
        })
            .catch((error) => {
                if (!name) {
                    axios.get(`api/rice`).then(result => {
                        const { data } = result
                        setDataArray(data)
                    })
                }
            })

    }, [])


  return (
    
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={dataArray} columns={columns} pageSize={10}  checkboxSelection  onSelectionChange={(newSelection) => {props.setChip(newSelection.rowIds);}} />
    </div>
  );
}
