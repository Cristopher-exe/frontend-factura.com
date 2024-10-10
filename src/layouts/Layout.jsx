import { Container, Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh", // Asegura que cubra toda la pantalla en altura
          width: "100%", // Ocupa todo el ancho disponible
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
