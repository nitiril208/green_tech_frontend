import React, { ChangeEvent } from "react";

interface SelectProps {
	value?: string;
	onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox: React.FC<SelectProps> = ({ value, onChange }) => {
	return (
		<div>
			<select
				value={value}
				onChange={onChange}
				className="w-[280px] h-[46px] bg-[white] xl:w-[280px] border solid 1.5px lg:w-[180px] p-[10px] md:w-[170px] sm:w-[180px]">
				<option>Yes</option>
				<option>No</option>
			</select>
		</div>
	);
};

export default SelectBox;
