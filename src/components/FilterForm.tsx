import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "./UI/Input/Input";
import Select from "./UI/Select/Select";
import Range from "./UI/Range/Range";
import { FilterState } from "../types/types";

const filterSchema = z.object({
    query: z.string().max(80, "Не більше 80 символів"),
    brand: z.string(),
    maxPrice: z.string(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

interface FilterFormProps {
    brands: string[];
    priceMin: number;
    priceMax: number;
    onApply: (filters: FilterState) => void;
    onReset: () => void;
    isLoading: boolean;
}

export default function FilterForm({
    brands,
    priceMin,
    priceMax,
    onApply,
    onReset,
    isLoading,
}: FilterFormProps) {
    const emptyFilters: FilterFormValues = {
        query: "",
        brand: "",
        maxPrice: String(priceMax),
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FilterFormValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: emptyFilters,
    });

    return (
        <form
            className={`filters filters--bar ${isLoading ? "filters--disabled" : ""}`}
            onSubmit={handleSubmit(onApply)}
        >
            <Controller
                name="query"
                control={control}
                render={({ field }) => (
                    <Input
                        id="query"
                        type="search"
                        label="Пошук"
                        placeholder="Назва, марка або опис"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={errors.query}
                        disabled={isLoading}
                    />
                )}
            />

            <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                    <Select
                        id="brand"
                        label="Марка"
                        value={field.value}
                        onChange={field.onChange}
                        options={brands.map((brand) => ({
                            value: brand,
                            label: brand,
                        }))}
                        disabled={isLoading}
                    />
                )}
            />

            <Controller
                name="maxPrice"
                control={control}
                render={({ field }) => (
                    <Range
                        id="maxPrice"
                        label="Ціна до"
                        min={priceMin}
                        max={priceMax}
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                    />
                )}
            />

            <div className="form-actions">
                <button type="submit" disabled={isLoading}>
                    Знайти
                </button>
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                        reset(emptyFilters);
                        onReset();
                    }}
                >
                    Скинути
                </button>
            </div>
        </form>
    );
}
