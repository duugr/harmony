import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { article } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function Tag() {
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

    return (
        <div className="content">
            <div className="level">
                <div className="level-left">
                    <div className="level-item is-size-2">{article.title}</div>
                    <div className="level-item is-size-6">
                        publisher:
                        <strong title="publisher">{article.publisher}</strong>
                    </div>
                    <div className="level-item">
                        createdAt:
                        <strong title="createdAt">{article.createdAt}</strong>
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item is-size-4">
                        good:
                        <strong title="good">{article.good}</strong>
                    </div>
                    <div className="level-item is-size-4">
                        click:
                        <strong title="click">{article.click}</strong>
                    </div>
                    <div className="level-item">
                        recommend:
                        <strong title="recommend">{article.recommend}</strong>
                    </div>
                </div>
            </div>
            <p>{article.content}</p>
        </div>
    );
}