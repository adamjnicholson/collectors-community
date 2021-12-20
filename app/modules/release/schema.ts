import { z } from "zod";

export const releaseNameSchema = z
    .string({
        required_error: "Release name is required",
        invalid_type_error: "Release name must only contain letters",
    })
    .min(3, {
        message: "Release names must be atleast 3 characters long",
    });

export const releaseSlugSchema = z
    .string({
        required_error: "A slug is required",
        invalid_type_error: "A slug must only contain letters",
    })
    .min(3, {
        message: "A slug must be atleast 3 characters long",
    });

export const releaseUuidSchema = z
    .string({
        required_error: "Form not submitted correctly",
        invalid_type_error: "Form not submitted correctly",
    })
    .min(1, {
        message: "Form not submitted correctly",
    });

export const releaseItemCountSchema = z
    .number({
        required_error: "Must be a number",
        invalid_type_error: "Must be a number",
    })
    .min(1, {
        message: "Must be a number greater than zero",
    });

export const releaseBrandUuidSchema = z
    .string({
        required_error: "A release must be linked with a brand",
        invalid_type_error: "A release must link to an existing brand",
    })
    .min(1, {
        message: "A release must link to an existing brand",
    });
