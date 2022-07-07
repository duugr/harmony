import Notiflix from "notiflix";
import React from "react";
import { useState } from "react";
import { Rest } from "../../services/Rest.Services";
import { UrlService } from "../../services/Url.Services";
import { TagInterface, OptionInterface } from "../../services/types"
import { Input, TagContext, FromSelect, TextEditor } from "../../components/from/Index";

export function ArticleCreate() {
	const [tags, setTags] = useState<TagInterface[]>([])
	const [content, setContent] = useState("")

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// 创建UUID数组
		let tagUuids = tags.map(item => item.uuid)
		// 去除重复
		tagUuids = tagUuids.filter((v, i, o) => o.indexOf(v) === i)

		Rest.post(UrlService.article.create, {
			"chapter": Math.abs(event.currentTarget.chapter.value),
			"title": event.currentTarget.articleTitle.value,
			"publisher": event.currentTarget.publisher.value,
			"content": content,
			"language": event.currentTarget.language.value,
			"state": event.currentTarget.state.value,
			"tagUuids": tagUuids,
		}).then(result => {
			if (result.message) {
				Notiflix.Notify.failure(result.message)
			} else {
				Notiflix.Notify.success('添加成功')
			}
		});

	}

	let languages: OptionInterface[] = [
		{ value: "zh_cn", name: '中文', checked: false },
		{ value: "en_us", name: '英文', checked: false },
	]
	let states: OptionInterface[] = [
		{ value: "submited", name: '提交', checked: false },
		{ value: "published", name: '发布', checked: false },
		{ value: "deleted", name: '删除', checked: false },
	]

	return (
		<form onSubmit={event => handleSubmit(event)} method='post'>
			<div className="columns">
				<div className="column is-8">
					<Input label="标题"
						id="articleTitle"
						type="text"
						value=""
						placeholder="标题"
						is=""
						iconLeft=""
						iconRight="fa-check"
						help="" />
					<TextEditor label="内容"
						placeholder="内容"
						id="content"
						value=""
						is=""
						iconLeft=""
						iconRight="fa-check"
						help=""
						setParentContent={setContent} />

				</div>
				<div className="column">
					<Input
						label="章节"
						id="chapter"
						type="number"
						value=""
						placeholder="1"
						is=""
						iconLeft=""
						iconRight="fa-check"
						help=""
					/>
					<Input label="发布者"
						id="publisher"
						type="text"
						value=""
						placeholder="发布者"
						is=""
						iconLeft=""
						iconRight="fa-check"
						help="" />
					<FromSelect label="语言" id="language"
						multiple=""
						selected=""
						selectList={languages}
						is=""
						iconLeft="fa-globe"
						iconRight=""
						help=""
					/>
					<FromSelect label="状态" id="state"
						multiple=""
						selected=""
						selectList={states}
						is=""
						iconLeft="fa-smoking"
						iconRight=""
						help=""
					/>
					<TagContext setParentTags={setTags} />
					<div className="field is-grouped">
						<div className="control">
							<button type="submit" className="button is-primary">Submit</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}