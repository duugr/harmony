import React from "react";

export function Home() {
    return (
        <div>
            <nav className="level is-mobile">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Tweets</p>
                        <p className="title">3,456</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Following</p>
                        <p className="title">123</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Followers</p>
                        <p className="title">456K</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Likes</p>
                        <p className="title">789</p>
                    </div>
                </div>
            </nav>
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-primary">
                                <p className="title">Vertical...</p>
                                <p className="subtitle">Top tile</p>
                            </article>
                            <article className="tile is-child notification is-warning">
                                <p className="title">...tiles</p>
                                <p className="subtitle">Bottom tile</p>
                            </article>
                        </div>
                        <div className="tile is-parent">
                            <article className="tile is-child notification is-info">
                                <p className="title">Middle tile</p>
                                <p className="subtitle">With an image</p>
                            </article>
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-danger">
                            <nav className="level is-mobile">
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">Tweets</p>
                                        <p className="title">3,456</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">Following</p>
                                        <p className="title">123</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">Followers</p>
                                        <p className="title">456K</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">Likes</p>
                                        <p className="title">789</p>
                                    </div>
                                </div>
                            </nav>
                        </article>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-success">
                        <div className="content">
                            <p className="title">Tall tile</p>
                            <p className="subtitle">With even more content</p>
                            <div className="content">
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}