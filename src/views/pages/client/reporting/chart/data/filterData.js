export const Operators=[
  { name: "Contains", value: "contains" },
  { name: "Does Not Contain", value: "not_contains" },
  { name: "Begins With", value: "begins_with" },
  { name: "Greator Than", value: "greater_than" },
  { name: "Less Than", value: "less_than" },
  { name: "Equals Single Value", value: "equal_single_value" },
  {
    name: "Does Not Equal Single Value",
    value: "not_equal_single_value",
  },
];

export const Operators2 = [
  { name: "Equals Single Value", value: "equal_single_value" },
  { name: "Does Not Equal Single Value", value: "not_equal_single_value"},
];

export const filters=[
  {
    name: "Name/ID",
    filter_Ch: [
      { name: "Campaign ID", value: "campaign_id" },
      { name: "Campaign Name", value: "campaign_name" },
      { name: "Target ID", value: "target_id" },
      { name: "Target Name", value: "target_name" },
      { name: "Target Number", value: "target_number" },
    ],
  },
  {
    name: "Call",
    filter_Ch: [
      { name: "Connected", value: "call_status_connected" },
      { name: "Caller ID", value: "caller_id" },
      { name: "Number", value: "dialed" },
      { name: "Recording", value: "recording" },
    ],
  },
  {
    name: "Time",
    filter_Ch: [
      { name: "Call Length", value: "duration" },
      { name: "Connected Call Length", value: "time_to_connect" },
      { name: "Time to Call", value: "time_to_call" },
    ],
  },
  {
    name: "Performance",
    filter_Ch: [
      { name: "IsDuplicate", value: "duplicate" },
      { name: "Revenue", value: "revenue" },
      { name: "Converted", value: "call_status_converted" },
    ],
  },
]

export const filters2=[
  {
    name: "Name/ID",
    filter_Ch: [
      { name: "Campaign ID", value: "campaign_id" },
      { name: "Campaign Name", value: "campaign_name" },
      { name: "Target ID", value: "target_id" },
      { name: "Target Name", value: "target_name" },
      { name: "Target Number", value: "target_number" },
    ],
  },
  {
    name: "Call",
    filter_Ch: [
      { name: "Connected", value: "call_status_connected" },
      { name: "Caller ID", value: "caller_id" },
      { name: "Number", value: "dialed" },
      { name: "Recording", value: "recording" },
    ],
  },
  {
    name: "Time",
    filter_Ch: [
      { name: "Call Length", value: "duration" },
      { name: "Connected Call Length", value: "time_to_connect" },
      { name: "Time to Call", value: "time_to_call" },
    ],
  },
  {
    name: "Performance",
    filter_Ch: [
      { name: "IsDuplicate", value: "duplicate" },
      { name: "Revenue", value: "revenue" },
      { name: "Converted", value: "call_status_converted" },
    ],
  },
]
export const tags= [
  {
    name: "Inbound Number",
    tag_Ch: [
      { name: "Client" },
      { name: "Client ID" },
      { name: "Campaign ID" },
      { name: "Campaign" },
      { name: "Publisher ID" },
      { name: "Publisher" },
      { name: "Target ID" },
      { name: "Target" },
      { name: "Target Number" },
    ],
  },
  {
    name: "Date",
    tag_Ch: [
      { name: "Connected" },
      { name: "Caller ID" },
      { name: "Incomplete" },
      { name: "IsLive" },
      { name: "Number" },
      { name: "Recording" },
    ],
  },
  {
    name: "Time",
    tag_Ch: [
      { name: "Call Length" },
      { name: "Connected Call Length" },
      { name: "Time to Call" },
    ],
  },
  {
    name: "Publisher",
    tag_Ch: [
      { name: "Block Reason" },
      { name: "Revenue" },
      { name: "Converted" },
      { name: "Voicemail" },
      { name: "IsDuplicate" },
      { name: "Payout" },
      { name: "Profit" },
      { name: "Total Cost" },
      { name: "Blocked" },
    ],
  },
  {
    name: "Campaign",
    tag_Ch: [{ name: "IVR Depth" }],
  },
  {
    name: "Call Length ",
    tag_Ch: [{ name: "IVR Depth" }],
  },
  {
    name: "Call Info",
    tag_Ch: [{ name: "IVR Depth" }],
  },
  {
    name: "Ivr",
    tag_Ch: [{ name: "IVR Depth" }],
  },
  {
    name: "Menu",
    tag_Ch: [{ name: "IVR Depth" }],
  },
  {
    name: "Dailed Number",
    tag_Ch: [{ name: "IVR Depth" }],
  },
  {
    name: "End Call",
    tag_Ch: [{ name: "IVR Depth" }],
  },
  {
    name: "User",
    tag_Ch: [{ name: "IVR Depth" }],
  },
];

export const tableColumnArray= [
  {
    name: "Papoular",
    links: [
      { name: "campaign" },
      { name: "Publisher" },
      { name: "Target" },
      { name: "Target Number" },
      { name: "Client" },
      { name: "Campaign ID" },
      { name: "Publisher ID" },
      { name: "Target ID" },
      { name: "Client ID" },
    ],
  },
  {
    name: "Call",
    links: [
      { name: "Inbound Call ID" },
      { name: "Call Date" },
      { name: "Caller ID" },
      { name: "Dialed #" },
      { name: "Number ID" },
      { name: "Call Complete Timestamp " },
      { name: "Call Connected Timestamp" },
      { name: "Hangup" },
      { name: "Connected" },
      { name: "Incomplete" },
      { name: "Has Recording" },
      { name: "Is Live" },
      { name: "Recording" },
    ],
  },
  {
    name: "Time",
    links: [
      { name: "Time to Call" },
      { name: "Duration" },
      { name: "Connected Call Length" },
      { name: "Time to Connect" },
    ],
  },
  {
    name: "Performance",
    links: [
      { name: "Converted" },
      { name: "Revenue" },
      { name: "Profit" },
      { name: "Payout" },
      { name: "Voicemail" },
      { name: "Total Cost" },
      { name: "Telco Cost" },
    ],
  },
  {
    name: "IVR",
    links: [{ name: "IVR Depth" }],
  },
];