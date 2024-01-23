import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "topic",
    headerName: "Topic",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "dateCreated",
    headerName: "Date Created",
    width: 110,
    renderCell: (params) => {
      const date = new Date(params.row.dateCreated).toLocaleDateString();
      return date;
    },
  },
  {
    field: "severity",
    headerName: "Severity",
    sortable: false,
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    sortable: false,
    width: 150,
  },
  {
    field: "assignedTo",
    headerName: "Assigned To",
    sortable: false,
    width: 150,
    renderCell: (params) => {
      const person = params.row.assignedTo;
      return `${person.name} (${person.email})`;
    },
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    width: 150,
  },
  {
    field: "resolvedOn",
    headerName: "Resolved On",
    width: 110,
    renderCell: (params) => {
      const date = new Date(params.row.resolvedOn).toLocaleDateString();
      return date;
    },
  },
];

export default function AgentsDataTable() {
  const { tickets } = useSelector((state) => state.ticket);

  const rows = tickets.map(
    (
      {
        topic,
        description,
        dateCreated,
        severity,
        type,
        assignedTo,
        status,
        resolvedOn,
      },
      index
    ) => ({
      id: index + 1,
      topic,
      description,
      dateCreated,
      severity,
      type,
      assignedTo,
      status,
      resolvedOn,
    })
  );
  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5, 15, 30]}
      disableRowSelectionOnClick
    />
  );
}
