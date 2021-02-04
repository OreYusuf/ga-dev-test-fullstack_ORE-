import {useState, useEffect} from 'react';
import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

function App(){

  /* This is example of how to fetch data from API */
  const [propertyData, setPropertyData] = useState(null);
  const [TransactionData, setTransactionData] = useState("");
  const [propertyid, setPropertyid] = useState("");
  const [streetid, setStreetid] = useState("");
   
  //useEffect(() =>{
  //   async function fetchData()
  //   {
  //     // demo request to API (ensure it is running!)
  //     const resp = await fetch("/lrProperty/17401");
  //     const json = await resp.json();

  //     if(json.success)
  //       setPropertyData(json.lrProperty)
  //   }
    
  //   fetchData();
  // }, []);
  /* end example */
  
  const SubmitSearch = async e => {

    if(propertyid) {
      console.log(propertyid)
      const resp = await fetch("/lrProperty/" + propertyid );
      const json = await resp.json();
      if(json.success){
        setPropertyData(json)
        console.log(json.lrProperty.lrTransactions)
        setTransactionData(json.lrProperty.lrTransactions)
      }

    }else {

      console.log(streetid)
      const resp = await fetch("/lrProperty/" + streetid );
      const json = await resp.json();
      if(json.success){
        setPropertyData(json)
        console.log(json.lrProperty.lrTransactions)
        setTransactionData(json.lrProperty.lrTransactions)
      }
    }
  };

  function Transactions(props) {
    const transData = props.data;
    var dates = [];
    var id = [];
    var propertyid = [];
    var price =[];

    for (var i = 0; i < transData.length; i++) {
      
      dates.push(transData[i].date);
      id.push(transData[i].id);
      propertyid.push(transData[i].lr_property_id);
      price.push(transData[i].price);
    }

     return (<div id = "Poutput">
          <div id = "Poutput">
            <h3>DATE</h3>
            {dates.map((date,index) => (
               <p key = {index}> {date} </p> 
               ))}
          </div> 

          <div id = "Poutput">
            <h3>ID</h3>
            {id.map((id,index) => (
               <p key = {index}> {id} </p> 
               ))}
               </div>

            <div id = "Poutput">
            <h3>propertyID</h3>
            {propertyid.map((propertyid,index) => (
               <p key = {index}> {propertyid} </p> 
               ))}
               </div>

            <div id = "Poutput">
            <h3>Price</h3>
            {price.map((price,index) => (
               <p key = {index}> {price} </p> 
               ))}
               </div>
        </div>
        );
  }

  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
        <TextField
                name="propertyID"
                variant="outlined"
                fullWidth
                id="propertyID"
                label="property ID"
                onBlur={({ target }) => setPropertyid(target.value)}
              />
        </Grid>
        <Grid item xs={4}>
        <TextField
                name="Postcode"
                variant="outlined"
                fullWidth
                id="Postcode"
                label="Postcode"
              />
        </Grid>
        <Grid item xs={4}>
        <TextField
                name="Street"
                variant="outlined"
                fullWidth
                id="Street"
                label="Street"
                onBlur={({ target }) => setStreetid(target.value)}
              />
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className="App">
    <form className={classes.root} noValidate>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={6}>
          <FormRow />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.submit}
        size='large'
        onClick={SubmitSearch}
        > Submit </Button>
    </form>
      {propertyData ? <strong>{propertyData.lrProperty.saon}<p></p>{propertyData.lrProperty.street}</strong> : null}
      <h1>TRANSACTIONS</h1>
      <Transactions data={TransactionData} > 
        </Transactions> 
    </div>
  );
}

export default App;