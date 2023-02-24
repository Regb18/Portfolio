function fetchBlogData() {
    const baseURL = "https://csblog-production.up.railway.app/";

    fetch(`${baseURL}api/BlogPosts?num=4`)
        .then((response) => response.json()) // goes to basURL page and gets a response(string) and parses it into the array of objects as JSON
        .then(function (data) {              // data is our array of 4 objects we got in the line above
            displayBlogs(data, baseURL)
            // display the blogposts on the page
        })
        .catch((reason) => console.error(reason));
}

function displayBlogs(blogPosts, baseURL) {
    let template = document.getElementById("blog-template");
    let blogSection = document.getElementById('blogs');

    blogPosts.forEach(blogPost => {
        // true beause we want the elements inside the template
        const articleCard = document.importNode(template.content, true);

        // set blog image link
        let imageDiv = articleCard.querySelector('[data-blog="imageLink"]');
        imageDiv.href = `${baseURL}Content/${blogPost.slug}`;

        // create image element
        let blogImage = document.createElement('img');
        blogImage.classList.add('blog-image');
        blogImage.setAttribute('src', `data:${blogPost.imageType};base64,${blogPost.imageData}`);

        if (blogPost.imageData) {
            blogImage.setAttribute('src', `data:${blogPost.imageType};base64,${blogPost.imageData}`);
        } else {
            blogImage.setAttribute('src', `${baseURL}img/DefaultBlogImage.png`);
        }

        imageDiv.appendChild(blogImage);

        // set date on image
        let blogDate = articleCard.querySelector('[data-blog="day"]');
        let blogMonth = articleCard.querySelector('[data-blog="month"]');
        let createdDate = new Date(blogPost.created);

        blogDate.textContent = createdDate.getDate();
        blogMonth.textContent = createdDate.toLocaleString("default", { month: "long" });

        // set title
        let blogTitle = articleCard.querySelector('[data-blog="title"]');
        blogTitle.textContent = blogPost.title;

        // set abstract
        let blogAbstract = articleCard.querySelector('[data-blog="abstract"]');
        blogAbstract.textContent = blogPost.abstract;

        let buttonLink = articleCard.querySelector('[data-blog="buttonLink"]');
        buttonLink.href = `${baseURL}Content/${blogPost.slug}`;


        let updateText = articleCard.querySelector('[data-blog="updated"]');
        let today = new Date();
        let updated = new Date(blogPost.updated ? blogPost.updated : blogPost.created);
        // ^ same as blogPost.updated ?? blogPost.created, just different language

        let daysAgo = Math.ceil((Math.abs(today.getTime() - updated.getTime())) / (1000 * 60 * 60 * 24));

        updateText.textContent = (daysAgo == 1 ? "Updated one day ago" : `Updated ${daysAgo} days ago`);

        blogSection.appendChild(articleCard);
    })


}