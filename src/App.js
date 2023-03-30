import { Route, Routes } from 'react-router-dom';
import './App.css';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchPage />} exact />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}

export default App;
