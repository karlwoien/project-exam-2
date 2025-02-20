export default function NotificationMessage({ type = "success", message }) {
    if (!message) return null; // Skjuler komponenten hvis det ikke er melding

    const baseClasses = "p-3 rounded-lg text-center mt-4";
    const typeClasses =
        type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

    return <div className={`${baseClasses} ${typeClasses}`}>{message}</div>;
}