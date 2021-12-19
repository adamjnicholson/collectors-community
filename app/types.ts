import { AnyZodObject } from "zod";

export type Override<OriginalType, OverrideType> = Omit<
    OriginalType,
    keyof OverrideType
> &
    OverrideType;

export type Nullable<T> = T | null;
export type NullableObject<T extends Record<string, unknown>> = {
    [Key in keyof T]: Nullable<T[Key]>;
};

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type GetActionData<Schema extends AnyZodObject = AnyZodObject> = {
    formError?: string;
    fieldErrors: NullableObject<Partial<Schema["_output"]>>;
    fields: NullableObject<Schema["_output"]>;
};
