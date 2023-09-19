import { ErrorMessage } from "./error-message";

export function FurnitureField({register, errors}) {
	return (
		<fieldset className="type-field" data-type="Furniture">
			<div className="flex flex-row justify-between align-start">
				<label htmlFor="height">Height (CM)</label>
				<div className="flex flex-column justify-between align-end input-block">
					<input id="height" type="number" {...register("furniture_height", {required: true, min: 0})}></input>
					{errors.furniture_height && errors.furniture_height.type === "required" && (<ErrorMessage message="This is required"/>)}
					{errors.furniture_height && errors.furniture_height.type === "min" && (<ErrorMessage message="Please enter a number from 0"/>)}
				</div>
			</div>
			
			<div className="flex flex-row justify-between align-start">
				<label htmlFor="width">Width (CM)</label>
				<div className="flex flex-column justify-between align-end input-block">
					<input id="width" type="number" {...register("furniture_width", {required: true, min: 0})}></input>
					{errors.furniture_width && errors.furniture_width.type === "required" && (<ErrorMessage message="This is required"/>)}
					{errors.furniture_width && errors.furniture_width.type === "min" && (<ErrorMessage message="Please enter a number from 0"/>)}
				</div>
			</div>

			<div className="flex flex-row justify-between align-start">
				<label htmlFor="length">Length (CM)</label>
				<div className="flex flex-column justify-between align-end input-block">
					<input id="length" type="number" {...register("furniture_length", {required: true, min: 0})}></input>
					{errors.furniture_length && errors.furniture_length.type === "required" && (<ErrorMessage message="This is required"/>)}
					{errors.furniture_length && errors.furniture_length.type === "min" && (<ErrorMessage message="Please enter a number from 0"/>)}
				</div>
			</div>
			<p>Please provide dimensions</p>
		</fieldset>
	)
}