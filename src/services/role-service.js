import axios from "axios";

const apiURL = "http://localhost:3005/role/";

const getRoles = async () => {
  try {
    const roles = await axios.get(apiURL);
    return roles.data;
  } catch (error) {
    console.log("ERROR:", error);
  }
};

export const roleService = {
  getRoles,
};
