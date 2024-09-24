import validator from "validator";

export const validationAddress = (address) => {
  if (!address.firstName) {
    throw new Error("FirstName Is Required");
  }
  if (!address.lastName) {
    throw new Error("LastName Is Required");
  }
  if (!address.street) {
    throw new Error("Street Is Required");
  }
  if (!address.city) {
    throw new Error("City Is Required");
  }
  if (!address.state) {
    throw new Error("State Is Required");
  }
  if (!address.country) {
    throw new Error("Country Is Required");
  }
  if (!address.email) {
    throw new Error("Email Is Required");
  }
  if (!validator.isEmail(address.email)) {
    throw new Error("Invalid Email");
  }
};
