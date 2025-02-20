import * as yup from "yup";

const venueSchema = yup.object().shape({
    name: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    
    price: yup
        .number()
        .typeError("Price must be a number")
        .transform((value, originalValue) => (originalValue === "" ? undefined : value))
        .positive("Price must be a positive number")
        .integer("Price must be a whole number")
        .required("Price is required"),

    maxGuests: yup
        .number()
        .typeError("Max guests must be a number")
        .transform((value, originalValue) => (originalValue === "" ? undefined : value))
        .positive("Max guests must be a positive number")
        .integer("Max guests must be a whole number")
        .required("Max guests is required"),

    media: yup.array().of(
        yup.object().shape({
            url: yup.string()
                .url("Must be a valid URL")
                .optional()
                .nullable()
                .transform((value) => (value === "" ? undefined : value)),
            alt: yup.string().optional(),
        })
    ).optional(),

    location: yup.object().shape({
        address: yup.string().optional(),
        city: yup.string().optional(),
        zip: yup.string().optional(),
        country: yup.string().optional(),
    }).optional(),

    meta: yup.object().shape({
        wifi: yup.boolean().optional(),
        parking: yup.boolean().optional(),
        breakfast: yup.boolean().optional(),
        pets: yup.boolean().optional(),
    }).optional(),
});

export default venueSchema;