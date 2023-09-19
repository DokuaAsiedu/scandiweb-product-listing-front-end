import { ErrorMessage } from "./error-message";

export function BookField({register, errors}) {
	return (
		<fieldset className="type-field" data-type="Book">
			<div className="flex flex-row justify-between align-start">
				<label htmlFor="weight">Weight (KG)</label>
				<div className="flex flex-column justify-between align-end input-block">
					<input id="weight" type="number" {...register("book_weight", {required: true, min: 0})}></input>
					{errors.book_weight && errors.book_weight.type === "required" && (<ErrorMessage message="This is required"/>)}
					{errors.book_weight && errors.book_weight.type === "min" && (<ErrorMessage message="Please enter a number from 0"/>)}
				</div>
			</div>
			<p>Please provide weight</p>
		</fieldset>
	)
}