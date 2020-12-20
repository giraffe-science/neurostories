import InfiniteScroll from 'react-infinite-scroller';
import {useState} from "react"

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
			.catch(console.error);
	}

	return <InfiniteScroll
		pageStart={0}
		loadMore={more}
		hasMore={hasMore}
		loader={<div className="loader" key={0}>Loading ...</div>}
	>
		{posts.map(post => <div key={post.id}>
			<h1 dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
			<p dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
		</div>)}
	</InfiniteScroll>
}
