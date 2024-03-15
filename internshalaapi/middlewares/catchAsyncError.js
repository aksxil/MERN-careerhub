// exports.catchAsyncError = (func) =>(req,res,next)=>{
//     Promise.resolve(func(req,res,next)).catch(next);
// }

exports.catchAsyncError = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next))
      .catch((error) => {
        // Pass the error to the next middleware in the chain
        next(error);
      });
  };
  