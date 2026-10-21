import "./Loader.css";

interface LoaderProps {
    size?: "small" | "medium" | "large";
}

export default function Loader({ size = "medium" }: LoaderProps) {
    return (
        <div className={`loader-wrapper loader-wrapper--${size}`}>
            <span className="spinner" aria-label="Завантаження"></span>
        </div>
    );
}
