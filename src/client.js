import { Component, render, useImperativeHandle } from '@wordpress/element';
import {InfinitePosts} from "./InfinitePosts";

window.addEventListener( 'DOMContentLoaded', ( event ) => {
	// Does only work on front-end as in backend they are generated dynamically (without wrapper).
	const wrappers = document.getElementsByClassName( "infinite-posts" );

	for (let wrapper of wrappers) {
		render( <InfinitePosts />, wrapper );
	}
} );
