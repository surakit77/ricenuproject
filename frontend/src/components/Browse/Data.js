import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import {
    BrowserRouter as Router,
    Link as RouterLink,
    NavLink,
    useLocation
} from "react-router-dom";


const columns = [
  {
    field: "",
    headerName: "Button",
    sortable: false,
    width: 200,
    disableClickEventBubbling: true,
    renderCell: (params) => (
      <div style={{ margin: "auto"}}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        component={RouterLink}
        to={{pathname: "/detail",search: "?id="+params.getValue("id") }}
      >
        Open
      </Button>
    </div>
    ),
  },
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nameTh', headerName: 'พันธุ์ข้าว (ภาษาไทย)', width: 200},
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

export default function Data(props) {
  let query = useQuery();
  
  const [dataArray, setDataArray] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const name = query.get("name");


    React.useEffect(() => {
      setLoading(true);
      if(name){
        axios.get(`api/rice/search/${name}`).then(result => {
            const { data } = result
            setDataArray(data);
            setLoading(false);
        })
            .catch((error) => {
            })
        }
      else{
          axios.get(`api/rice`).then(result => {
              const { data } = result
              setDataArray(data);
              setLoading(false);
          })
      }

    }, [name]);

    if(loading){
      return(
      <div style= {{display: 'flex', alignItems: 'center', height: 700}}>
      <CircularProgress style= {{display: 'block', margin: 'auto'}}/>
      </div>
      )
    }
  return (
    
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid showToolbar  pagination pageSize={10} rowsPerPageOptions={[ 10, 20, 100]} rows={dataArray} checkboxSelection columns={columns} 
      disableSelectionOnClick onSelectionChange={(newSelection) => { props.setRowSelect(newSelection.rowIds) }}/>
    </div>
  );
}
