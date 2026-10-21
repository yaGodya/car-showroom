import React, { ChangeEvent } from "react";
import "./Range.css";

interface RangeProps {
    id: string;
    label: string;
    min: number;
    max: number;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export default function Range({
    id,
    label,
    min,
    max,
    value,
    onChange,
    disabled = false,
}: RangeProps) {
    return (
        <div className="range">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step="1"
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            <p className="range__value">до {Number(value).toLocaleString("uk-UA")} $</p>
        </div>
    );
}
