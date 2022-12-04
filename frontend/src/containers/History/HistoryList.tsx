// import * as React from "react";
// import Box from "@mui/material/Box";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// // 추후에 사용할 Fields
// // const FIELDS = [
// //   "Status",
// //   "Notification Type",
// //   "From",
// //   "Send To",
// //   "Created/Updated At",
// //   "Sent At",
// // ];

// declare type DataSet = {
//   id: number;
//   status: string;
//   notificationType: string;
//   from: string;
//   sendTo: string;
//   createdAt: string;
//   sentAt: string;
// };

// // mock Data
// const mockCsvData: DataSet[] = [
//   {
//     id: 1,
//     status: "Success",
//     notificationType: "SMS",
//     from: "010-2087-6280",
//     sendTo: "010-1230-3344",
//     createdAt: "2022-11-12",
//     sentAt: "2022-11-13",
//   },
//   {
//     id: 2,
//     status: "Failure",
//     notificationType: "SMS",
//     from: "010-2087-6280",
//     sendTo: "010-1230-3344",
//     createdAt: "2022-11-12",
//     sentAt: "2022-11-13",
//   },
//   {
//     id: 3,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 4,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 5,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 6,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 7,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 8,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 9,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 10,
//     status: "Success",
//     notificationType: "SMS",
//     from: "010-2087-6280",
//     sendTo: "010-1230-3344",
//     createdAt: "2022-11-12",
//     sentAt: "2022-11-13",
//   },
//   {
//     id: 11,
//     status: "Success",
//     notificationType: "SMS",
//     from: "010-2087-6280",
//     sendTo: "010-1230-3344",
//     createdAt: "2022-11-12",
//     sentAt: "2022-11-13",
//   },
//   {
//     id: 12,
//     status: "Failure",
//     notificationType: "SMS",
//     from: "010-2087-6280",
//     sendTo: "010-1230-3344",
//     createdAt: "2022-11-12",
//     sentAt: "2022-11-13",
//   },
//   {
//     id: 13,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 14,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 15,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 16,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 17,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 18,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
//   {
//     id: 9,
//     status: "Upcoming",
//     notificationType: "Email",
//     from: "joseph423@naver.com",
//     sendTo: "obiwan@tatooine.com",
//     createdAt: "2022-12-12",
//     sentAt: "2022-12-23",
//   },
// ];

// export default function HistoryListTable() {
//   const [pageSize, setPageSize] = React.useState<number>(100);

//   return (
//     <Box sx={{ height: "100%", width: 1, ml: 10, mr: 10, mt: 5 }}>
//       <DataGrid
//         disableColumnFilter
//         disableColumnSelector
//         disableDensitySelector
//         columns={[
//           {
//             field: "status",
//             headerName: "Status",
//             width: 150,
//           },
//           {
//             field: "notificationType",
//             headerName: "Notification Type",
//             width: 180,
//           },
//           { field: "from", headerName: "From", width: 150 },
//           {
//             field: "sendTo",
//             headerName: "Send To",
//             width: 150,
//           },
//           {
//             field: "createdAt",
//             headerName: "Created/Updated At",
//             width: 180,
//           },
//           {
//             field: "sentAt",
//             headerName: "Sent At",
//             width: 150,
//           },
//         ]}
//         rows={mockCsvData}
//         components={{ Toolbar: GridToolbar }}
//         pageSize={pageSize}
//         onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//         rowsPerPageOptions={[10, 25, 50, 100]}
//         pagination
//         componentsProps={{
//           toolbar: {
//             // Export 버튼 제거를 위해 아래 두 줄 필요
//             csvOptions: { disableToolbarButton: true },
//             printOptions: { disableToolbarButton: true },
//             showQuickFilter: true,
//             quickFilterProps: { debounceMs: 500 },
//           },
//         }}
//         autoHeight
//       />
//     </Box>
//   );
// }

// // DataGridPro를 사용한 multifilter
// import { DataGridPro, GridLinkOperator } from "@mui/x-data-grid-pro";
// import { useDemoData } from "@mui/x-data-grid-generator";
// import { useState } from "react";
// import { Button } from "@mui/material";
// import Box from "@mui/material/Box";

// const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

// export default function History() {
//   const { data } = useDemoData({
//     dataSet: "Employee",
//     visibleFields: VISIBLE_FIELDS,
//     rowLength: 100,
//   });

//   interface GridFilterItem {
//     id: number;
//     columnField: string;
//     operatorValue: string;
//     value: string | number;
//   }

//   const [filt, setFilt] = useState<GridFilterItem[]>([]);

