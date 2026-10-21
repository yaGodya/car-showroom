import { Car } from "../types/types";
import VehicleCard from "./VehicleCard";

interface VehicleListProps {
    cars: Car[];
}

export default function VehicleList({ cars }: VehicleListProps) {
    return (
        <ul className="vehicle-list">
            {cars.map((car) => (
                <VehicleCard key={car.id} car={car} />
            ))}
        </ul>
    );
}
