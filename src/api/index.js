import {
  InstagramTaskTypes,
  UserViewPath,
  UserLoginPath,
  CreateUserPath,
  BotDeletePAth,
  faqPath,
  CreateAccountPath,
  BotIndexPath,
  TaskCreatePath,
  AccountPatchPath,
  AccountShowPath,
  snapshotPath,
} from "./endpoints";

// ----------- Start User

export const CreateUserPost = async (userInfo) => {
  const response = await fetch(CreateUserPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  return await response.json();
};

export const loginFetch = async (userInfo) => {
  const resp = await fetch(UserLoginPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const resp_1 = await resp.json();
  if (resp_1.error) {
    alert(resp_1.error);
  } else {
    localStorage.setItem("user", JSON.stringify(resp_1.user));
    localStorage.setItem("token", resp_1.jwt);
    window.location.replace("/");
  }
};

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.replace("/");
};

export const GetUserInfo = async () => {
  const response = await fetch(UserViewPath + localStorage.getItem("user"));
  return await response.json();
};

// END USER

// -------------- START ACCOUNTs

export const CreateBot = async (formData) => {
  const response = await fetch(
    CreateAccountPath[0] + localStorage.getItem("user") + CreateAccountPath[1],
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    }
  );
  return await response.json();
};

export const PatchAccount = async (formData, account_id) => {
  const response = await fetch(AccountPatchPath + account_id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

export const indexAccounts = async () => {
  const response = await fetch(BotIndexPath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await response.json();
};

export const ShowAccount = async (id) => {
  const response = await fetch(AccountShowPath + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await response.json();
};

export const DeleteBot = async () => {
  const response = await fetch(BotDeletePAth);
  return await response.json();
};

// END ACCOUNTS

// ---------------------- START TASKS

export const PostTask = async (formData) => {
  console.log(JSON.stringify(formData));
  const response = await fetch(TaskCreatePath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

// END TASKS

// ---------- START SNAPSHOTS

export const getSnapshots = async () => {
  const response = await fetch(snapshotPath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await response.json();
};

// END SNAPSHOTS

// --------- Static APIs

export const GetFAQs = async () => {
  const response = await fetch(faqPath);
  return await response.json();
};

export const FetchInstagramTaskTypes = async () => {
  const response = await fetch(InstagramTaskTypes);
  return await response.json();
};

// END STATIC
