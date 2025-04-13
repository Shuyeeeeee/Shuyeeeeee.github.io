// 加载文章列表
async function loadPosts() {
    try {
        const response = await fetch('/posts/index.json');
        const posts = await response.json();
        const postsContainer = document.querySelector('.posts');
        
        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'post';
            article.innerHTML = `
                <h2 class="post-title">
                    <a href="/posts/${post.filename}">${post.title}</a>
                </h2>
                <div class="post-meta">
                    ${post.date} · ${post.category}
                </div>
                <div class="post-content">
                    ${post.excerpt}
                </div>
            `;
            postsContainer.appendChild(article);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// 初始化Gitalk评论系统
function initGitalk() {
    const gitalk = new Gitalk({
        clientID: 'YOUR_GITHUB_CLIENT_ID',
        clientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
        repo: 'Shuyeeeeee.github.io',
        owner: 'Shuyeeeeee',
        admin: ['Shuyeeeeee'],
        id: location.pathname,
        distractionFreeMode: false
    });

    gitalk.render('gitalk-container');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    if (document.getElementById('gitalk-container')) {
        initGitalk();
    }
}); 