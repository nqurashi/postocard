import { toast } from "react-toastify";
import { server } from "../../Setting/GlobalVariable";
import {
  ACTIVE_DEACTIVE_USER_ERROR,
  ACTIVE_DEACTIVE_USER_FAIL,
  ACTIVE_DEACTIVE_USER_REQUEST,
  ACTIVE_DEACTIVE_USER_SUCCESS,
  ANALYTICS_USER_ERROR,
  ANALYTICS_USER_FAIL,
  ANALYTICS_USER_REQUEST,
  ANALYTICS_USER_SUCCESS,
  CREATE_ADDRESS_ERROR,
  CREATE_ADDRESS_FAIL,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_ERROR,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  GET_ADDRESS_ERROR,
  GET_ADDRESS_FAIL,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADMIN_ALL_ERROR,
  GET_ADMIN_ALL_FAIL,
  GET_ADMIN_ALL_REQUEST,
  GET_ADMIN_ALL_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  PACKAGE_CREATE_ERROR,
  PACKAGE_CREATE_FAIL,
  PACKAGE_CREATE_REQUEST,
  PACKAGE_CREATE_SUCCESS,
  PASSWORD_UPDATE_ERROR,
  PASSWORD_UPDATE_FAIL,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  REGISTRATION_USER_ERROR,
  REGISTRATION_USER_FAIL,
  REGISTRATION_USER_REQUEST,
  REGISTRATION_USER_SUCCESS,
  UPDATE_ADDRESS_ERROR,
  UPDATE_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  VALID_USER_ERROR,
  VALID_USER_FAIL,
  VALID_USER_REQUEST,
  VALID_USER_SUCCESS,
} from "../Variables/UserVariables";
import Cookies from "js-cookie";
// ================= login
export const UserLoginAction =
  (email, password, navigate, checkbox) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_USER_REQUEST });
      const res = await fetch(`${server}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      dispatch({ type: LOGIN_USER_FAIL });
      const data = await res.json();
      if (!data || res.status === 401) {
        return toast.error(data.message);
      } else if (res.status === 500) {
        toast.error("Internal Server Error");
        //   return toast.error(data.message);
      } else {
        toast.success(data.message);
        Cookies.set("ApiLoginToken", data.token, {
          expires: checkbox ? 7 : window.close(),
        });
        if (data?.user?.IsAdmin === 0) {
          navigate("/");
        } else {
          navigate("/admin/dashboard");
        }
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
      }
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR, payload: error.message });
    }
  };

// ========== login user

export const LogedinUser = () => async (dispatch) => {
  try {
    dispatch({ type: VALID_USER_REQUEST });
    const res = await fetch(`${server}/user`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: VALID_USER_FAIL });
    const data = await res.json();
    console.log(data);
    if (!data || res.status === 400) {
      return console.log(data.message);
    } else if (res.status === 500) {
      alert("Internal Server Error");
      return console.log(data.message);
    } else {
      // alert(data.name)
      dispatch({ type: VALID_USER_SUCCESS, payload: data.user });
    }
  } catch (error) {
    dispatch({ type: VALID_USER_ERROR, payload: error.message });
  }
};

// ==== userRegistration

export const userRegistration =
  (name, email, password, navigate) => async (dispatch) => {
    try {
      dispatch({ type: REGISTRATION_USER_REQUEST });
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      // formData.append("image", imagedata);
      formData.append("name", name);
      const res = await fetch(`${server}/register`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
        },
        body: formData,
      });
      dispatch({ type: REGISTRATION_USER_FAIL });
      const data = await res.json();
      console.log(data);
      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else if (res.status === 500) {
        alert("Internal Server Error");
        return toast.error("Internal Server Error");
      } else {
        // alert(data.name)
        dispatch({ type: REGISTRATION_USER_SUCCESS });
        navigate("/user/login");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
      dispatch({ type: REGISTRATION_USER_ERROR, payload: error.message });
    }
  };

//   ====== logout

export const LOGOUTUSER = (navigate) => (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });
  Cookies.remove("ApiLoginToken");
  navigate("/");
  toast.success("Logout Successfully");
  dispatch({ type: LOGIN_USER_SUCCESS });
};

// ---------------- create address
export const CreateAddress = (Addressdata) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ADDRESS_REQUEST });

    const res = await fetch(`${server}/user-address/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(Addressdata),
    });
    dispatch({ type: CREATE_ADDRESS_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: CREATE_ADDRESS_ERROR });
  }
};

