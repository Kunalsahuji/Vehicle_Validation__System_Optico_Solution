const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log("User Role:", req.user.role);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied: Insufficient permissions" });
        }
        next();
    }
}
module.exports = authorizeRoles;