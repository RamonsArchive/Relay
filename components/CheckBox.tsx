import CheckBoxIcons from "./CheckBoxIcons";

/* TODO: kept server so that I can fetch data */
const CheckBox = ({ options }: { options: string }) => {
  console.log(`This is checkBox: ${options}`);
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row gap-2 items-start">
        <div className="shrink-0">
          <CheckBoxIcons options={options} />
        </div>
        <div className="flex-1 min-w-0 whitespace-normal break-words">
          <span>{options}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
