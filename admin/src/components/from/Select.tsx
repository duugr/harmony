import { useState } from "react"
import { OptionInterface } from "../../services/types"

export function FromSelect(props: {
	label: string
	multiple: string
	id: string
	selected: string
	selectList: OptionInterface[]
	is: string
	iconLeft: string
	iconRight: string
	help: string
}) {
	let inputIsClass = 'input'
	let helpClass = ''
	let controlClass = 'control is-expanded'
	let iconLeftClass = ''
	let iconRightClass = ''

	if (props.is === "success") {
		inputIsClass += ' is-success'
	} else if (props.is === "danger") {
		inputIsClass += ' is-danger'
	}
	if (props.help.length > 0) {
		helpClass = props.is === "success" ? 'help is-success' : 'help is-danger'
	}
	if (props.iconLeft.length > 0) {
		controlClass += ' has-icons-left'
		iconLeftClass = 'fas ' + props.iconLeft
	}
	if (props.iconRight.length > 0) {
		controlClass += ' has-icons-right'
		iconRightClass = 'fas ' + props.iconRight
	}
	const [selected, setSelected] = useState(props.selected)

	return <div className="field">
		<label className="label">{props.label}</label>
		<div className={controlClass}>
			<select className={inputIsClass} id={props.id}
				value={selected}
				onChange={(e) => setSelected(e.target.value)}>
				{props.selectList.map((item: OptionInterface) => (
					<option key={item.name + item.value} value={item.value}>{item.name}</option>
				))}
			</select>
			{iconLeftClass.length === 0 ? '' :
				<span className="icon is-small is-left">
					<i className={iconLeftClass}></i>
				</span>
			}
			{iconRightClass.length === 0 ? '' :
				<span className="icon is-small is-right">
					<i className={iconRightClass}></i>
				</span>
			}
		</div>
		{helpClass.length === 0 ? '' :
			<p className={helpClass}>{props.help}</p>
		}
	</div>
}