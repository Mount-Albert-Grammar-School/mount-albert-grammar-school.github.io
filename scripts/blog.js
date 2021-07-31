const URL_PARAMS = new URLSearchParams(window.location.search);
const MAX_PREVIEW_SIZE = 260;

window.onload = function() {
	if (URL_PARAMS.has('post')) {
		let postId = URL_PARAMS.get('post');
		
		let posts = document.getElementById("posts").children;
		let len = posts.length - 2; // first two elements (0,1) don't count because they're the h1 and subtitle.
		
		for (let i = 0; i < len; i++) {
			if (i == postId) {
				let node = document.createElement("a");
				node.href = "blog.html";
			
				let innernode = document.createElement("strong");
				innernode.style = "color:#6f6f6f;"
				innernode.innerHTML = "Go Back"
				node.appendChild(innernode);
				
				posts[i+2].appendChild(node);
			} else {
				posts[i+2].innerHTML = ""
			}
		}
	} else {
		let posts = document.getElementById("posts").children;
		let len = posts.length - 2; // first two elements (0,1) don't count because they're the h1 and subtitle.
		
		for (let i = 0; i < len; i++) {
			// get data
			let section = posts[i+2].getElementsByClassName("section")[0];
			console.log(section);	

			// shorten paragraph if long
			let paratext = section.children[1].innerHTML;
			
			if (paratext.length > MAX_PREVIEW_SIZE) {
				section.children[1].innerHTML = paratext.substring(0, MAX_PREVIEW_SIZE).replaceAll("<br>", "") + "...";
			}
			
			let node = document.createElement("a");
			node.href = "?post=" + i;
			node.style = "text-align:right;" // todo fix this
			
			let innernode = document.createElement("strong");
			innernode.style = "color:#6f6f6f;"
			innernode.innerHTML = "Read More"
			node.appendChild(innernode);
			
			section.appendChild(node);
		}
	}
}
