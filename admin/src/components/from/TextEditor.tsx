import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

export function TextEditor(props: {
    label: string
    id: string
    value: string
    placeholder: string
    is: string
    iconLeft: string
    iconRight: string
    help: string
    setParentContent:any
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

    const [content, setContent] = useState("")

    const modules = {
        toolbar: [
            [{ font: [] }, { size: [] }],
            [{ align: [] }, 'direction'],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'super' }, { script: 'sub' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ]
        // toolbar: [
        //     [{ 'header': [1, 2, false] }],
        //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        //     [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        //     ['link', 'image'],
        //     ['clean']
        // ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    useEffect(() => {
        props.setParentContent(content)
    }, [content,props])

    return <div className="field">
        <label className="label">{props.label}</label>
        <div className={controlClass}>
            <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                modules={modules}
                formats={formats}
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