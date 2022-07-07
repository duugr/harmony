import { useState } from "react"
import { OptionInterface } from "../../services/types"

export function FromCheckbox(props: {
	label: string
	id: string
	checkeds: OptionInterface[]
	checkList: OptionInterface[]
	is: string
	help: string
}) {
	let inputIsClass = ''
	let helpClass = ''
	let controlClass = 'control is-expanded'

	if (props.is === "success") {
		inputIsClass += ' is-success'
	} else if (props.is === "danger") {
		inputIsClass += ' is-danger'
	}
	if (props.help.length > 0) {
		helpClass = props.is === "success" ? 'help is-success' : 'help is-danger'
	}
	const [checked, setChecked] = useState<OptionInterface>({name:'', value: "", checked: false })

	props.checkList.forEach(element => {
		props.checkeds.forEach(elem => {
			if (elem.value === element.value) {
				element.checked = true
			}
		})
	});

	let checkbokContext
	if (checked) {
		props.checkList.forEach(element => {
			if (checked.value === element.value) {
				element.checked = checked.checked
			}
		});
		checkbokContext = props.checkList.map((item: OptionInterface) => (
			<label className="checkbox" key={item.name}>
				<input type="checkbox"
					className={inputIsClass}
					id={props.id}
					value={item.value}
					checked={item.checked}
					onChange={(e) => setChecked({ name: item.name, value: item.value, checked: !item.checked})}
				/>
				{item.name}
			</label>
		))
	}

	return <div className="field">
		<label className="label">{props.label}</label>
		<div className={controlClass}>
			{checkbokContext}
		</div>
		{helpClass.length === 0 ? '' :
			<p className={helpClass}>{props.help}</p>
		}
	</div>
}