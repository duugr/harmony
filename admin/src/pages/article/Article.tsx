import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { article, TagInterface } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

import ReactMarkdown from 'react-markdown'

export function Article() {
    let { uuid } = useParams()
    const [article, setArticle] = useState<article>({
        uuid: '',
        title: '',
        content: '',
        publisher: '',
        language: '',
        state: '',
        chapter: 0,
        good: 0,
        click: 0,
        recommend: 0,
        createdAt: '',
        updatedAt: '',
        tags: [],
    })
    // useLayoutEffect, useEffect(callback,arr);
    /*
    useEffect接受两个参数
    callback: 回调函数，第一次会默认执行一次，内部可以return一个回调函数，当卸载组件时执行
    arr: 监控变量的数组，如果不传入arr则默认监控全部的变量，
         如果传入并且为空，则相当于生命周期的DidMount；
         如果有值则当里面的值变化时会再执行callback，相当于update生命周期
    */
    useLayoutEffect(() => {
        Rest.get(UrlService.article.detail + uuid)
            .then(result => {
                if (result.message) {
                    Notiflix.Notify.failure(result.message)
                } else {
                    setArticle(result.data)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [uuid])
    let tagContext
    if (article.tags) {
        tagContext = article.tags.map((tag:TagInterface) => (
            <span className="tag is-primary" key={tag.uuid}>{tag.name}</span>
        ))
    }

    return (
        <div className="content">
            <h2 className="is-size-2">{article.title}</h2>
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">发布者</p>
                        <p className="title has-text-dark">{article.publisher}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">创建时间</p>
                        <p className="title has-text-dark">{article.createdAt}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">好评</p>
                        <p className="title has-text-dark">{article.good}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">点击</p>
                        <p className="title has-text-dark">{article.click}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">推荐</p>
                        <p className="title has-text-dark">{article.recommend}</p>
                    </div>
                </div>
            </nav>
            <div className="tags">
                {tagContext}
            </div>
            <p><ReactMarkdown children={article.content} /></p>
        </div>
    );
}