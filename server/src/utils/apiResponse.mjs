export const successResponse = (message, data = null) => ({
    success: true,
    message,
    data
});

export const errorResponse = (message) => ({
    success: false,
    message,
    data: null
});