//   return (
//     <Box sx={{ height: 400, width: "100%", ml: 10, mr: 10, mt: 5 }}>
//       <DataGridPro
//         {...data}
//         filterModel={{
//           items: filt,
//           linkOperator: GridLinkOperator.And,
//         }}
//       />
//       <Button
//         variant="contained"
//         style={{ marginRight: "20px" }}
//         onClick={() =>
//           setFilt([
//             ...filt,
//             { id: 1, columnField: "rating", operatorValue: ">", value: 3 },
//           ])
//         }
//       >
//         Rating Greater Than 3
//       </Button>
//       <Button
//         variant="contained"
//         style={{ marginRight: "20px" }}
//         onClick={() =>
//           setFilt([
//             ...filt,
//             {
//               id: 2,
//               columnField: "name",
//               operatorValue: "startsWith",
//               value: "A",
//             },
//           ])
//         }
//       >
//         Name Starts With A
//       </Button>
//       <Button
//         variant="contained"
//         style={{ marginRight: "20px" }}
//         onClick={() => setFilt([])}
//       >
//         Reset Filters
//       </Button>
//     </Box>
//   );
// }

// // prime react에서 multiple buttons
// import "primeicons/primeicons.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.css";
// import "../../index.css";

// import React, { useState } from "react";
// import { SelectButton } from "primereact/selectbutton";

// export default function HistoryListTable() {
//   const [value2, setValue2] = useState(null);
//   const paymentOptions = [
//     { name: "Option 1", value: 1 },
//     { name: "Option 2", value: 2 },
//     { name: "Option 3", value: 3 },
//   ];
//   const justifyOptions = [
//     { icon: "pi pi-align-left", value: "left" },
//     { icon: "pi pi-align-right", value: "Right" },
//     { icon: "pi pi-align-center", value: "Center" },
//     { icon: "pi pi-align-justify", value: "Justify" },
//   ];

//   const justifyTemplate = (option: { icon: string | undefined }) => {
//     return <i className={option.icon}></i>;
//   };

//   return (
//     <div>
//       <div className="card">
//         <h5>Multiple Selection</h5>
//         <SelectButton
//           value={value2}
//           options={paymentOptions}
//           onChange={(e) => setValue2(e.value)}
//           optionLabel="name"
//           multiple
//         />
//       </div>
//     </div>
//   );
// }

// minifilter 왜 구현안되는지 모르겠음
import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, GridReadyEvent } from "ag-grid-community";

interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}
interface NotificationData {
  id: number;
  status: string;
  project: string;
  notificationType: string;
  from: string;
  sendTo: string;
  createdUpdatedAt: Date;
  sentAt: Date;
}

export default function HistoryListTable() {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // set filters
    { field: "athlete", filter: true },
    { field: "country", filter: "agSetColumnFilter" },
    // number filters
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
}

// import React from "react";
// import TableFilter from "react-table-filter";
// import "./styles.css";
// import { SampleData } from "./SampleData";
// import "react-table-filter/lib/styles.css";

// export default class App extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       episodes: SampleData,
//     };
//     this.filterUpdated = this.filterUpdated.bind(this);
//   }

//   filterUpdated(newData: any) {
//     this.setState({
//       episodes: newData,
//     });
//   }

//   render() {
//     const episodes = this.state.episodes;
//     const elementsHtml = episodes.map(
//       (
//         item: {
//           no:
//             | string
//             | number
//             | boolean
//             | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//             | React.ReactFragment
//             | React.ReactPortal
//             | null
//             | undefined;
//           project:
//             | string
//             | number
//             | boolean
//             | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//             | React.ReactFragment
//             | React.ReactPortal
//             | null
//             | undefined;
//           status:
//             | string
//             | number
//             | boolean
//             | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//             | React.ReactFragment
//             | React.ReactPortal
//             | null
//             | undefined;
//         },
//         index: string
//       ) => {
//         return (
//           <tr key={"row_" + index}>
//             <td className="cell">{item.no}</td>
//             <td className="cell">{item.project}</td>
//             <td className="cell">{item.status}</td>
//           </tr>
//         );
//       }
//     );
//     return (
//       <div>
//         <div className="nav-bar">
//           <div className="container">React Table Filters</div>
//         </div>
//         <div className="examples">
//           <div className="basic">
//             <h3 className="header">Basic Usage</h3>
//             <table className="basic-table">
//               <thead>
//                 <TableFilter
//                   rows={episodes}
//                   onFilterUpdate={this.filterUpdated}
//                 >
//                   <th
//                     key="name"
//                     filterkey="name"
//                     className="cell"
//                     // casesensitive={"true"}
//                     showsearch={"true"}
//                   >
//                     S. No
//                   </th>
//                   <th key="project" filterkey="project" className="cell">
//                     Project
//                   </th>
//                   <th
//                     key="status"
//                     filterkey="status"
//                     className="cell"
//                     alignleft={"true"}
//                   >
//                     Status
//                   </th>
//                 </TableFilter>
//               </thead>
//               <tbody>{elementsHtml}</tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
