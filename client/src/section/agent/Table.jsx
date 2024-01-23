import { Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const columns = [
  { field: "id", headerName: "ID", width: 90, hidden: true },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 110,
  },
  {
    field: "description",
    headerName: "Description",
    description: "This column is not sortable.",
    sortable: false,
    width: 240,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      const isActive = params.row.active;
      return (
        <Chip
          label={<Typography variant="subtitle2">{isActive ? "Active" : "Inactive"}</Typography>}
          color={isActive ? "success" : "error"}
          variant="outlined"
        />
      );
    },
  },
];

export default function AgentsDataTable() {
  const { agents } = useSelector((state) => state.agent);

  const rows = agents.map((el, index) => ({
    id: index + 1,
    name: el.name,
    phone: el.phone,
    email: el.email,
    description: el.description,
    active: el.active,
  }));
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
