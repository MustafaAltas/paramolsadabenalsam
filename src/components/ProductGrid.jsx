import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";
import * as XLSX from "xlsx";
import Button from '@mui/material/Button';

export default function ProductGrid() {
  const { product } = React.useContext(AppContext);
  const [exportExcel,setExportExcel] = React.useState([]);

  React.useEffect(()=> {
    const exportTOExcel = product?.map((item) => {
      return(
        {id:item.id,title:item.title,price:item.price}
      )
    })
    setExportExcel(exportTOExcel)
  },[product])


  const handleExportToExcel = () => {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(exportExcel);

    XLSX.utils.book_append_sheet(workBook, workSheet, "Products");
    XLSX.writeFile(workBook, "Products.xlsx");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Button variant="contained" onClick={handleExportToExcel}>Export With Excel</Button>
      {/* <button onClick={handleExportToExcel}>Export With Excel</button>  */}
      <Grid container rowSpacing={1}>
        {product?.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4}  key={item.id}>
              <ProductCard item={item}/>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
