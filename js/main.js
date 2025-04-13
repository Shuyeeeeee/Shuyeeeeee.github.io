// 加载文章列表
async function loadPosts() {
    try {
        // 修复路径问题
        const isPostPage = window.location.pathname.includes('/posts/');
        const jsonPath = isPostPage ? '../index.json' : 'posts/index.json';
        
        const response = await fetch(jsonPath);
        const posts = await response.json();
        const postsContainer = document.querySelector('.posts');
        
        if (!postsContainer) return;
        
        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'post';
            article.innerHTML = `
                <h2 class="post-title">
                    <a href="posts/${post.filename}">${post.title}</a>
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
        const postsContainer = document.querySelector('.posts');
        if (postsContainer) {
            postsContainer.innerHTML = '<p>正在准备文章列表，请稍后刷新页面...</p>';
        }
    }
}

// 初始化Gitalk评论系统
function initGitalk() {
    const container = document.getElementById('gitalk-container');
    if (!container) return;

    const gitalk = new Gitalk({
        clientID: '2960886',
        clientSecret: 'a0c8db8c9c9b9c9c9c9c9c9c9c9c9c9c9c9c9c9c',
        repo: 'Shuyeeeeee.github.io',
        owner: 'Shuyeeeeee',
        admin: ['Shuyeeeeee'],
        id: location.pathname.substring(0, 50), // GitHub Issue 标题限制为50个字符
        distractionFreeMode: false,
        createIssueManually: false,
        language: 'zh-CN'
    });

    gitalk.render('gitalk-container');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    initGitalk();
}); 