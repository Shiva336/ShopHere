import Product from "../../pages/Product/Product";
import TopBar from '../../components/topbar/Topbar';
const ProductPage=()=>{
  return (
    <div className="App">
    <TopBar/>
      <Product/>
    </div>
  );
};

export default ProductPage;