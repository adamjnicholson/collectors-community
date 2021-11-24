export type Override<OriginalType, OverrideType> = Omit<
    OriginalType,
    keyof OverrideType
> &
    OverrideType;
