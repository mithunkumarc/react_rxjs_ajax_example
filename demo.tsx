import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ajax } from 'rxjs/ajax';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';



export default function BasicButtons() {
  const [id, setId] = useState(1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({id: 1, email: "some", first_name: "some", last_name: "some", avatar: "some"});
  const handler = () => {
    setId((id) => id+1)
  }

  useEffect(() => {
    setShow(true);
    const obs$ = ajax(`https://reqres.in/api/users/${id}`);
    obs$.subscribe(val => {
      setData(val.response['data']);
      setShow(false);
    });

  },[id])

  return (
    <div>
      <div>First Name : {data['first_name']}</div>
      <br/>
      <div>Email : {data['email']}</div>
      {show && <CircularProgress />}
      <br />
      {!show && <Button onClick={handler} variant="contained">Next User</Button>}
    </div>    
  );
}
