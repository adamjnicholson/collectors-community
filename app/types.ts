export type Override<OriginalType, OverrideType> = Omit<
    OriginalType,
    keyof OverrideType
> &
    OverrideType;

export type GetActionData<FormInputName extends string> = {
    formError?: string;
    fieldErrors: Partial<Record<FormInputName, string | null>>;
    fields: Partial<Record<FormInputName, string | null>>;
};
