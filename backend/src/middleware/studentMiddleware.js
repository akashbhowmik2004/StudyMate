const requireStudent = (req, res, next) => {
    if (req.user.isAdmin === true) {
        return res.status(403).json({
            success: false,
            message: "Admins cannot access student routes"
        });
    }

    next();
};
export default requireStudent;