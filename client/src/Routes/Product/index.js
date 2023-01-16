import Product from "../../pages/Product/Product";
import Navbar from '../../components/Navbar/Navbar';
const ProductPage=()=>{
  return (
    <div className="App">
    <Navbar/>
      <Product/>
    </div>
  );
};

export default ProductPage;