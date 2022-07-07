import Notiflix from "notiflix";
import React from "react";
import { useParams } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { UrlService } from "../../services/Url.Services";

export function ChapterCreate() {
    let { bookUuid } = useParams()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Notiflix.Loading.dots('Loading')
        Rest.post(UrlService.chapter.create, {
            "bookUuid": bookUuid,
            "title": event.currentTarget.chapterTitle.value,
            "publisher": event.currentTarget.publisher.value,
            "content": event.currentTarget.content.value,
        }).then(result => {
            if (result.message)
                alert(result.message)
            // Notiflix.Loading.remove()
            Notiflix.Notify.success('章节添加成功')
        });

    }

    return (
        <form onSubmit={event => handleSubmit(event)} method='post'>
            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input className="input" type="text" id="chapterTitle" placeholder="Text input" />
                </div>
            </div>

            <div className="field">
                <label className="label">Publisher</label>
                <div className="control">
                    <input className="input" type="text" id={"publisher"} placeholder="Text input" />
                </div>
            </div>

            <div className="field">
                <label className="label">Content</label>
                <div className="control">
                    <textarea className="textarea" id={"content"} placeholder="Normal textarea"></textarea>
                </div>
            </div>


            <div className="buttons has-addons">
                <button type="submit" className="button is-primary">Submit</button>
            </div>
        </form>
    );
}