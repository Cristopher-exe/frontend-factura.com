import { Container, Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "80vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          paddingTop: "80px",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
