import Notiflix from "notiflix"
import { useEffect, useState } from "react"
import { Rest } from "../../services/Rest.Services"
import { TagInterface } from "../../services/types"
import { UrlService } from "../../services/Url.Services"

export const TagContext = (props: any) => {
    const [tagValue, setTagValue] = useState("")
    const [tags, setTags] = useState<TagInterface[]>([])

    const handleAddTag = (tag: TagInterface) => {
        let list = tags
        list.push(tag)
        setTags(list)
    }
    const handleRemoveTag = (tagName: string) => {
        let list = tags
        if (list.length > 0) {
            setTags(list.filter(item => item.name !== tagName))
        }
    }

    const handleSearch = () => {
        Rest.post(UrlService.tag.post, {
            "name": tagValue
        }).then(result => {
            if (result.message) {
                Notiflix.Notify.failure(result.message)
            } else {
                handleAddTag(result.data)
                Notiflix.Notify.success('添加成功')
                setTagValue('')
            }
        })
    }

    useEffect(() => {
        props.setParentTags(tags)
    }, [tags,props])

    let tagContent
    if (tags) {
        tagContent = tags.map((tag: TagInterface) => (
            <div className="control" key={tag.uuid}>
                <div className="tags has-addons">
                    <span className="tag is-info">{tag.name}</span>
                    <span className="tag is-danger is-delete" onClick={() => handleRemoveTag(tag.name)}></span>
                </div>
            </div>
        ))
    }

    return <div className="field">
        <label className="label">标签</label>
        <div className="field has-addons">
            <div className="control is-expanded has-icons-right">
                <input className="input" type="text" id="tags" value={tagValue} placeholder="标签" onChange={(e) => setTagValue(e.target.value)} />
            </div>
            <div className="control">
                <button className="button is-info" type="button" onClick={handleSearch}>+</button>
            </div>
        </div>
        <div className="field is-grouped is-grouped-multiline">
            {tagContent}&nbsp;
        </div>
    </div>
}