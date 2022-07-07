import React from "react";
import { UrlService } from "../../services/Url.Services";
import { book } from "../../services/types";
import { Rest } from "../../services/Rest.Services";
import Notiflix from "notiflix";
import { Link } from "react-router-dom";

export class BookList extends React.Component {

    state = { bookData: [] }

    componentDidMount() {
        Rest.get(UrlService.book.list + "?limit=100")
            .then(result => {
                if (result.message) {
                    Notiflix.Notify.failure(result.message)
                } else {
                    this.setState({ bookData: result.data })
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    async deleteBook(uuid: string) {
        Notiflix.Loading.dots("删除中")
        let { bookData } = this.state;
        return Rest.delete(UrlService.book.delete + uuid)
            .then(result => {
                if (result.data) {
                    let index = bookData.findIndex((book: book) => book.uuid === uuid)
                    if (index === -1) {
                        console.log('fail')
                        return
                    }

                    bookData.splice(index, 1)
                    this.setState({ bookData: bookData })
                }
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        let { bookData } = this.state;
        return (
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th><abbr title="Position">Pos</abbr></th>
                        <th>标题</th>
                        <th><abbr title="Played">作者</abbr></th>
                        <th><abbr title="Drawn">发布者</abbr></th>
                        <th><abbr title="Lost">发布时间</abbr></th>
                        <th><abbr title="Won">创作时间</abbr></th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th><abbr title="Position">Pos</abbr></th>
                        <th>标题</th>
                        <th><abbr title="Played">作者</abbr></th>
                        <th><abbr title="Drawn">发布者</abbr></th>
                        <th><abbr title="Lost">发布时间</abbr></th>
                        <th><abbr title="Won">创作时间</abbr></th>
                        <th>操作</th>
                    </tr>
                </tfoot>
                <tbody>
                    {bookData.map((list: book, index: number) => (
                        <tr key={index + 1} id={list.uuid}>
                            <td>{index + 1}</td>
                            <td><a href={`/book/${list.uuid}`}>{list.title}</a></td>
                            <td>{list.author}</td>
                            <td>{list.publisher}</td>
                            <td>{list.publishedDate}</td>
                            <td>【{list.creationStartDate}】-【{list.creationEndDate}】</td>
                            <td>
                                <Link to={`book/edit/${list.uuid}`}>
                                    <i className="fas fa-pen">&nbsp;</i>
                                </Link>
                                <span onClick={() => this.deleteBook(list.uuid)}>
                                    <i className="fas fa-times-circle">&nbsp;</i>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
