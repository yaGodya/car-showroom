import { Link } from "react-router-dom";
import { Car } from "../types/types";

interface VehicleCardProps {
    car: Car;
}

export default function VehicleCard({ car }: VehicleCardProps) {
    const price = car.price.toLocaleString("uk-UA");

    return (
        <li className="vehicle-card">
            <article className="vehicle-card__article">
                <Link className="vehicle-card__link" to={`/vehicles/${car.id}`}>
                    <div className="vehicle-card__media">
                        <img src={car.thumbnail} alt={car.title} />
                    </div>

                    <div className="vehicle-card__body">
                        <p className="vehicle-card__brand">{car.brand}</p>
                        <h2>{car.title}</h2>
                        <p className="vehicle-card__price">{price} $</p>
                    </div>
                </Link>
            </article>
        </li>
    );
}
