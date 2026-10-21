import { useState } from "react";
import { Car } from "../types/types";

interface VehicleDetailsProps {
    car: Car;
}

export default function VehicleDetails({ car }: VehicleDetailsProps) {
    const photos = car.images?.length ? car.images : [car.thumbnail];
    const [activeIndex, setActiveIndex] = useState(0);
    const activePhoto = photos[activeIndex] ?? photos[0];

    return (
        <section className="vehicle-details">
            <h1>{car.title}</h1>
            <div className="vehicle-layout">
                <ul className="vehicle-thumbs">
                    {photos.map((src, index) => (
                        <li key={src}>
                            <button
                                type="button"
                                className={
                                    index === activeIndex
                                        ? "vehicle-thumb vehicle-thumb--active"
                                        : "vehicle-thumb"
                                }
                                aria-label={`Фото ${index + 1}`}
                                aria-pressed={index === activeIndex}
                                onClick={() => setActiveIndex(index)}
                            >
                                <img src={src} alt="" />
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="vehicle-stage">
                    <img
                        src={activePhoto}
                        alt={car.title}
                    />
                </div>

                <div className="vehicle-info">
                    <p className="vehicle-info__description">{car.description}</p>
                    <dl className="vehicle-specs">
                        <div>
                            <dt>Марка</dt>
                            <dd>{car.brand}</dd>
                        </div>
                        <div>
                            <dt>Ціна</dt>
                            <dd>{car.price.toLocaleString("uk-UA")} $</dd>
                        </div>
                        <div>
                            <dt>Рейтинг</dt>
                            <dd>{car.rating}</dd>
                        </div>
                        <div>
                            <dt>Наявність</dt>
                            <dd>{car.availabilityStatus}</dd>
                        </div>
                        <div>
                            <dt>На складі</dt>
                            <dd>{car.stock}</dd>
                        </div>
                        <div>
                            <dt>Гарантія</dt>
                            <dd>{car.warrantyInformation}</dd>
                        </div>
                        <div>
                            <dt>Доставка</dt>
                            <dd>{car.shippingInformation}</dd>
                        </div>
                        <div>
                            <dt>Повернення</dt>
                            <dd>{car.returnPolicy}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
}
