import Product from "../../pages/Product/Product";
import Topbar from '../../components/topbar/Topbar';
const ProductPage=()=>{
  return (
    <div className="App">
    <Topbar/>
      <Product/>
    </div>
  );
};

export default ProductPage;