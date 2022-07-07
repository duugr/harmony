import Notiflix from "notiflix";
import React from "react";
import { useState } from "react";
import { Rest } from "../../services/Rest.Services";
import { UrlService } from "../../services/Url.Services";
import { TagInterface } from "../../services/types"

export function TagCreate() {
    const [tag, setTag] = useState("")
    const [tags, setTags] = useState<TagInterface[]>([])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // 创建UUID数组
        let tagUuids = tags.map(item => item.uuid)
        // 去除重复
        tagUuids = tagUuids.filter((v, i, o) => o.indexOf(v) === i)

        Rest.post(UrlService.article.create, {
            "chapter": Math.abs(event.currentTarget.chapter.value),
            "title": event.currentTarget.articleTitle.value,
            "publisher": event.currentTarget.publisher.value,
            "content": event.currentTarget.content.value,
            "language": event.currentTarget.language.value,
            "state": event.currentTarget.state.value,
            "tagUuids": tagUuids.join(','),
        }).then(result => {
            if (result.message) {
                Notiflix.Notify.failure(result.message)
            } else {
                Notiflix.Notify.success('添加成功')
            }
        });

    }

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
            "tagName": tag
        }).then(result => {
            if (result.message) {
                Notiflix.Notify.failure(result.message)
            } else {
                setTag('')
                handleAddTag(result.data)

                Notiflix.Notify.success('添加成功')
            }
        });
    }

    let tagContent
    if (tags) {
        tagContent = tags.map((tag: TagInterface) => (
            <p className="control">
                <a className="button" onClick={() => handleRemoveTag(tag.name)}>
                    {tag.name}
                </a>
            </p>
        ))
    }

    return (
        <form onSubmit={event => handleSubmit(event)} method='post'>

            <div className="field">
                <div className="field-body">

                    <div className="field">
                        <label className="label">章节</label>
                        <div className="control is-expanded has-icons-right">
                            <input className="input" type="number" id="chapter" placeholder="1" />
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">发布者</label>
                        <div className="control is-expanded has-icons-right">
                            <input className="input" type="text" id="publisher" placeholder="发布者" />
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">语言</label>
                        <div className="control has-icons-left">
                            <div className="select">
                                <select className="select" id="language">
                                    <option value="zh_cn" selected>中文</option>
                                    <option value="en_us">英文</option>
                                </select>
                            </div>
                            <span className="icon is-left">
                                <i className="fas fa-globe"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">状态</label>
                        <div className="control has-icons-left">
                            <div className="select">
                                <select className="select" id="state">
                                    <option value="submited" selected>提交</option>
                                    <option value="published">发布</option>
                                    <option value="deleted">删除</option>
                                </select>
                            </div>
                            <span className="icon is-left">
                                <i className="fas fa-smoking"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field">
                <label className="label">标题</label>
                <div className="control is-expanded has-icons-right">
                    <input className="input" type="text" id="articleTitle" placeholder="标题" />
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>
            <div className="field">
                <label className="label">内容</label>
                <div className="control is-expanded has-icons-right">
                    <textarea className="textarea" id="content" placeholder="内容"></textarea>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>
            <div className="field">
                <label className="label">标签</label>
                <div className="field has-addons">
                    <div className="control is-expanded has-icons-right">
                        <input className="input" type="text" id="tags" value={tag} placeholder="标签" onChange={(e) => setTag(e.target.value)} />
                    </div>
                    <div className="control">
                        <button className="button is-info" type="button" onClick={handleSearch}>+</button>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-multiline">
                    {tagContent}
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button type="submit" className="button is-primary">Submit</button>
                </div>
            </div>
        </form>
    );
}