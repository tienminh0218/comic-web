import slugify from "slugify";

export const generateSlug = (
    str: string,
    options?: {
        replacement?: string;
        remove?: RegExp;
        lower?: boolean;
        strict?: boolean;
        locale?: string;
        trim?: boolean;
    }
): string => {
    return slugify(str, {
        replacement: "_",
        lower: true,
        ...options,
    });
};
