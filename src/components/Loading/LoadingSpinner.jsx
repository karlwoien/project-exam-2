import React from "react";

export default function LoadingSpinner({ size = "w-10 h-10", color = "border-bg-primary" }) {
    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${size}`}></div>
        </div>
    );
}