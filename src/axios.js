import axios from "axios";

axios.defaults.baseURL =
  "http://103.171.85.200:2004/admin/";

(axios.defaults.headers.common["Content-Type"] = "application/json"),
  (axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token", true));
