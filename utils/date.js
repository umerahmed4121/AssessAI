export const isValidDate = (dateString) => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!dateRegex.test(dateString)) {
    return false;
  }

  const [day, month, year] = dateString.split('/');
  const parsedDate = new Date(`${year}-${month}-${day}`);
  const currentDate = new Date(); // current date

  // Check if the parsed date is not a future date and is not more than 100 years ago (you can adjust this threshold)
  return !isNaN(parsedDate.getTime()) && parsedDate <= currentDate && parsedDate >= new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
};

export const toDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
}

export const mongoDateToString = (dateString) => {


  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;


}


