import SV from "./sv";

const file = new SV();

file
  .read("./test/csv/test.csv", ",", { header: true })
  .then((object: SV) => {
    console.log(object.getKeys);
    object.save("./result.json").as.json();
  })
  .catch((err) => {
    console.log(err);
  });
