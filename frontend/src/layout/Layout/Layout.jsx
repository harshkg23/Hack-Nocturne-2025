import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Child components will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
