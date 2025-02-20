import { useEffect } from "react";
import { pageTitle } from "../utils/pageTitle";

export function useTitle(title) {
    useEffect(() => {
        pageTitle(title);
    }, [title]);
};