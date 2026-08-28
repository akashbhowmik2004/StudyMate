const requireAdmin = (req, res, next) => {
    if(!req.user || !req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: "You are not authorized to access this resource",
        });
    }
    next();
}
export default requireAdmin;