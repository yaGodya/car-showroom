import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGetVehiclesQuery } from "../api/vehiclesApi";
import FilterForm from "../components/FilterForm";
import VehicleList from "../components/VehicleList";
import Loader from "../components/UI/Loader/Loader";
import { FilterState, Car } from "../types/types";

const emptyFilters: FilterState = { query: "", brand: "", maxPrice: "" };

export default function HomePage() {
    const { data, isLoading, isError } = useGetVehiclesQuery();
    const [filters, setFilters] = useState<FilterState>(emptyFilters);
    const products = data?.products ?? [];

    const priceMax = products.reduce(
        (max: number, car: Car) => Math.max(max, car.price),
        0,
    );
    const priceMin = products.reduce(
        (min: number, car: Car) => Math.min(min, car.price),
        priceMax,
    );
    const priceCeiling = Math.ceil(priceMax);
    const priceFloor = Math.floor(priceMin);

    const brands = useMemo(() => {
        return [...new Set(products.map((car: Car) => car.brand))].sort();
    }, [products]);

    const appliedMaxPrice =
        filters.maxPrice === "" ? priceCeiling : Number(filters.maxPrice);

    const cars = useMemo(() => {
        const query = filters.query.trim().toLowerCase();

        return products.filter((car: Car) => {
            const text =
                `${car.title} ${car.brand} ${car.description}`.toLowerCase();
            const matchesQuery = query.length === 0 || text.includes(query);
            const matchesBrand =
                filters.brand.length === 0 || car.brand === filters.brand;
            const matchesPrice = car.price <= appliedMaxPrice;
            return matchesQuery && matchesBrand && matchesPrice;
        });
    }, [products, filters, appliedMaxPrice]);

    return (
        <section className="home">
            <header className="header header--home">
                <h1 className="logo">
                    <Link to="/">CAR SHOWROOM</Link>
                </h1>
                {!isError && (
                    <FilterForm
                        brands={brands}
                        priceMin={priceFloor}
                        priceMax={priceCeiling}
                        onApply={setFilters}
                        onReset={() => setFilters(emptyFilters)}
                        isLoading={isLoading}
                    />
                )}
            </header>
            {isLoading && <Loader />}
            {isError && <p className="status">Не вдалося завантажити авто</p>}
            {!isLoading && !isError && cars.length === 0 && (
                <p className="status">Нічого не знайдено</p>
            )}
            {!isLoading && !isError && cars.length > 0 && (
                <VehicleList cars={cars} />
            )}
        </section>
    );
}
