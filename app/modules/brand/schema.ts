import { z } from "zod";

export const brandNameSchema = z
    .string({
        required_error: "Brand name is required",
        invalid_type_error: "Brand name must only contain letters",
    })
    .min(3, {
        message: "Brand names must be atleast 3 characters long",
    });

export const brandSlugSchema = z
    .string({
        required_error: "A slug is required",
        invalid_type_error: "A slug must only contain letters",
    })
    .min(3, {
        message: "A slug must be atleast 3 characters long",
    });

export const brandUuidSchema = z
    .string({
        required_error: "Form not submitted correctly",
        invalid_type_error: "Form not submitted correctly",
    })
    .min(1, {
        message: "Form not submitted correctly",
    });
