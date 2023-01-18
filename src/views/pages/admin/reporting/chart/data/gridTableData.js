export const columnDefs = [
  // { field: 'check', colId: '0', headerName: '', checkbox:true , cellRenderer: 'dropdown'},
  { field: 'call_date', colId: '1', headerName: 'Call Date', checkbox: true},
  { field: 'campaign_name' , colId: '2', headerName: 'Campaign Name', checkbox:true },
  { field: 'publisher_name' , colId: '3' , headerName: 'Publisher Name', checkbox:true },
  { field: 'caller_id' , colId: '4' , headerName: 'Caller ID', checkbox:true },
  { field: 'dialed' , colId: '5' , headerName: 'Dialed', checkbox:true },
];

export const columnDefsForSideMenu = [
    { field: 'call_date', colId: '1', headerName: 'Call Date', checkbox:true },
    { field: 'campaign_name' , colId: '2', headerName: 'Campaign Name', checkbox:true },
    { field: 'publisher_name' , colId: '3' , headerName: 'Publisher Name', checkbox:true },
    { field: 'caller_id' , colId: '4' , headerName: 'Caller ID', checkbox:true },
    { field: 'dialed' , colId: '5' , headerName: 'Dialed', checkbox:true },
    { field: 'time_to_call' , colId: '6' , headerName: 'Time To Call', checkbox:false },
    { field: 'duplicate' , colId: '7' , headerName: 'Duplicate', checkbox:false },
    { field: 'call_status' , colId: '8' , headerName: 'Call Status', checkbox:false },
    { field: 'time_to_connect' , colId: '9' , headerName: 'Time To Connect', checkbox:false },
    { field: 'target_name' , colId: '10' , headerName: 'Target Name', checkbox:false },
    { field: 'revenue' , colId: '11' , headerName: 'Revenue', checkbox:false },
    { field: 'payout' , colId: '12' , headerName: 'Payout', checkbox:false },
    { field: 'profit' , colId: '13' , headerName: 'Profit', checkbox:false },
    { field: 'duration' , colId: '14' , headerName: 'Duration', checkbox:false },
    { field: 'recording' , colId: '15' , headerName: 'Recording', checkbox:false },
];
