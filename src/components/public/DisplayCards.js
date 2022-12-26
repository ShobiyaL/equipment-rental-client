import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
  } from "@mui/material";
  import React from "react";
  
  import LazyLoad from "react-lazyload";
  import { useNavigate } from "react-router-dom";
  
  const DisplayCards = ({ productsArray }) => {
    const navigate = useNavigate();
    return (
      <>
        <>
          <Container maxWidth="xl" sx={{ my: 5 }}>
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: "center",
                my: 2,
                pb: 2,
                "& .MuiCard-root:hover": {
                  background: "#f8bbd0",
                  transition: "3s",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  /* transition: .5s ease-in-out; [0.5 seconds] */
                },
              }}
            >
              {productsArray.map(({ url, _id, name, price }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={_id}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      mx: "auto",
                    }}
                  >
                    <CardActionArea
                      onClick={() => navigate(`/store/product/${_id}`)}
                    >
                      <CardContent>
                        <Typography variant="body1" noWrap>
                          {name}
                        </Typography>
                      </CardContent>
                      <LazyLoad height={220}>
                        <CardMedia
                          component="img"
                          loading="lazy"
                          height="220"
                          sx={{ objectFit: "contain" }}
                          image={url}
                          alt={`Browse ${name}`}
                        />
                      </LazyLoad>
                      <CardContent>
                        <Typography variant="h6" sx={{ color: "#ff4081" }}>
                          ₹{price}.00
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      </>
    );
  };
  
  export default DisplayCards;