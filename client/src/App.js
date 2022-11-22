import Filters from "./components/Filters";
import Navbar from "./components/Navbar";
import ShopCards from "./components/ShopCards";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div style={{marginTop: 70, padding: 20}}>
        <div style={{marginBottom: 30}}>
          <Filters />
        </div>
        <ShopCards />
      </div>
    </div>
  );
}

export default App;
