function delayLog(message, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(message);
      resolve(message);
    }, time);
  });
}

delayLog("Fetching user...", 1000)
  .then(() => delayLog("User fetched", 2000))
  .then(() => delayLog("Fetching user's posts...", 1500))
  .then(() => delayLog("Posts fetched", 500))
  .catch(() => console.log("Something went wrong"));
