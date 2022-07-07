import MDEditor from '@uiw/react-md-editor'
import { useEffect, useState } from 'react'


export function TextMarkdown(props: {
	label: string
	id: string
	value: string
	placeholder: string
	is: string
	iconLeft: string
	iconRight: string
	help: string
	setParentContent: any
}) {
	let helpClass = ''
	let controlClass = 'control is-expanded'
	let iconLeftClass = ''
	let iconRightClass = ''

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

	const [content, setContent] = useState("**Hello world!!!**")

	useEffect(() => {
		props.setParentContent(content)
	}, [content, props])

	return <div className="field">
		<label className="label">{props.label}</label>
		<div className={controlClass}>
			<MDEditor
				id={props.id}
				value={content}
				// onChange={setContent}
			/>
			<MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />
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