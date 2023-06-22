export const convertTime = (time: number, mode: "number" | "string") => {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time - min * 60);

  if (mode === "number") {
    return [min, sec];
  } else return `${min}:${sec.toString().padStart(2, "0")}`;
};
