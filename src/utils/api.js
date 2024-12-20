const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

export const fetchAPI = function (date) {
  return new Promise((resolve, reject) => {
    if (!(date instanceof Date)) {
      return reject(new Error("Invalid date object"));
    }

    let result = [];
    let random = seededRandom(date.getDate()); // Ensure date is a valid Date object

    for (let i = 17; i <= 23; i++) {
      if (random() < 0.5) {
        result.push(i + ":00");
      }
      if (random() < 0.5) {
        result.push(i + ":30");
      }
    }

    if (result.length === 0) {
      reject(new Error("No available times")); // Reject if no times are found
    } else {
      resolve(result); // Resolve with the available times
    }
  });
};

export const submitAPI = function (formData) {
  return true;
};
