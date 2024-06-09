import { RiBowlLine } from "@remixicon/react";

const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <RiBowlLine size={40} className="hidden md:block text-orange-500" />
      <p className="font-bold text-xl">
        Create<span className="text-orange-500">Recipes</span>
      </p>
    </div>
  );
};

export default Logo;
