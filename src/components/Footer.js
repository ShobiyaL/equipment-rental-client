import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box sx={{ p: 2, background: "#000000" }}>
        <Stack
          direction="row"
          spacing={5}
          sx={{
            justifyContent: "space-between",
            p: 2,
            color: "#fce4ec",
            alignItems: "center",
          }}
        >
          <Typography variant="overline" sx={{ color: "#ff80ab" }}>
            EquipRents
          </Typography>
          
        </Stack>
        <Stack spacing={2} sx={{ p: { xs: 0, md: 2 }, color: "#f8bbd0" }}>
          
          
        </Stack>
      </Box>
    </>
  );
};

export default Footer;