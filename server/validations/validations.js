export const sqlToHtmlDatetime = (sqlDatetime) => {
    // Convert to HTML datetime-local format
    var htmlDatetime = sqlDatetime.slice(0, 16);
    return htmlDatetime;
}
export const padZero = (number) => {
    return number < 10 ? '0' + number : number;
}

export const dateFormatter = (inputDate) => {
    let date = "";
    if (inputDate) {
      if (inputDate.substr(5, 2) === "01") {
        date = `${inputDate.substr(8, 2)} Jan ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "02") {
        date = `${inputDate.substr(8, 2)} Feb ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "03") {
        date = `${inputDate.substr(8, 2)} Mar ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "04") {
        date = `${inputDate.substr(8, 2)} Apr ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "05") {
        date = `${inputDate.substr(8, 2)} May ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "06") {
        date = `${inputDate.substr(8, 2)} Jun ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "07") {
        date = `${inputDate.substr(8, 2)} Jul ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "08") {
        date = `${inputDate.substr(8, 2)} Aug ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "09") {
        date = `${inputDate.substr(8, 2)} Sept ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "10") {
        date = `${inputDate.substr(8, 2)} Oct ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "11") {
        date = `${inputDate.substr(8, 2)} Nov ${inputDate.substr(0, 4)}`;
      } else if (inputDate.substr(5, 2) === "12") {
        date = `${inputDate.substr(8, 2)} Dec ${inputDate.substr(0, 4)}`;
      }
    }
    return date;
  };

export const timeFormatter = (inputTime) => {
  const twelveHour = inputTime.substr(0,2) - 12;
  const minutes = inputTime.substr(3,2);
  if(inputTime.substr(0,2) != 0){
    if(twelveHour > 0){
      if(twelveHour == 1){
        return `01:${minutes} pm`
      }else if(twelveHour == 2){
        return `02:${minutes} pm`
      }else if(twelveHour == 3){
        return `03:${minutes} pm`
      }else if(twelveHour == 4){
        return `04:${minutes} pm`
      }else if(twelveHour == 5){
        return `05:${minutes} pm`
      }else if(twelveHour == 6){
        return `06:${minutes} pm`
      }else if(twelveHour == 7){
        return `07:${minutes} pm`
      }else if(twelveHour == 8){
        return `08:${minutes} pm`
      }else if(twelveHour == 9){
        return `09:${minutes} pm`
      }else if(twelveHour == 10){
        return `10:${minutes} pm`
      }else if(twelveHour == 11){
        return `11:${minutes} pm`
      }else if(twelveHour == 12){
        return `12:${minutes} pm`
      }
    }else if(twelveHour === 0){
      return `${inputTime} pm`
    }else{
      return `${inputTime} am`
    }
  }else{
    return `12:${minutes} am`
  }
} 