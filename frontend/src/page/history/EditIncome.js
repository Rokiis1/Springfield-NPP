import React, { useState } from "react";
import { findIncomeDataAndUpdate } from "../../api/libraries/apiLibraries";
import { useForm } from "react-hook-form";
import "./style/Button.css";

const EditIncome = ({
  handleCancelClick,
  subID,
  category,
  amount,
  type,
  date,
  userID,
  updateUserData,
  name,
  setEditContactId,
}) => {
  // Direct property with useState
  const [userUpdateIncome, setUserUpdateIncome] = useState({
    amount: amount,
    type: type,
    name: name,
    date: date,
    category: category,
  });

  // Update input data
  function updateIncomeObject(e) {
    // Give default value using property value default
    e.preventDefault();
    // Direct value
    userUpdateIncome[e.target.name] = e.target.value;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      accounting: "",
      name: "",
      category: "",
      amount: "",
      date: "",
    },
  });
  // Update data clicked by handleSubmit
  function onSubmit() {
    // Direct parameters
    findIncomeDataAndUpdate(userUpdateIncome, userID, subID).then(() =>
      updateUserData(userID)
    );
    // NULL ????
    setEditContactId(null);
  }

  return (
    <tr>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="Edit-input"
            placeholder="Suma"
            type="number"
            name="amount"
            step="0.01"
            defaultValue={amount}
            {...register("amount", {
              required: true,
              pattern: /^(\d){0,8}(\.){0,1}(\d){0,2}$/,
              minLenght: 1,
              maxLength: 10,
            })}
            onChange={(e) => updateIncomeObject(e)}
          />
        </form>
      </td>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select
            className="Edit-input"
            name="category"
            {...register("category", { required: true })}
            onChange={(e) => updateIncomeObject(e)}
          >
            <option value="Maistas ir gėrimai">Maistas ir gėrimai</option>
            <option value="Apsipirkimai">Apsipirkimai</option>
            <option value="Namams">Namams</option>
            <option value="Transportas">Transportas</option>
            <option value="Mašina">Mašina</option>
            <option value="Gyvenimas ir linksmybės">
              Gyvenimas ir linksmybės
            </option>
            <option value="Elektronika">Elektronika</option>
            <option value="Financinės išlaidos">Financinės išlaidos</option>
            <option value="Investicijos">Investicijos</option>
            <option value="Kita">Kita</option>
          </select>
        </form>
      </td>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Pavadinimas"
            className="Edit-input"
            defaultValue={name}
            {...register("name", {
              maxLength: 20,
            })}
            onChange={(e) => updateIncomeObject(e)}
          />
        </form>
      </td>
      <td>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="Edit-input"
            type="date"
            name="date"
            min="2021-01-01"
            max="2041-01-01"
            defaultValue={date.slice(0, 10)}
            onChange={(e) => updateIncomeObject(e)}
          />
        </form>
      </td>
      <td className="EditIncome-button">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit">Pakeisti</button>
          <button type="button" onClick={handleCancelClick}>
            Atšaukti
          </button>
        </form>
      </td>
    </tr>
  );
};

export default EditIncome;
