import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { addComment } from "../features/comments/commentsSlice";
import Input from "./UI/Input/Input";
import { AppDispatch } from "../app/store";

const reviewSchema = z.object({
    reviewerName: z
        .string()
        .trim()
        .min(1, "Вкажіть ім’я")
        .max(60, "Не більше 60 символів"),
    comment: z
        .string()
        .trim()
        .min(1, "Напишіть коментар")
        .max(500, "Не більше 500 символів"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
    vehicleId: string;
}

export default function ReviewForm({ vehicleId }: ReviewFormProps) {
    const dispatch = useDispatch<AppDispatch>();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: { reviewerName: "", comment: "" },
    });

    return (
        <form
            className="review-form"
            onSubmit={handleSubmit((values) => {
                dispatch(
                    addComment({
                        vehicleId,
                        comment: {
                            id: crypto.randomUUID(),
                            reviewerName: values.reviewerName,
                            comment: values.comment,
                            date: new Date().toISOString(),
                        },
                    }),
                );
                reset();
            })}
        >
            <Controller
                name="reviewerName"
                control={control}
                render={({ field }) => (
                    <Input
                        id="reviewerName"
                        label="Ім’я"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.reviewerName}
                    />
                )}
            />

            <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                    <Input
                        id="comment"
                        label="Коментар"
                        rows={4}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.comment}
                    />
                )}
            />

            <button type="submit">Надіслати</button>
        </form>
    );
}
