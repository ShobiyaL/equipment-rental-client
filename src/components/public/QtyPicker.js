import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const QtyPicker = ({ stockMax, selectedQty, qtySelectorFunc }) => {
  //since Array.from has 0(zeros),removing via map func
  const qtyMenuArr = Array.from(Array(stockMax).keys()).map((i) => i + 1);

  return (
    <>
      <FormControl
        variant="standard"
        sx={{ my: 2, width: { xs: "30ch", sm: "35ch", md: "40ch" } }}
      >
        <InputLabel id="qty-picker">Quantity</InputLabel>
        <Select
          labelId="qty-picker"
          id="qtypicker"
          value={selectedQty}
          onChange={(ev) => qtySelectorFunc(ev.target.value)}
          label="Quantity"
        >
          {qtyMenuArr &&
            qtyMenuArr.map((qtyVal) => (
              <MenuItem value={qtyVal} key={qtyVal}>
                {qtyVal}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default QtyPicker;