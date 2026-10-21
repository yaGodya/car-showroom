import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetVehicleQuery } from "../api/vehiclesApi";
import { selectCommentsByVehicleId } from "../features/comments/commentsSlice";
import DetailsHeader from "../components/DetailsHeader";
import VehicleDetails from "../components/VehicleDetails";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";
import Loader from "../components/UI/Loader/Loader";
import { RootState } from "../app/store";

export default function VehiclePage() {
    const { vehicleId } = useParams<{ vehicleId: string }>();
    const { data: car, isLoading, isError } = useGetVehicleQuery(vehicleId);
    const localComments = useSelector((state: RootState) =>
        selectCommentsByVehicleId(state, vehicleId),
    );

    if (isLoading) {
        return (
            <article className="vehicle-page">
                <DetailsHeader />
                <Loader />
            </article>
        );
    }

    if (isError || !car || car.category !== "vehicle") {
        return (
            <article className="vehicle-page">
                <DetailsHeader />
                <p className="status">Автомобіль не знайдено</p>
            </article>
        );
    }

    const reviews = [...(car.reviews ?? []), ...localComments];

    return (
        <article className="vehicle-page">
            <DetailsHeader />
            <Link className="back-link" to="/">
                Назад
            </Link>
            <VehicleDetails key={car.id} car={car} />

            <div className="vehicle-feedback">
                <div className="reviews-column">
                    <h2 className="section-title">Коментарі</h2>
                    <ReviewList reviews={reviews} />
                </div>

                <div className="form-column">
                    <h2 className="section-title">Додати коментар</h2>
                    <ReviewForm vehicleId={String(vehicleId)} />
                </div>
            </div>
        </article>
    );
}
