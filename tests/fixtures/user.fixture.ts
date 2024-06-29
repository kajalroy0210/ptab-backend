import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import prisma from '../../src/client';
import { Prisma, Role } from '@prisma/client';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);

export const userOne = {
  name: faker.name.fullName(),
  email: faker.internet.email().toLowerCase(),
  role: Role.USER,
  isEmailVerified: false,
  password,
  user_type: "Admin",
  branch_name: faker.name,
  membership_no: faker.phone,
  type_of_membership: "Life",
  form_no: faker.random,
  name_of_the_firm: faker.name,
  type_of_firm: "Retail",
  address_of_the_firm: faker.address,
  holding_no: faker.random,
  street_name: faker.name,
  post_office: faker.company,
  district: faker.name,
  ps: faker.name,
  pin: faker.random,
  dl_no: faker.random,
  valid_upto: faker.date,
  proprietor_or_partner: faker.name,
  proprietor_contact_no: faker.phone,
  authorised_representative: faker.name,
  representative_contact_no: faker.phone,
  recommended_by: faker.name,
  designation: faker.name,
  membership_status: "Approved",
  approved_by: faker.name
};

export const userTwo = {
  name: faker.name.fullName(),
  email: faker.internet.email().toLowerCase(),
  role: Role.BRANCH_ADMIN,
  isEmailVerified: false,
  password,
  user_type: "Admin",
  branch_name: faker.name,
  membership_no: faker.phone,
  type_of_membership: "Life",
  form_no: faker.random,
  name_of_the_firm: faker.name,
  type_of_firm: "Retail",
  address_of_the_firm: faker.address,
  holding_no: faker.random,
  street_name: faker.name,
  post_office: faker.company,
  district: faker.name,
  ps: faker.name,
  pin: faker.random,
  dl_no: faker.random,
  valid_upto: faker.date,
  proprietor_or_partner: faker.name,
  proprietor_contact_no: faker.phone,
  authorised_representative: faker.name,
  representative_contact_no: faker.phone,
  recommended_by: faker.name,
  designation: faker.name,
  membership_status: "Approved",
  approved_by: faker.name
};

export const admin = {
  name: faker.name.fullName(),
  email: faker.internet.email().toLowerCase(),
  role: Role.ADMIN,
  isEmailVerified: false,
  password,
  user_type: "Admin",
  branch_name: faker.name,
  membership_no: faker.phone,
  type_of_membership: "Life",
  form_no: faker.random,
  name_of_the_firm: faker.name,
  type_of_firm: "Retail",
  address_of_the_firm: faker.address,
  holding_no: faker.random,
  street_name: faker.name,
  post_office: faker.company,
  district: faker.name,
  ps: faker.name,
  pin: faker.random,
  dl_no: faker.random,
  valid_upto: faker.date,
  proprietor_or_partner: faker.name,
  proprietor_contact_no: faker.phone,
  authorised_representative: faker.name,
  representative_contact_no: faker.phone,
  recommended_by: faker.name,
  designation: faker.name,
  membership_status: "Approved",
  approved_by: faker.name
};

export const insertUsers = async (users: Prisma.UserCreateManyInput[]) => {
  await prisma.user.createMany({
    data: users.map((user) => ({ ...user, password: bcrypt.hashSync(user.password, salt) }))
  });
};
