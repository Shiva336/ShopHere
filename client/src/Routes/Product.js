import Product from "../pages/Product";
import Topbar from '../components/Topbar';
const ProductPage=()=>{
  return (
    <div className="App">
    <Topbar/>
      <Product/>
    </div>
  );
};

export default ProductPage;