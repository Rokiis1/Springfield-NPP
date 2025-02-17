//  All erros need to put in front
// Libraries
import axiosClient from "../api/apiUsers";
import swal from "sweetalert";

// GET method allUsers
export async function getAllUsersData() {
  const res = await axiosClient.get("/");
  return res;
}
// GET user by ID
export async function getUserById(id) {
  const res = await axiosClient.get(`/${id}`);
  return res;
}

// GET method all balance
export async function getBalance(id) {
  const res = await axiosClient.get(`/${id}/expenses/balance`);
  return res;
}

// find user By email
export async function getUsersByEmail(email) {
  console.log(email);
  const res = await axiosClient.post(`/userByEmail`, JSON.stringify(email));
  return res;
}

// update user by id
export async function updateUserById(data) {
  const res = await axiosClient
    .post(`/updateUser`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Įrašas išsaugotas!",
        button: "Gerai",
        icon: "success",
        timer: 1500,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 1500,
      });
    });

  return res;
}

// UPDATE user data income
export async function findIncomeDataAndUpdate(data, id, subID) {
  const res = await axiosClient
    .patch(`/${id}/income/${subID}`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Įrašas išsaugotas!",
        button: "Gerai",
        icon: "success",
        timer: 1500,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 1500,
      });
    });

  return res;
}

// UPDATE user data expenses
export async function findExpensesDataAndUpdate(data, id, subID) {
  const res = await axiosClient
    .patch(`/${id}/expenses/${subID}`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
        button: "Gerai",
        timer: 500,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 1500,
      });
    });
  return res;
}

// ADD user Income
export async function createUserIncome(data, id) {
  const res = await axiosClient
    .patch(`/${id}/income/`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Įrašas išsaugotas!",
        button: "Gerai",
        icon: "success",
        timer: 1500,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 1500,
      });
    });
  return res;
}

// ADD user Expenes
export async function createUserExpenses(data, id) {
  const res = await axiosClient
    .patch(`/${id}/expenses/`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Įrašas išsaugotas!",
        button: "Gerai",
        icon: "success",
        timer: 1500,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 1500,
      });
    });
  return res;
}

// delete USer by Id
export async function deleteUserById(id) {
  const res = await axiosClient.delete(`/deleteUser/${id}`);
  return res;
}
// Delete expenses
export async function deleteUserExpenses(id, subID) {
  const res = await axiosClient.patch(`/${id}/expenses/delete/${subID}`);
  return res;
}
// Delete incomes
export async function deleteUserIncome(id, subID) {
  const res = await axiosClient.patch(`/${id}/income/delete/${subID}`);
  return res;
}

// Register
export async function createUser(data) {
  const res = await axiosClient
    .post("/register", JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Registracija sėkmingai, dabar galite prisijungti",
        icon: "success",
        button: "Puiku",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Toks vartotojas jau egzistuoja",
        icon: "error",
        button: "Gerai",
        timer: 5000,
      });
    });
  return res;
}

// Login
export async function loginUser(data) {
  let response;
  const res = await axiosClient
    .post("/login", JSON.stringify(data))
    .then((result) => {
      response = result;
      swal({
        text: "Pavyko prisijungti!",
        icon: "success",
        button: "Puiku",
        timer: 5000,
      });
    })
    .catch((error) => {
      swal({
        text: "Neteisingai suvestas vartotojo vardas arba slaptažodis",
        icon: "error",
        button: "Gerai",
        timer: 1500,
      });
    });

  return response;
}

// find email
export async function getUserEmail(email) {
  const res = await axiosClient.post(`/email?email=${email}`);
  return res.data.data.users;
}

// Get user expenses by current month
export async function getUserExpensesByMonth(id) {
  const res = await axiosClient.post(`/${id}/expenses/current/month`);
  return res;
}

// Get user income by current month
export async function getUserIncomeByMonth(id) {
  const res = await axiosClient.post(`/${id}/income/current/month`);
  return res;
}

// Get user balance by current month
export async function getUserBalanceByMonth(id) {
  const res = await axiosClient.post(`/${id}/balance/current/month`);
  return res;
}

// Get all years income
export async function getAllUserIncomeByMonth(id) {
  const res = await axiosClient.get(`/${id}/income/month`);
  return res;
}

// Get all years expense
export async function getAllUserExpensesByMonth(id) {
  const res = await axiosClient.get(`/${id}/expenses/month`);
  return res;
}

// Create log
export async function addLog(data) {
  const res = await axiosClient.post(`/add/log`, JSON.stringify(data));
  return res;
}

// Get logs
export async function getLogs() {
  const res = await axiosClient.get("/logs");
  return res;
}

// Create category
export async function addCategory(data) {
  const res = await axiosClient
    .post(`/add/category`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Pridėti!",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    });
  return res;
}

// Get category
export async function getCategory() {
  const res = await axiosClient.get("/category");
  return res;
}

export async function deleteCategory(id) {
  const res = await axiosClient.get(`/category/delete/${id}`);
  return res;
}

export async function updateCategory(id, data) {
  const res = await axiosClient
    .patch(`/category/update/${id}`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Atnaujinta!",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });

  return res;
}
