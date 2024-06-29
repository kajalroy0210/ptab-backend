import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService, emailService } from '../services';
import exclude from '../utils/exclude';
import { User } from '@prisma/client';

const register = catchAsync(async (req, res) => {
  const { email,
    name,
    password,
    role,
    isEmailVerified ,
    user_type,
    branch_name,
    membership_no,
    type_of_membership,
    form_no,
    name_of_the_firm,
    type_of_firm,
    address_of_the_firm,
    holding_no,
    street_name,
    post_office,
    district,
    ps,
    pin,
    dl_no,
    valid_upto,
    proprietor_or_partner,
    proprietor_contact_no,
    authorised_representative,
    representative_contact_no,
    recommended_by,
    designation,
    membership_status,
    approved_by,} = req.body;
  const user = await userService.createUser(email,
    name,
    password,
    role,
    isEmailVerified ,
    user_type,
    branch_name,
    membership_no,
    type_of_membership,
    form_no,
    name_of_the_firm,
    type_of_firm,
    address_of_the_firm,
    holding_no,
    street_name,
    post_office,
    district,
    ps,
    pin,
    dl_no,
    valid_upto,
    proprietor_or_partner,
    proprietor_contact_no,
    authorised_representative,
    representative_contact_no,
    recommended_by,
    designation,
    membership_status,
    approved_by);
  const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token as string, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const user = req.user as User;
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token as string);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};
