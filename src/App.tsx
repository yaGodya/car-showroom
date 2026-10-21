import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import HomePage from "./pages/HomePage";
import VehiclePage from "./pages/VehiclePage";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="page">
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/vehicles/:vehicleId"
                                element={<VehiclePage />}
                            />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </Provider>
    );
}
