import Layout from "../layouts/Layout";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { getInvoices, sendEmail } from "../api/APIsERVICES.JS";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban, Mail } from "lucide-react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import getChipColor from "../utils/getChipColor";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";

const paginationModel = { page: 0, pageSize: 5 };

const vistaDos = () => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
    refetchOnWindowFocus: false,
    staleTime: 60000,
    cacheTime: 300000,
    keepPreviousData: true,
  });

  const rows = data
    ? data.data.map((item, index) => ({
        id: item.UID,
        tipoDoc: "Factura",
        folio: item.Folio,
        serie: item.NumOrder,
        total: item.Total,
        fecha: item.FechaTimbrado,
        estatus: item.Status,
      }))
    : [];

  const { mutate } = useMutation(sendEmail, {
    onSuccess: (data) => {
      handleCloseBackdrop();
      handleOpenSnackbar();
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error) => {
      console.error("Error al enviar los datos:", error);
      handleCloseBackdrop();
    },
  });

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  const handleClick = (id) => {
    handleOpenBackdrop();
    mutate(id);
  };

  const columns = [
    { field: "tipoDoc", headerName: "Tipo documento", flex: 1, minWidth: 80 },
    { field: "folio", headerName: "Folio", flex: 1, minWidth: 80 },
    { field: "serie", headerName: "Serie", flex: 1, minWidth: 80 },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      minWidth: 80,
    },
    { field: "fecha", headerName: "Fecha", flex: 1, minWidth: 80 },
    {
      field: "estatus",
      headerName: "Estatus",
      sortable: false,
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} marginTop={2}>
          <Chip
            label={params.value}
            color={getChipColor(params.value)}
            variant="outlined"
            size="small"
          />
        </Stack>
      ),
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      headerName: "Actions",
      minWidth: 80,
      getActions: (params) => [
        <Tooltip title="Cancelar" key="cancel-action" placement="top">
          <GridActionsCellItem
            icon={<Ban size={20} />}
            label="Cancelar"
            disabled={params.row.estatus === "cancelada"}
            onClick={() => {
              alert("No implementado");
            }}
          />
        </Tooltip>,
        <Tooltip title="Enviar" key="send-action" placement="top">
          <GridActionsCellItem
            icon={<Mail size={20} />}
            label="Enviar"
            disabled={params.row.estatus === "cancelada"}
            onClick={() => handleClick(params.id)}
          />
        </Tooltip>,
      ],
    },
  ];

  if (error) {
    return <div>Error al cargar facturas: {error.message}</div>;
  }

  return (
    <Layout>
      <Paper sx={{ height: 500, width: "80%" }}>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={openBackdrop}
          onClick={handleCloseBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message="¡Correo enviado!"
          severity="success"
          variant="filled"
        />

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
            pinnedColumns: {
              left: ["desk"],
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, maxHeight: "450px" }}
          loading={isLoading}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
        />
      </Paper>
    </Layout>
  );
};

export default vistaDos;
