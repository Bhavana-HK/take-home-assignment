import React from "react";
import { INR_SYMBOL, INR_USD_RATE } from '../constants';
import CustomSwitch from './Switch';

export default function Summary(props) {
  const { instances = [], currency = 'USD', setCurrency } = props;
  const runningCost = instances.reduce((prev, curr) => {
    if (curr.status === 'running')
      return prev + curr.costPerHour;
    return prev;
  }, 0);
  const stoppedCost = instances.reduce((prev, curr) => {
    if (curr.status === 'stopped')
      return prev + curr.costPerHour
    return prev;
  }, 0);


  const summaryInfo =
    currency === 'INR'
      ? {
        symbol: INR_SYMBOL,
        runningCost: runningCost / INR_USD_RATE,
        stoppedCost: stoppedCost / INR_USD_RATE,
      }
      : {
        symbol: '$',
        runningCost: runningCost,
        stoppedCost: stoppedCost,
      };

  const handleChange = () => {
    const newCurrency = currency === 'INR' ? 'USD' : 'INR';
    setCurrency(newCurrency);
  }
  return (
    <div>
      <SummaryTable
        symbol={summaryInfo.symbol}
        runningCost={summaryInfo.runningCost}
        stoppedCost={summaryInfo.stoppedCost}
      />

      INR
      <CustomSwitch
        checked={currency === 'USD' ? true : false}
        onChange={handleChange}
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      USD
    </div>
  );

}

function SummaryTable({ symbol, runningCost, stoppedCost }) {
  return <table>
    <tbody>
      <tr>
        <td>
          {symbol}
          <span> {runningCost.toFixed(2)}</span> / hr
            </td>
        <td>
          {symbol}
          <span> {stoppedCost.toFixed(2)}</span> / hr
            </td>
      </tr>
      <tr>
        <td>Running Instances</td>
        <td>Stopped Instances</td>
      </tr>
    </tbody>
  </table>
}



