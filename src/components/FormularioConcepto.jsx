import { useState } from "react";
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
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const FormularioConcepto = ({ onUpdateConceptos }) => {
  const [concepto, setConcepto] = useState({
    ClaveProdServ: "81112101",
    Cantidad: 1,
    ClaveUnidad: "",
    Unidad: "",
    ValorUnitario: "",
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
  });

  const [conceptosArray, setConceptosArray] = useState([]);
  const [newRows, setnewRows] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: "id", headerName: "#", flex: 1, minWidth: 80 },
    { field: "cantidad", headerName: "Cantidad", flex: 1, minWidth: 80 },
    { field: "concepto", headerName: "Concepto", flex: 1, minWidth: 80 },
    {
      field: "precioUnitario",
      headerName: "Precio Unitario",
      flex: 1,
      minWidth: 80,
    },
  ];

  const opcionesUnidad = [
    { value: "18", label: "Tambor de cincuenta y cinco galones (EUA)" },
    { value: "19", label: "Camión cisterna" },
    { value: "26", label: "Tonelada real" },
  ];
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const limpiar = () => {
    setConcepto({
      ClaveProdServ: "81112101",
      Cantidad: 1,
      ClaveUnidad: "",
      Unidad: "",
      ValorUnitario: "",
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
    });
  };

  const handleGuardar = () => {
    if (!concepto.ValorUnitario) {
      handleClick();
      return;
    }

    setConceptosArray((prevArray) => {
      const updatedArray = [...prevArray, concepto];

      let contadorId = 1;
      const newRows1 = updatedArray.map((concepto) => ({
        id: contadorId++,
        cantidad: concepto.Cantidad,
        concepto: concepto.Descripcion,
        precioUnitario: concepto.ValorUnitario,
      }));

      setnewRows(newRows1);
      onUpdateConceptos(updatedArray);

      limpiar();
      return updatedArray;
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "ClaveUnidad") {
      const selectedOption = opcionesUnidad.find(
        (option) => option.value === value
      );

      setConcepto({
        ...concepto,
        ClaveUnidad: value,
        Unidad: selectedOption ? selectedOption.label : "",
      });
    } else {
      setConcepto({
        ...concepto,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Conceptos
      </Typography>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Campos vacios
        </Alert>
      </Snackbar>

      <Divider />

      <Grid container spacing={2} sx={{ width: "100%", marginTop: "5px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="id-description"
            label="Descripción"
            name="Descripcion"
            value={concepto.Descripcion}
            onChange={handleChange}
            required
            variant="outlined"
            size="small"
            fullWidth
            className="mb-5"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            id="outlined-basic"
            label="Cantidad"
            name="Cantidad"
            value={concepto.Cantidad}
            required
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            className="mb-5"
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Unidad</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Unidad"
              size="small"
              value={concepto.ClaveUnidad}
              name="ClaveUnidad"
              onChange={handleChange}
            >
              <MenuItem value="18">
                Tambor de cincuenta y cinco galones (EUA)
              </MenuItem>
              <MenuItem value="19">Camión cisterna</MenuItem>
              <MenuItem value="26">Tonelada real</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-basic"
            label="Precio Unitario"
            required
            type="number"
            variant="outlined"
            name="ValorUnitario"
            value={concepto.ValorUnitario}
            size="small"
            fullWidth
            className="mb-5"
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Objeto de impuesto
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Objeto de impuesto"
              size="small"
              defaultValue="Uno"
            >
              <MenuItem value="Uno">No objeto de impuesto</MenuItem>
              <MenuItem value="Dos">Sí objeto de impuesto</MenuItem>
              <MenuItem value="Tres">
                Sí objeto del impuesto y no obligado al desglose
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            id="outlined-basic"
            label="Clave SAT"
            required
            variant="outlined"
            size="small"
            fullWidth
            className="mb-5"
            value="XAHGS63VS653"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            id="outlined-basic"
            label="Impuesto"
            required
            variant="outlined"
            value={"16 %"}
            disabled
            size="small"
            fullWidth
            className="mb-5"
          />
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
            <Button
              variant="outlined"
              onClick={() => {
                handleGuardar();
              }}
              color="success"
            >
              Guardar concepto
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Conceptos agregados
      </Typography>

      <Divider />

      <Grid container spacing={2} sx={{ width: "100%", marginTop: "5px" }}>
        <Grid item xs={12} sm={12}>
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid rows={newRows} columns={columns} sx={{ border: 0 }} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormularioConcepto;
