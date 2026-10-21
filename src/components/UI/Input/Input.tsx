import React, { ChangeEvent, FocusEvent } from "react";
import { FieldError } from "react-hook-form";
import "./Input.css";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    name?: string;
    error?: FieldError;
    rows?: number;
    disabled?: boolean;
}

export default function Input({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    name,
    error,
    rows,
    disabled = false,
}: InputProps) {
    const fieldProps = {
        className: "input",
        id,
        name,
        placeholder,
        value,
        onChange,
        onBlur,
        disabled,
    };

    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            {rows ? (
                <textarea {...fieldProps} rows={rows} />
            ) : (
                <input {...fieldProps} type={type} />
            )}
            {error && <p className="form-error">{error.message}</p>}
        </div>
    );
}
