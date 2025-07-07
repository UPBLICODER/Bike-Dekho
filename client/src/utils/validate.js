export const checkValidData = (email, password, name = null) => {
  if (name !== null && name.trim().length < 3) return "Name must be at least 3 characters.";

  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Invalid email address.";
  if (!isPasswordValid) return "Password must be 8+ chars with uppercase, lowercase, and number.";

  return null;
};
