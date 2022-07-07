import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { chapter, book } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function Book() {
    let { bookUuid } = useParams()
    const [chapters, setChapters] = useState([])
    const [book, setBook] = useState<book>({
        uuid: '',
        title: '',
        description: '',
        author: '',
        publisher: '',
        publishedDate: '',
        creationStartDate: '',
        creationEndDate: ''
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
        Rest.get(UrlService.chapter.list + bookUuid)
            .then(result => {
                if (result.message) {
                    Notiflix.Notify.failure(result.message)
                } else {
                    setChapters(result.data)
                }
            })
            .catch(error => {
                console.error(error)
            })
        Rest.get(UrlService.book.detail + bookUuid)
            .then(result => {
                if (result.message) {
                    Notiflix.Notify.failure(result.message)
                } else {
                    setBook(result.data)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [bookUuid])

    const deleteChapter = (uuid: string) => {
        Notiflix.Notify.failure(uuid)
    }

    let chapterContext
    if (chapters) {
        chapterContext = chapters.map((chap: chapter) => (
            <tr key={chap.uuid} id={chap.uuid}>
                <td>
                    <Link to={'/book/' + chap.bookUuid + '/' + chap.uuid}>
                        <strong>{chap.title}</strong>
                    </Link>
                </td>
                <td>{chap.publisher}</td>
                <td>{chap.createdAt}</td>
                <td>{chap.like}</td>
                <td className="is-right">
                    <button className="button is-small is-danger" onClick={() => deleteChapter(chap.uuid)}>删除</button>
                </td>
            </tr>
        ))
    }

    return (
        <div className="content">
            <div className="level">
                <div className="level-left">
                    <div className="level-item is-size-2">{book.title}</div>
                    <div className="level-item is-size-6">
                        author:
                        <strong title="author">{book.author}</strong>
                    </div>
                    <div className="level-item is-size-6">
                        publisher:
                        <strong title="publisher">{book.publisher}</strong>
                    </div>
                    <div className="level-item is-size-6">
                        publishedDate:
                        <strong title="publishedDate">{book.publishedDate}</strong>
                    </div>
                </div>
                <div className="level-right">
                    <Link to={'/book/chapter/create/' + bookUuid} className="button is-primary">添加章节</Link>
                </div>
            </div>
            <p>{book.description}</p>

            <table className="table is-fullwidth is-narrow">
                <thead>
                    <tr>
                        <th>标题</th>
                        <th><abbr title="Drawn">发布者</abbr></th>
                        <th><abbr title="Lost">发布时间</abbr></th>
                        <th><abbr title="Like">Like</abbr></th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>标题</th>
                        <th><abbr title="Drawn">发布者</abbr></th>
                        <th><abbr title="Lost">发布时间</abbr></th>
                        <th><abbr title="Like">Like</abbr></th>
                        <th>操作</th>
                    </tr>
                </tfoot>
                <tbody>
                    {chapterContext}
                </tbody>
            </table>
        </div>
    );
}