import { Review } from "../types/types";

function avatarFor(review: Review): string {
    const key = `${review.id ?? review.reviewerName}-${review.date}`;
    let hash = 0;
    for (let index = 0; index < key.length; index += 1) {
        hash = (hash + key.charCodeAt(index) * (index + 1)) % 4;
    }
    const colors = ["#2563eb", "#059669", "#d97706", "#dc2626"];
    const initial = (review.reviewerName[0] || "U").toUpperCase();
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44"><circle cx="22" cy="22" r="22" fill="${encodeURIComponent(colors[hash])}"/><text x="50%" y="54%" font-size="18" font-family="sans-serif" font-weight="bold" fill="white" dominant-baseline="middle" text-anchor="middle">${initial}</text></svg>`;
}

function formatReviewDate(iso: string): string {
    const date = new Date(iso);
    const days = Math.round((Date.now() - date.getTime()) / 86400000);

    if (days < 1) return "сьогодні";
    if (days < 30) return `${days} дн. тому`;

    const months = Math.round(days / 30);
    if (months < 12) return `${months} міс. тому`;

    const years = Math.round(days / 365);
    return years === 1 ? "1 рік тому" : `${years} р. тому`;
}

interface ReviewListProps {
    reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
    return (
        <section className="reviews">
            {reviews.length === 0 ? (
                <p>Коментарів ще немає</p>
            ) : (
                <ul className="review-list">
                    {reviews.map((review) => (
                        <li
                            className="review"
                            key={review.id ?? `${review.reviewerName}-${review.date}`}
                        >
                            <img
                                className="review__avatar"
                                src={avatarFor(review)}
                                alt=""
                            />
                            <div>
                                <div className="review__head">
                                    <p className="review__author">
                                        {review.reviewerName}
                                    </p>
                                    <time dateTime={review.date}>
                                        {formatReviewDate(review.date)}
                                    </time>
                                </div>
                                <p className="review__text">{review.comment}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
