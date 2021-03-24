import { InMemoryDbService } from 'angular-in-memory-web-api';
import { PostCategory } from './post-categories/post-category';
import { PostCategoryData } from './post-categories/post-category-data';
import { Post } from './posts/post';
import { PostData } from './posts/post-data';

export class AppData implements InMemoryDbService {

  createDb(): { posts: Post[], postCategories: PostCategory[]} {
    const posts = PostData.Posts;
    const postCategories = PostCategoryData.PostCategories;
    return { posts, postCategories };
  }
}