import * as OutlineIcons from "@heroicons/react/outline";
import * as SolidIcons from "@heroicons/react/solid";

export const SolidHeroIcon = ({ icon, ...props }) => {
  const { ...icons } = SolidIcons;
  const Icon = icons[icon];

  return (
    <>
      <Icon {...props} />
    </>
  );
};

export const OutlinedHeroIcon = ({ icon, ...props }) => {
  const { ...icons } = OutlineIcons;
  const Icon = icons[icon];

  return (
    <>
      <Icon {...props} />
    </>
  );
};
