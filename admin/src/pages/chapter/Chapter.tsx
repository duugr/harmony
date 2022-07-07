import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { chapter } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function Chapter() {
    let { chapterUuid } = useParams()
    const [chapter, setChapter] = useState<chapter>({
        uuid: '',
        bookUuid: '',
        title: '',
        publisher: '',
        createdAt: '',
        content: '',
        like: 0
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
        Notiflix.Loading.dots("数据获取中")
        Rest.get(UrlService.chapter.detail + chapterUuid)
            .then(result => {
                setChapter(result.data)
            })
            .catch(error => {
                console.error(error)
            })
            .finally(()=>{
                Notiflix.Loading.remove()
            })
    }, [chapterUuid])

    const deleteChapter = (uuid: string) => {
        Notiflix.Notify.failure(uuid)
    }

    return (
        <div className="content">
            <div className="level">
                <div className="level-left">
                    <div className="level-item is-size-4">{chapter.title}</div>
                    <div className="level-item is-size-6">{chapter.publisher}</div>
                    <div className="level-item is-size-6">{chapter.title}</div>
                </div>
                <div className="level-right">
                    <button className="button is-danger" onClick={() => deleteChapter(chapter.uuid)}>删除章节</button>
                </div>
            </div>
            <p>{chapter.content}</p>

        </div>
    );
}