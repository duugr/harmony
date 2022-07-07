import Notiflix from "notiflix";
import React from "react";
import { Rest } from "../../services/Rest.Services";
import { UrlService } from "../../services/Url.Services";

export function BookCreate() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Notiflix.Loading.dots('Loading')
        Rest.post(UrlService.book.create, {
            "title": event.currentTarget.bookTitle.value,
            "author": event.currentTarget.author.value,
            "creationStartDate": event.currentTarget.creationTimeStart.value,
            "creationEndDate": event.currentTarget.creationTimeEnd.value,
            "publisher": event.currentTarget.publisher.value,
            "publishedDate": event.currentTarget.publishedDate.value,
            "description": event.currentTarget.description.value,
        }).then(result => {
            if (result.message) {
                Notiflix.Notify.failure(result.message)
            } else {
                Notiflix.Notify.success('书籍添加成功')
            }
        });

    }

    return (
        <form onSubmit={event => handleSubmit(event)} method='post'>
            <div className="field">
                <label className="label">Title</label>
                <div className="control is-expanded has-icons-left has-icons-right">
                    <input className="input" type="text" id="bookTitle" placeholder="Title" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-book"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Author</label>
                <div className="control is-expanded has-icons-left has-icons-right">
                    <input className="input" type="text" id={"author"} placeholder="Author" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <div className="field-label">
                    <label className="label">CreationTime</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded has-icons-left has-icons-right">
                            <input className="input" type="date" id={"creationTimeStart"} placeholder="start date" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-calendar"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control is-expanded has-icons-left has-icons-right">
                            <input className="input" type="date" id={"creationTimeEnd"} placeholder="end date" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-calendar"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="field">
                <label className="label">Publisher</label>
                <div className="control is-expanded has-icons-left has-icons-right">
                    <input className="input" type="text" id={"publisher"} placeholder="Publisher" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">PublishedDate</label>
                <div className="control is-expanded has-icons-left has-icons-right">
                    <input className="input" type="date" id={"publishedDate"} placeholder="Published date" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-calendar"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Description</label>
                <div className="control is-expanded has-icons-right">
                    <textarea className="textarea" id={"description"} placeholder="Normal textarea"></textarea>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
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