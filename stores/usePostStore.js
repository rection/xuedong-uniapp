import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
  state: () => ({
    categories: [
      { id: 1, name: '校园闲聊', icon: '💬' },
      { id: 2, name: '学习资料', icon: '📚' },
      { id: 3, name: '失物招领', icon: '🔍' },
      { id: 4, name: '运动打卡', icon: '🏃' }
    ],
    posts: [
      {
        id: 101,
        title: '河南开封科技传媒学院',
        content: '河南省开封市龙亭区金明大道',
        author: '河开科传',
        avatar: '', // 确保路径有效或删掉用默认
        images: ['/static/images/hnkc.jpg'], // 示例：['/static/demo.jpg']
        categoryId: 1,
        categoryName: '校园闲聊',
        likeCount: 12,
        isLiked: false, // [新增] 记录当前用户是否点赞
        commentCount: 2,
        createTime: '10分钟前',
        // [新增] 评论数据结构
        comments: [
          { id: 1, author: '路人甲', content: 'wow,我想报考！', time: '5分钟前' },
        ]
      }
    ]
  }),
  getters: {
    // 根据ID获取帖子的辅助函数
    getPostById: (state) => (id) => {
      return state.posts.find(p => p.id == id);
    }
  },
  actions: {
    addPost(newPost) {
      const post = {
        id: Date.now(),
        author: '我',
        avatar: '', // 默认头像
        likeCount: 0,
        isLiked: false,
        commentCount: 0,
        createTime: '刚刚',
        comments: [], // 新帖子评论为空
        ...newPost
      };
      this.posts.unshift(post);
      return true;
    },

    // [新增] 点赞/取消点赞逻辑
    toggleLike(postId) {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        if (post.isLiked) {
          post.likeCount--; // 取消赞
          post.isLiked = false;
        } else {
          post.likeCount++; // 点赞
          post.isLiked = true;
        }
      }
    },

    // [新增] 发表评论逻辑
    addComment(postId, content) {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        const newComment = {
          id: Date.now(),
          author: '我', // 模拟当前用户
          content: content,
          time: '刚刚'
        };
        post.comments.push(newComment);
        post.commentCount++;
      }
    }
  }
});