export const validateUser = (fields: Array<string>, body: object) => {
    let msg: string;

    for (let i = 0; i < fields.length; i++) {
        if (!body[fields[i]] || typeof body[fields[i]] !== "string") {
            msg = `${fields[i]} is required and must be a string`;
        }
    }

    return msg;
};
