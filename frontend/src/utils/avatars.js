export const getRandomAvatar = (username = "user", gender = "male") => {
  const style = gender === "female" ? "avataaars" : "micah";
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${username}`;
};
