export default function AmenitiesText({ meta }) {
    if (!meta) return <p className="text-gray-500 italic">No amenities listed</p>;

    const amenities = [];
    if (meta.wifi) amenities.push("WiFi");
    if (meta.parking) amenities.push("Parking");
    if (meta.breakfast) amenities.push("Breakfast");
    if (meta.pets) amenities.push("Pets");

    return <p className="italic text-gray-500">{amenities.length > 0 ? amenities.join(", ") : "No amenities listed"}</p>;
}