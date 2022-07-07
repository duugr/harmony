import { useState } from "react"

export function Input(props: {
    label: string
    type: string
    id: string
    value: string
    placeholder: string
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
    } else if(props.is === "danger") {
        inputIsClass += ' is-danger'
    }
    if (props.help.length > 0) {
        helpClass = props.is === "success" ? 'help is-success' : 'help is-danger'
    }
    if (props.iconLeft.length > 0) {
        controlClass += ' has-icons-left'
        iconLeftClass = 'fas ' + props.iconLeft
    }
    if (props.iconRight.length >0) {
        controlClass += ' has-icons-right'
        iconRightClass = 'fas ' + props.iconRight
    }


    const [value, setValue] = useState(props.value)

    return <div className="field">
        <label className="label">{props.label}</label>
        <div className={controlClass}>
            <input type={props.type}
                className={inputIsClass}
                id={props.id}
                placeholder={props.placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
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