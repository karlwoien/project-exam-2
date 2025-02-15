import React from "react";

export default function Search({ onSearch }) {
    const handleInputChange = (event) => {
        const value = event.target.value.trim();
        onSearch(value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search venues..."
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-bg-highlight focus:border-transparent"
            />
        </div>
    );
};