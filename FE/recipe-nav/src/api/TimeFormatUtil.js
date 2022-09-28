const timeFormatChange = (timeString) => {
  let temp = timeString.split("T");

  let hourMinute = temp[1].split(":");

  return temp[0] + " " + hourMinute[0] + "시 " + hourMinute[1] + "분";
};

export { timeFormatChange };
