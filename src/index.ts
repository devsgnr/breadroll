import SV from "./sv";

const file = new SV();

file
  .create("./test/csv/test.csv")
  .then(() => {
    console.log(file.getKeys);
    file.save("./result.json").as.json();
  })
  .catch((err) => {
    console.log(err);
  });
