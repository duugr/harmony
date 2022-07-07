import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { user } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function UserList() {
    const [users, setUsers] = useState([])
    // useLayoutEffect, useEffect(callback,arr);
    /*
    useEffect接受两个参数
    callback: 回调函数，第一次会默认执行一次，内部可以return一个回调函数，当卸载组件时执行
    arr: 监控变量的数组，如果不传入arr则默认监控全部的变量，
         如果传入并且为空，则相当于生命周期的DidMount；
         如果有值则当里面的值变化时会再执行callback，相当于update生命周期
    */
    useLayoutEffect(() => {
        Rest.get(UrlService.user.list)
            .then(result => {
                if (result.message) {
                    Notiflix.Notify.failure(result.message)
                } else {
                    setUsers(result.data)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    const deleteUser = (id: number) => {
        Notiflix.Notify.failure(id.toString())
    }

    let userContext
    if (users) {
        userContext = users.map((user: user) => (
            <tr key={user.id} id={user.username}>
                <td>
                    <Link to={'/user/' + user.id}>
                        <strong>{user.username}</strong>
                    </Link>
                </td>
                <td>{user.roles}</td>
                <td className="is-right">
                    <button className="button is-small is-danger" onClick={() => deleteUser(user.id)}>删除</button>
                </td>
            </tr>
        ))
    }

    return (
        <div className="content">
            <table className="table is-fullwidth is-narrow">
                <thead>
                    <tr>
                        <th><abbr title="Username">用户名称</abbr></th>
                        <th><abbr title="Roles">权限</abbr></th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th><abbr title="Username">用户名称</abbr></th>
                        <th><abbr title="Roles">权限</abbr></th>
                        <th>操作</th>
                    </tr>
                </tfoot>
                <tbody>
                    {userContext}
                </tbody>
            </table>
        </div>
    );
}