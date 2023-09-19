import { ErrorMessage } from "./error-message";

export function DVDField({register, errors}) {
	return (
		<fieldset className="type-field" data-type="DVD">
			<div className="flex flex-row justify-between align-start">
				<label htmlFor="size">Size (MB)</label>
				<div className="flex flex-column justify-between align-end input-block">
					<input id="size" type="number" min="0" {...register("dvd_size", {required: true, min: 0})}></input>
					{errors.dvd_size && errors.dvd_size.type === "required" && (<ErrorMessage message="This is required"/>)}
					{errors.dvd_size && errors.dvd_size.type === "min" && (<ErrorMessage message="Please enter a number from 0"/>)}
				</div>
			</div>
			<p>Please provide a size</p>
		</fieldset>
	)
}
