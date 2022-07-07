import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { article } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function TagList() {
    const [articles, setArticles] = useState([])
    // useLayoutEffect, useEffect(callback,arr);
    /*
    useEffect接受两个参数
    callback: 回调函数，第一次会默认执行一次，内部可以return一个回调函数，当卸载组件时执行
    arr: 监控变量的数组，如果不传入arr则默认监控全部的变量，
         如果传入并且为空，则相当于生命周期的DidMount；
         如果有值则当里面的值变化时会再执行callback，相当于update生命周期
    */
    useLayoutEffect(() => {
        Rest.get(UrlService.article.list)
            .then(result => {
                if (result.message) {
                    Notiflix.Notify.failure(result.message)
                } else {
                    setArticles(result.data)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    const deleteArticle = (id: string) => {
        Notiflix.Notify.failure(id)
    }

    let articleContext
    if (articles) {
        articleContext = articles.map((article: article) => (
            <tr key={article.uuid} id={article.uuid}>
                <td>{article.chapter}</td>
                <td>
                    <Link to={'/article/' + article.uuid}>
                        <strong>{article.title}</strong>
                    </Link>
                </td>
                <td>{article.publisher}</td>
                <td>{article.language}</td>
                <td>{article.good}|{article.click}|{article.recommend}</td>
                <td>{article.createdAt}/{typeof article.updatedAt === "object" ?'':article.updatedAt}</td>
                <td className="is-right">
                    <button className="button is-small is-danger" onClick={() => deleteArticle(article.uuid)}>删除</button>
                </td>
            </tr>
        ))
    }

    return (
        <div className="content">
            <table className="table is-fullwidth is-narrow">
                <thead>
                    <tr>
                        <th><abbr title="chapter">章节</abbr></th>
                        <th><abbr title="title">标题</abbr></th>
                        <th><abbr title="publisher">权限</abbr></th>
                        <th><abbr title="language">权限</abbr></th>
                        <th><abbr title="goodClickRecommend">好评|点击|推荐</abbr></th>
                        <th><abbr title="createdUpdatedAt">创建时间/更新时间</abbr></th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th><abbr title="chapter">章节</abbr></th>
                        <th><abbr title="title">标题</abbr></th>
                        <th><abbr title="publisher">权限</abbr></th>
                        <th><abbr title="language">权限</abbr></th>
                        <th><abbr title="goodClickRecommend">好评|点击|推荐</abbr></th>
                        <th><abbr title="createdUpdatedAt">创建时间/更新时间</abbr></th>
                        <th>操作</th>
                    </tr>
                </tfoot>
                <tbody>
                    {articleContext}
                </tbody>
            </table>
        </div>
    );
}