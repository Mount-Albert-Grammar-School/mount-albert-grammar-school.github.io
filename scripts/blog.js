const URL_PARAMS = new URLSearchParams(window.location.search);
const MAX_PREVIEW_SIZE = 260;

function filterPosts() {
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
				
				posts[len - i + 1].appendChild(node);
			} else {
				posts[len - i + 1].innerHTML = ""
			}
		}
	} else {
		let posts = document.getElementById("posts").children;
		let len = posts.length - 2; // first two elements (0,1) don't count because they're the h1 and subtitle.
		
		for (let i = 0; i < len; i++) {
			// get data
			let section = posts[len - i + 1].getElementsByClassName("section")[0];
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

window.onload = function() {
	fetch('https://www.magsprogramming.tk/blog/blog0.txt')
		.then(response => response.text())
		.then((data) => {
			let splitPos = data.indexOf("\n");
			let posts = document.getElementById("posts");
			
			// Wrapper
			let centre = document.createElement("center");
			let section = document.createElement("div");
			section.className = "section";
			
			// title
			let titleNode = document.createElement("h2");
			titleNode.innerHTML = data.substring(0, splitPos);
			section.appendChild(titleNode);
			
			// body
			let bodyNode = document.createElement("p");
			bodyNode.innerHTML = data.substring(splitPos + 1);
			section.appendChild(bodyNode);
			
			// Finish Wrapper
			centre.appendChild(section);
			posts.appendChild(centre);
			
			// Filter Posts based on what they are viewing
			filterPosts();
		});
}
