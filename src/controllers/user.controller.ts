import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { userService } from '../services';

const createUser = catchAsync(async (req, res) => {
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
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
