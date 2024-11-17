export const globalErrorHandler = (err,req,res,next)=>{
    const code = err.statusCode || 500
    res.status(code).json({message:err.message,success:false, stack:err.stack})
}