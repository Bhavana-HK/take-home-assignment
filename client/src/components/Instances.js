import React from 'react';
const tableHeader = ['ID', 'Instance Name', 'Cost Per Hour', 'Status', 'Action'];
const tableContent = ['id', 'name', 'cost', 'status']

export default function Instances(props) {
  const { instances = [], changeStatus } = props;
  return (
    <div>
      Instances
      <table>
        <thead>
          <tr>{tableHeader.map(header => <td key={header}>{header}</td>)}</tr>
        </thead>
        <tbody>
          {instances.map(instance => {
            const newStatus = instance.status === 'stopped' ? 'start' : 'stop';
            return <tr key={instance.id}>
              {tableContent.map(content => <td key={content}>{instance[content]}</td>)}
              <td key="action" onClick={() => changeStatus(newStatus, instance.id)}>{newStatus}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}