// ------ get user address
export const getuseraddress = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADDRESS_REQUEST });

    const res = await fetch(`${server}/user/addresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_ADDRESS_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return;
    } else {
      // toast.success(data.message);
      dispatch({ type: GET_ADDRESS_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: GET_ADDRESS_ERROR });
  }
};

// -------- update user adddress
export const updateuseraddress = (Addressdata, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
    console.log(id);
    const res = await fetch(`${server}/user-address/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(Addressdata),
    });
    dispatch({ type: UPDATE_ADDRESS_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: UPDATE_ADDRESS_ERROR });
  }
};

// ------ delete user address
export const deleteAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADDRESS_REQUEST });

    const res = await fetch(`${server}/user-address/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: DELETE_ADDRESS_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: DELETE_ADDRESS_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: DELETE_ADDRESS_ERROR });
  }
};

// ====== get admin all users
export const AdminAllUsersFunc = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_ALL_REQUEST });

    const res = await fetch(`${server}/admin/user-list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: GET_ADMIN_ALL_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return;
    } else {
      dispatch({ type: GET_ADMIN_ALL_SUCCESS, payload: data.userList });
    }
  } catch (error) {
    dispatch({ type: GET_ADMIN_ALL_ERROR });
  }
};

// ====== ACTIVE OR DEACTIVE user
export const ActiveOrDeactiveUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACTIVE_DEACTIVE_USER_REQUEST });

    const res = await fetch(`${server}/admin/users/${id}/toggleactivation`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: ACTIVE_DEACTIVE_USER_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      dispatch({ type: ACTIVE_DEACTIVE_USER_SUCCESS });
      toast.success(data.message);
    }
  } catch (error) {
    dispatch({ type: ACTIVE_DEACTIVE_USER_ERROR });
  }
};

// =========== User Analytics
export const UserAnalytics = () => async (dispatch) => {
  try {
    dispatch({ type: ANALYTICS_USER_REQUEST });

    const res = await fetch(`${server}/admin/user-spending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
    });
    dispatch({ type: ANALYTICS_USER_FAIL });
    const data = await res.json();
    if (!data || res.status === 400) {
      return;
    } else {
      dispatch({ type: ANALYTICS_USER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: ANALYTICS_USER_ERROR });
  }
};

// ====== update user password
export const UpdateUserPassword =
  (old_password, new_password) => async (dispatch) => {
    try {
      dispatch({ type: PASSWORD_UPDATE_REQUEST });
      console.log("ok");
      const res = await fetch(`${server}/user/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
        body: JSON.stringify({ old_password, new_password }),
      });
      dispatch({ type: PASSWORD_UPDATE_FAIL });
      const data = await res.json();
      console.log(data);
      if (!data || res.status === 400) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch({ type: PASSWORD_UPDATE_SUCCESS });
      }
    } catch (error) {
      dispatch({ type: PASSWORD_UPDATE_ERROR });
    }
  };

// =========== update user email and name
export const ProfileUpdatte = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });
    console.log("ok");
    const res = await fetch(`${server}/user/update-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify({ name, email }),
    });
    dispatch({ type: PROFILE_UPDATE_FAIL });
    const data = await res.json();
    console.log(data);
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: PROFILE_UPDATE_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: PROFILE_UPDATE_ERROR });
  }
};

// ========= create Package =================================
export const PackgaeCreateFunc = (packageData) => async (dispatch) => {
  try {
    dispatch({ type: PACKAGE_CREATE_REQUEST });
    const res = await fetch(`${server}/admin/packages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(packageData),
    });
    dispatch({ type: PACKAGE_CREATE_FAIL });
    const data = await res.json();
    console.log(data);
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: PACKAGE_CREATE_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: PACKAGE_CREATE_ERROR });
  }
};



export const editPackagefunction = (packageData, id) => async (dispatch) => {
  try {
    dispatch({ type: PACKAGE_CREATE_REQUEST });
    const res = await fetch(`${server}/admin/packages/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
      },
      body: JSON.stringify(packageData),
    });
    dispatch({ type: PACKAGE_CREATE_FAIL });
    const data = await res.json();
    console.log(data);
    if (!data || res.status === 400) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      dispatch({ type: PACKAGE_CREATE_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: PACKAGE_CREATE_ERROR });
  }
};