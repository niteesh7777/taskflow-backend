export const userProfile = (req, res) => {
  const user = req.user;
  res.status(200).json({
    message: 'only user can access this profile details',
    id: user,
  });
};
export const adminProfile = (req, res) => {
  const user = req.user;
  res.status(200).json({
    message: 'only admin can access this profile details',
    id: user,
  });
};
