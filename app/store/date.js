const CHANGE_DATE = "CHANGE_DATE";

export const changeDate = (date) => {
  return {
    type: CHANGE_DATE,
    date,
  };
};

const today = new Date();
let month = (today.getMonth() + 1).toString();
let day = today.getDate().toString();

if (month.length < 2) {
  month = `0${month}`;
}

if (day.length < 2) {
  day = `0${day}`;
}

const initialDate = `${today.getFullYear()}-${month}-${day}`;

const dateReducer = (date = initialDate, action) => {
  switch (action.type) {
    case CHANGE_DATE:
      return action.date;
    default:
      return date;
  }
};

export default dateReducer;
