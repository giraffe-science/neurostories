import InfiniteScroll from 'react-infinite-scroller';
import {useState} from "react"

function article(post, count, columnCount = 3) {
	console.log(post);
	return <article id={post.id}
									key={post.id}
									className="col-12 col-sm-12 col-md-6 col-lg-4"
									style={{}}>
		<div className="">
			<a href={post.link} rel="bookmark" title={post.title.rendered}>
				<img src={post.jetpack_featured_media_url} className="attachment-neve-blog size-neve-blog wp-post-image"/>
			</a>
		</div>
		<h2 className="blog-entry-title entry-title">
			<a href={post.link} rel="bookmark" title={post.title.rendered}
				 dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
		</h2>
		<div className="excerpt-wrap entry-summary" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
	</article>;
}

/**
 * html and css was copied from the search results:
 * https://www.neurostories.org/category/country/usa/
 */
export function InfinitePosts() {
	const postsCollection = new wp.api.collections.Posts();
	const [posts, setPosts] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	function more(page) {
		postsCollection.fetch({data: {per_page: 10, page}})
			.then(data => {
				if (data.length === 0) {
					setHasMore(false);
				} else {
					setPosts([...posts, ...data])
				}
			})
			.catch(err => {
				setHasMore(false);
				console.error(err);
			});
	}

	return 		<InfiniteScroll
		pageStart={0}
		loadMore={more}
		hasMore={hasMore}
		loader={<div className="loader" key={0}>Loading ...</div>}
	>
		<div className="row">
			{posts.map((post, i) => article(post, i))}
		</div>
	</InfiniteScroll>

}
