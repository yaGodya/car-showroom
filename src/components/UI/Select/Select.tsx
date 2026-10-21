import { useEffect, useId, useRef, useState } from "react";
import "./Select.css";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
}

export default function Select({
    id,
    label,
    value,
    onChange,
    options,
    placeholder = "Усі",
    disabled = false,
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const listId = useId();
    const selected = options.find((option) => option.value === value);

    useEffect(() => {
        function closeOnOutside(event: PointerEvent) {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        function closeOnEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setOpen(false);
        }

        document.addEventListener("pointerdown", closeOnOutside);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutside);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, []);

    function choose(nextValue: string) {
        onChange(nextValue);
        setOpen(false);
    }

    const items: SelectOption[] = [{ value: "", label: placeholder }, ...options];

    return (
        <div className={open ? "select select--open" : "select"} ref={rootRef}>
            <label className="select__label" htmlFor={id}>
                {label}
            </label>

            <button
                id={id}
                type="button"
                className="select__trigger"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                disabled={disabled}
                onClick={() => setOpen((current) => !current)}
            >
                <span>{selected?.label ?? placeholder}</span>
                <span className="select__chevron" aria-hidden="true" />
            </button>

            <div className="select__list" aria-hidden={!open}>
                <ul id={listId} className="select__list-inner" role="listbox">
                    {items.map((option) => {
                        const isSelected = option.value === value;
                        return (
                            <li key={option.value || "all"} role="presentation">
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    tabIndex={open ? 0 : -1}
                                    className={
                                        isSelected
                                            ? "select__option select__option--selected"
                                            : "select__option"
                                    }
                                    onClick={() => choose(option.value)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
