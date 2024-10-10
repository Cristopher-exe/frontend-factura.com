import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Layout from "../layouts/Layout.jsx";
import { getCustomers, sendInvoice } from "../api/APIsERVICES.JS";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const VistaUno = () => {
  const [open, setOpen] = useState(false);
  const [msjAlert, setMsjAlert] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
    refetchOnWindowFocus: false,
    staleTime: 60000,
    cacheTime: 300000,
    keepPreviousData: true,
  });

  const [formData, setFormData] = useState({
    Receptor: { UID: "6169fc02637e1" },
    TipoDocumento: "factura",
    Conceptos: [
      {
        ClaveProdServ: "81112101",
        Cantidad: 1,
        ClaveUnidad: "E48",
        Unidad: "Unidad de servicio",
        ValorUnitario: 229.9,
        Descripcion: "Desarrollo a la medida",
        Impuestos: {
          Traslados: [
            {
              Base: 229.9,
              Impuesto: "002",
              TipoFactor: "Tasa",
              TasaOCuota: "0.16",
              Importe: 36.784,
            },
          ],
          Locales: [
            {
              Base: 229.9,
              Impuesto: "ISH",
              TipoFactor: "Tasa",
              TasaOCuota: "0.03",
              Importe: 6.897,
            },
          ],
        },
      },
    ],
    UsoCFDI: "S01",
    Serie: 15425,
    FormaPago: "01",
    MetodoPago: "PUE",
    Moneda: "MXN",
    EnviarCorreo: false,
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { mutate } = useMutation(sendInvoice, {
    onSuccess: (data) => {
      setMsjAlert(data.response === "success" ? "success" : "error");
      handleClick();
    },
    onError: (error) => {
      setMsjAlert(data.response === "success" ? "success" : "error");
      handleClick();
      console.error("Error al enviar los datos:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  let fecha = "fechaActual";

  const rows = data
    ? data.data.map((item) => ({
        label: item.RazonSocial,
        value: item.UID,
      }))
    : [];

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="w-full">
        <Typography variant="h4" gutterBottom>
          Nuevo CFDI 4.0
        </Typography>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={msjAlert === "success" ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {msjAlert === "success"
              ? "¡CFDI creado correctamente!"
              : "Erro al crear CFDI"}
          </Alert>
        </Snackbar>

        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo de CFDI
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tipo de CFDI"
                size="small"
                value="factura"
                name="TipoDocumento"
                onChange={handleChange}
              >
                <MenuItem value="factura">Factura</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Fecha de CFDI
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Fecha de CFDI"
                size="small"
                name="fechaMensaje"
                value={fecha}
              >
                <MenuItem value="fechaActual">
                  Timbrar con fecha actual
                </MenuItem>
                <MenuItem value="fechaAyer">Timbrar con fecha de ayer</MenuItem>
                <MenuItem value="fechaDos">
                  Timbrar con fecha de hace dos dias
                </MenuItem>
                <MenuItem value="fechaTres">
                  Timbrar con fecha de hace tres dias
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              options={rows}
              fullWidth
              required
              size="small"
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                setFormData((prevData) => ({
                  ...prevData,
                  Receptor: {
                    ...prevData.Receptor,
                    UID: newValue ? newValue.value : "",
                  },
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Cliente" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Lugar de expedición
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Lugar de expedición"
                size="small"
                value="principal"
              >
                <MenuItem value="principal">Principal</MenuItem>
                <MenuItem value="sucursal">Sucursal Uno</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Uso de CFDI</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Uso de CFDI"
                size="small"
                name="UsoCFDI"
                value={formData.UsoCFDI}
                onChange={handleChange}
              >
                <MenuItem value="S01">Gastos en general</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Serie</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Serie"
                size="small"
                name="Serie"
                value={formData.Serie}
                onChange={handleChange}
              >
                <MenuItem value={15425}>F</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">
                Metodo de pago
              </InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                label="Metodo de pago"
                size="small"
                name="MetodoPago"
                value={formData.MetodoPago}
                onChange={handleChange}
              >
                <MenuItem value="PUE">Pago en una sola exhibición</MenuItem>
                <MenuItem value="PPD">Pago en parcialidades</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Forma de pago
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Forma de pago"
                size="small"
                name="FormaPago"
                value={formData.FormaPago}
                onChange={handleChange}
              >
                <MenuItem value="01">Efectivo</MenuItem>
                <MenuItem value="02">Cheque</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Moneda"
                size="small"
                name="Moneda"
                value={formData.Moneda}
                onChange={handleChange}
              >
                <MenuItem value="MXN">MXN</MenuItem>
                <MenuItem value="AFN">AFN</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Decimales</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Decimales"
                size="small"
                defaultValue={2}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            padding={2}
            container
            justifyContent="flex-end"
          >
            <Stack spacing={2} direction="row">
              <Button variant="outlined" type="submit" color="success">
                Guardar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default VistaUno;
