export const Utility = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return token;
};
