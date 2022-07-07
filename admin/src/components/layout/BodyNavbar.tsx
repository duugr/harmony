import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import breadcrumbs from "../../services/Breadcrumbs.Services";
import { breadcrumb } from "../../services/types";

export default function BodyNavbar() {
    const [navs, setNavs] = useState({
        title: '',
        breads: []
    })

    const pathname = useLocation().pathname
    const { uuid } = useParams<"uuid">()

    useEffect(() => {
        breadcrumbs.forEach(function (bread, key) {
            key = key.replace('{uuid}', uuid)
            if (key === pathname) {
                let title = ''
                const breadLength = bread.length - 1
                bread.forEach(function (val: breadcrumb, index: number) {
                    if (typeof uuid === "string") {
                        val.link = val.link.replace('{uuid}', uuid)
                    }
                    title = val.title
                    val.active = breadLength === index
                })

                setNavs({
                    title: title,
                    breads: bread
                })
            }
        })

    }, [pathname, uuid])

    return (
        <nav className="level">
            <div className="level-left">
                <h2 className="is-size-3">{navs.title}</h2>
            </div>
            <div className="level-right">
                <nav className="breadcrumb has-succeeds-separator is-right" aria-label="breadcrumbs">
                    <ul>
                        {navs.breads.map((list: { active: any; link: string | undefined; title: any; }, index: number) => (
                            <li key={index + 1} className={list.active
                                ? 'is-active'
                                : ''
                            }>
                                <a href={list.link}>{list.title}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </nav>
    );
}
