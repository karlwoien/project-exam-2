export function pageTitle(title) {
    const baseTitle = "Holidaze";
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;
};