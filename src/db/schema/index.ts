import * as authSchema from "./auth";
import * as volunteersSchema from "./volunteers";
import * as areasSchema from "./areas";
import * as schedulesSchema from "./schedules";

export const schema = {
    ...authSchema,
    ...volunteersSchema,
    ...areasSchema,
    ...schedulesSchema,
};

