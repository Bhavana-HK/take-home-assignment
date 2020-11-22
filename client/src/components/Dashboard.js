import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Header from './Header';
import Summary from './Summary';
import Instances from './Instances';
import Alert from './Alert';
import { getUser, instances, instanceStatus } from '../services';
import { INR_SYMBOL, INR_USD_RATE } from "../constants";

export default function Dashboard() {
  // import useSWR from "swr";
  // let { data, error } = useSWR("instances", instances);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const convertCurrency = (instancesData) => {
    const convertedData = instancesData.map(instance => ({
      ...instance,
      cost: currency === 'INR'
        ? `${INR_SYMBOL} ${(instance.costPerHour / INR_USD_RATE).toFixed(2)}`
        : `$ ${instance.costPerHour}`
    }))
    setData(convertedData);
  };

  useEffect(() => {
    convertCurrency(data);
  }, [currency])

  useEffect(() => {
    function updateData(instancesData) {
      convertCurrency(instancesData);
    }

    function updateError(error) {
      setErrorMessage(error);
      setTimeout(() => setErrorMessage(null), 3000);
    }

    instances()
      .then(res => updateData(res))
      .catch(err => updateError(err.message))
  }, [refresh]);

  const changeStatus = (status, id) => {
    instanceStatus(status, id)
      .then(res => {
        setRefresh(!refresh);
      })
      .catch(err => {
        setErrorMessage(err.message);
        setTimeout(() => setErrorMessage(null), 3000);
      })
  };

  if (!getUser())
    return <Redirect to={{ pathname: "/login" }} />

  return (
    <div>
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      <Header setError={setErrorMessage} />
      <Summary instances={data} currency={currency} setCurrency={setCurrency} />
      <Instances instances={data} currency={currency} changeStatus={changeStatus} />
    </div>
  );
}