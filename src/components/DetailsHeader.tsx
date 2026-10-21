import { Link } from "react-router-dom";

export default function DetailsHeader() {
    return (
        <header className="header header--details">
            <p className="logo">
                <Link to="/">CAR SHOWROOM</Link>
            </p>
        </header>
    );
}
