import { z } from "zod";

export const validateForm = <
    Fields extends Record<string, string | number | boolean | null | undefined>,
    Schema extends z.ZodObject<{
        [Key in keyof Fields]: z.ZodType<NonNullable<Fields[Key]>>;
    }>
>(
    fields: Fields,
    schema: Schema
) => {
    const result = schema.safeParse(fields);

    if (!result.success) {
        return {
            success: result.success,
            fields,
            fieldErrors: result.error.issues.reduce(
                (fieldErrors, error) => ({
                    ...fieldErrors,
                    [error.path[0]]: error.message,
                }),
                fields
            ),
        };
    }

    return {
        success: result.success,
        fields: result.data,
        fieldErrors: fields,
    };
};
