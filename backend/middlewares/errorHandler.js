// central error handling middleware

const errorHandler = (err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({
        message: err.message || 'Internal Server Error',
        success: false
    });
};

export default errorHandler;