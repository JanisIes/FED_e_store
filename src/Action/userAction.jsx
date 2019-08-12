import axios from "axios";

const registerUser = async user => {
  const res = await axios.post("/user/", user);
  if(res.headers && res.headers.status === 200) {
      console.log("success");
  }
};

export default registerUser;
