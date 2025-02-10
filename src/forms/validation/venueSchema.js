import * as yup from "yup";

const venueSchema = yup.object().shape({
    name: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().positive().integer().required("Price is required"),
    maxGuests: yup.number().positive().integer().required("Max guests is required"),
    media: yup.array().of(
        yup.object().shape({
            url: yup.string().url("Must be a valid URL").required("Media URL is required"),
            alt: yup.string().optional(),
        })
    ),
    location: yup.object().shape({
        address: yup.string().optional(),
        city: yup.string().optional(),
        zip: yup.string().optional(),
        country: yup.string().optional(),
    }),
    meta: yup.object().shape({
        wifi: yup.boolean(),
        parking: yup.boolean(),
        breakfast: yup.boolean(),
        pets: yup.boolean(),
    }),
});

export default venueSchema;