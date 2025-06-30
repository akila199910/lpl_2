export const successResponse = (message, data = null) => ({
    success: true,
    message,
    data
});

export const errorResponse = (message,errors = null) => ({
    success: false,
    message,
    errors
});
