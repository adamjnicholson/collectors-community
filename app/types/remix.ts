import { ActionFunction, LoaderFunction } from "remix";
import { z } from "zod";

import { NullableObject, Awaited } from "~/types/global";

export type ActionFormValidation<
    Schema extends z.AnyZodObject = z.ZodObject<
        Record<string, z.ZodType<string>>
    >
> = {
    formError?: string | null;
    fieldErrors: NullableObject<Partial<Schema["_output"]>>;
    fields: NullableObject<Schema["_output"]>;
};

export type TypedActionFunction<T = unknown> = (
    args: Parameters<ActionFunction>[0]
) => Promise<Response | T>;

export type ActionData<
    T extends TypedActionFunction,
    Returned = Awaited<ReturnType<T>>
> = Returned extends Response ? never : Returned;

export type TypedLoaderFunction<T = unknown> = (
    args: Parameters<LoaderFunction>[0]
) => Promise<Response | T>;

export type LoaderData<
    T extends TypedLoaderFunction,
    Returned = Awaited<ReturnType<T>>
> = Returned extends Response ? never : Returned;
