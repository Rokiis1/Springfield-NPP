const Users = require("./../models/userModel");

// GET method all user data
exports.getAllUsersData = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Get user by id
exports.getUserById = async (req, res) => {
  try {
    const users = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Update User by Id
exports.updateUserById = async (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  try {
    await Users.findByIdAndUpdate(req.body.id, req.body);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// get user BY email
exports.getUsersByEmail = async (req, res) => {
  try {
    const user = await Users.find({ email: req.body.email });

    res.status(200).json({
      status: "success",
      results: user.length,
      data: {
        users: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Update Income array
exports.findIncomeDataAndUpdate = async (req, res) => {
  try {
    const updateIncome = await Users.findOneAndUpdate(
      { _id: req.params.id, "income._id": req.params.subID },
      {
        $set: {
          "income.$.date": req.body.date,
          "income.$.category": req.body.category,
          "income.$.amount": req.body.amount,
          "income.$.name": req.body.name,
        },
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        users: updateIncome,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Update Expenses array
exports.findExpensesDataAndUpdate = async (req, res) => {
  try {
    const updateExpenses = await Users.findOneAndUpdate(
      { _id: req.params.id, "expenses._id": req.params.subID },
      {
        $set: {
          "expenses.$.name": req.body.name,
          "expenses.$.date": req.body.date,
          "expenses.$.category": req.body.category,
          "expenses.$.amount": req.body.amount,
        },
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        users: updateExpenses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Add user income
exports.createUserIncome = async (req, res) => {
  try {
    const updated = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { income: req.body } },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        income: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Create a new expense (/:id/expenses)
exports.createUserExpenses = async (req, res) => {
  try {
    const updated = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { expenses: req.body } },
      {
        new: true,
      }
    );
    // console.log(updated);
    res.status(200).json({
      status: "success",
      data: {
        expenses: updated,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// DELETE method user array
exports.deleteUserIncome = async (req, res) => {
  try {
    const deleteIncome = await Users.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        income: deleteIncome,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// DELETE method user array

// ("/:id/expenses/delete/:subID")
exports.deleteUserExpenses = async (req, res) => {
  try {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { expenses: { _id: req.params.subID } } }
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// ("/:id/income/delete/:subID")
exports.deleteUserIncome = async (req, res) => {
  try {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { income: { _id: req.params.subID } } }
    );
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Get user expenses by current month
exports.getUserExpensesByMonth = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { expenses } = users[0];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const filteredYear = expenses.filter(
      (expItem) => expItem.date.getFullYear() === currentYear
    );

    const filteredMonth = filteredYear.filter(
      (item) => item.date.getMonth() === currentMonth
    );

    const filteredExpensesC = filteredMonth.filter(
      (expensesC) => expensesC.category
    );

    const allExpensesCurrentMonth = filteredMonth.reduce(
      (n, { amount }) => n + amount,
      0
    );

    const expense = filteredExpensesC;

    let mig = 0;
    let apsi = 0;
    let nam = 0;
    let trans = 0;
    let car = 0;
    let fun = 0;
    let pc = 0;
    let finans = 0;
    let stonk = 0;
    let kita = 0;

    const allCategorySum = {
      maistas: mig,
      apsipirkimai: apsi,
      namams: nam,
      transportas: trans,
      masina: car,
      gyvenimas: fun,
      pc,
      finansines: finans,
      investavimas: stonk,
      kita,
    };

    expense.forEach((item) => {
      if (item.category == "Namams") {
        nam += item.amount;
      } else if (item.category == "Transportas") {
        trans += item.amount;
      } else if (item.category == "Mašina") {
        car += item.amount;
      } else if (item.category == "Maistas ir gėrimai") {
        mig += item.amount;
      } else if (item.category == "Gyvenimas ir linksmybės") {
        fun += item.amount;
      } else if (item.category == "Komunikacija,PC") {
        pc += item.amount;
      } else if (item.category == "Finansinės išlaidos") {
        finans += item.amount;
      } else if (item.category == "Investavimas") {
        stonk += item.amount;
      } else if (item.category == "Kitas") {
        kita += item.amount;
      } else if (item.category == "Apsipirkimai") {
        apsi += item.amount;
      }
    });

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        expenses: allExpensesCurrentMonth,
        currentExpensesC: filteredExpensesC,
        duomenys: [
          { name: "Maistas", amount: mig },
          { name: "Namams", amount: nam },
          { name: "Transportas", amount: trans },
          { name: "Mašina", amount: car },
          { name: "Gyvenimas", amount: fun },
          { name: "Komunikacija,pc", amount: pc },
          { name: "Finansai", amount: finans },
          { name: "Investavimas", amount: stonk },
          { name: "kita", amount: kita },
          { name: "Apsipirkimai", amount: apsi },
        ],
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

// Get user income by current month
exports.getUserIncomeByMonth = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { income } = users[0];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const filteredYear = income.filter(
      (incomeItem) => incomeItem.date.getFullYear() === currentYear
    );

    const filteredMonth = filteredYear.filter(
      (item) => item.date.getMonth() === currentMonth
    );

    const filteredIncomeC = filteredMonth.filter((incomeC) => incomeC.amount);

    const allIncomeCurrentMonth = filteredMonth.reduce(
      (n, { amount }) => n + amount,
      0
    );

    const incomee = filteredIncomeC;
    /////////////

    let mig = 0;
    let apsi = 0;
    let nam = 0;
    let trans = 0;
    let car = 0;
    let fun = 0;
    let pc = 0;
    let finans = 0;
    let stonk = 0;
    let kita = 0;

    const allCategorySum = {
      maistas: mig,
      apsipirkimai: apsi,
      namams: nam,
      transportas: trans,
      masina: car,
      gyvenimas: fun,
      pc,
      finansines: finans,
      investavimas: stonk,
      kita,
    };

    incomee.forEach((item) => {
      if (item.category == "Namams") {
        nam += item.amount;
      } else if (item.category == "Transportas") {
        trans += item.amount;
      } else if (item.category == "Mašina") {
        car += item.amount;
      } else if (item.category == "Maistas ir gėrimai") {
        mig += item.amount;
      } else if (item.category == "Gyvenimas ir linksmybės") {
        fun += item.amount;
      } else if (item.category == "Komunikacija,PC") {
        pc += item.amount;
      } else if (item.category == "Finansinės išlaidos") {
        finans += item.amount;
      } else if (item.category == "Investavimas") {
        stonk += item.amount;
      } else if (item.category == "Kitas") {
        kita += item.amount;
      } else if (item.category == "Apsipirkimai") {
        apsi += item.amount;
      }
    });
    // console.log(filteredIncomeC)
    // console.log(allIncomeCurrentMonth);
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        income: allIncomeCurrentMonth,
        currentIncomeC: filteredMonth,
        duomenys: [
          { name: "Maistas", amount: mig },
          { name: "Namams", amount: nam },
          { name: "Transportas", amount: trans },
          { name: "Mašina", amount: car },
          { name: "Gyvenimas", amount: fun },
          { name: "Komunikacija,pc", amount: pc },
          { name: "Finansai", amount: finans },
          { name: "Investavimas", amount: stonk },
          { name: "Kita", amount: kita },
          { name: "Apsipirkimai", amount: apsi },
        ],
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

// Get user income by current month
exports.getUserBalanceByMonth = async (req, res) => {
  // console.log(req.params.id, "Sveiki");
  try {
    const users = await Users.find({ _id: req.params.id });
    const { income } = users[0];
    //Gaunam current month incomes
    const currentYearI = new Date().getFullYear();
    const currentMonthI = new Date().getMonth();
    const filteredYearI = income.filter(
      (incomeItem) => incomeItem.date.getFullYear() === currentYearI
    );
    const filteredMonthI = filteredYearI.filter(
      (item) => item.date.getMonth() === currentMonthI
    );
    const allIncomeCurrentMonth = filteredMonthI.reduce(
      (n, { amount }) => n + amount,
      0
    );
    //Gaunam current month expenses
    const { expenses } = users[0];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const filteredYear = expenses.filter(
      (expItem) => expItem.date.getFullYear() === currentYear
    );
    const filteredMonth = filteredYear.filter(
      (item) => item.date.getMonth() === currentMonth
    );
    const allExpensesCurrentMonth = filteredMonth.reduce(
      (n, { amount }) => n + amount,
      0
    );

    var currentMonthBalance = allIncomeCurrentMonth - allExpensesCurrentMonth;

    res.status(200).json({
      status: "success",
      data: {
        balance: currentMonthBalance,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;

for (let y = 2021; y <= currentYear; y++) {
  if (y !== currentYear) {
    for (let m = 1; m <= 12; m++) {
      // console.log(y, m);
    }
  } else {
    for (let m = 1; m <= currentMonth; m++) {
      // console.log(y, m);
    }
  }
}

exports.getAllUserIncomeByMonth = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { income } = users[0];

    var sortedIncomeByDate = income.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });

    const startYear = sortedIncomeByDate[0].date.getFullYear();
    const endYear =
      sortedIncomeByDate[sortedIncomeByDate.length - 1].date.getFullYear();
    const incomeArray = [];

    for (var i = startYear; i <= endYear; i++) {
      var filteredYear = sortedIncomeByDate.filter(
        (item) => item.date.getFullYear() === i
      );

      var yearArray = [];
      yearArray.push({ year: i });
      var monthArray = [];

      for (var y = 1; y <= 12; y++) {
        if (filteredYear.filter((item) => item.date.getMonth() + 1 === y)) {
          var filteredMonth = filteredYear.filter(
            (item) => item.date.getMonth() + 1 === y
          );
          var allIncome = filteredMonth.reduce(
            (n, { amount }) => n + amount,
            0
          );
          monthArray.push(allIncome.toFixed(2));
        } else {
          monthArray.push(0);
        }
      }

      var merged = [];

      yearArray.map((year) => {
        merged.push({
          yearInc: year.year,
          dataInc: monthArray,
        });
      });
      incomeArray.push(...merged);
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        income: incomeArray,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

exports.getAllUserExpensesByMonth = async (req, res) => {
  try {
    const users = await Users.find({ _id: req.params.id });
    const { expenses } = users[0];

    var sortedExpensesByDate = expenses.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });

    const startYear = sortedExpensesByDate[0].date.getFullYear();
    const endYear =
      sortedExpensesByDate[sortedExpensesByDate.length - 1].date.getFullYear();
    const expensesArray = [];

    for (var i = startYear; i <= endYear; i++) {
      var filteredYear = sortedExpensesByDate.filter(
        (item) => item.date.getFullYear() === i
      );

      var yearArray = [];
      yearArray.push({ year: i });
      var monthArray = [];

      for (var y = 1; y <= 12; y++) {
        if (filteredYear.filter((item) => item.date.getMonth() + 1 === y)) {
          var filteredMonth = filteredYear.filter(
            (item) => item.date.getMonth() + 1 === y
          );
          var allExpenses = filteredMonth.reduce(
            (n, { amount }) => n + amount,
            0
          );
          monthArray.push(allExpenses.toFixed(2));
        } else {
          monthArray.push(0);
        }
      }

      var merged = [];
      yearArray.map((year) => {
        merged.push({
          yearExp: year.year,
          dataExp: monthArray,
        });
      });

      expensesArray.push(...merged);
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        expenses: expensesArray,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};
