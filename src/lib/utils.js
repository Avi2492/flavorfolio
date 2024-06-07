const COLORS = {
  green: {
    bg: "bg-[#65C18C]",
    badge: "bg-[#C1F4C5]",
  },
  orange: {
    bg: "bg-[#FF7F3F]",
    badge: "bg-[#FFA45B]",
  },
  red: {
    bg: "bg-[#FF6666]",
    badge: "bg-[#FFBFBF]",
  },
};

export const getRandomColor = () => {
  const colorNames = Object.keys(COLORS); // Get array of the keys (color names)
  const randomIndex = Math.floor(Math.random() * colorNames.length); // Get a random index
  const randomColorName = colorNames[randomIndex]; // Get the color name at the random index
  return COLORS[randomColorName]; // Return the color object corresponding to the random color name
};
