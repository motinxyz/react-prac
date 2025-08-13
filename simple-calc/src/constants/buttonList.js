const buttonList = [
  "C",
  "<",
  "|x|",
  "/",
  "1",
  "2",
  "3",
  "*",
  "4",
  "5",
  "6",
  "-",
  "7",
  "8",
  "9",
  "+",
  "+/-",
  "0",
  ".",
  "=",
].map((value, index) => {
  return { id: `btn-${index}`, value: `${value}` };
});

export default buttonList;
