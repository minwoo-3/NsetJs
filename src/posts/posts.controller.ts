import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */
interface PostModel {
  id: number,
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts : PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 100000000,
    commentCount: 9999999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 혜린',
    content: '노래 연습 하고 있는 헤린',
    likeCount: 100000000,
    commentCount: 9999999,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '뉴진스 혜린',
    content: '노래 연습 하고 있는 헤린',
    likeCount: 100000000,
    commentCount: 9999999,
  }
]

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getPosts(){
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') id: string){
    const post =  posts.find((post) => post.id === +id);

    if(!post){
      throw new NotFoundException();
    }
    return post;
  }

  @Post()
  postPosts(
    @Body('author') author:string,
    @Body('title') title:string,
    @Body('content') content:string,
  ){
    const post = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [
      ...posts,
      post,
    ];

    return post;
  }
  
  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ){
    const post = posts.find(post => post.id === +id);

    if(!post){
      throw new NotFoundException();
    }

    if(author){
      post.author = author;
    }

    if(title){
      post.title = title;
    }

    if(content){
      post.content = content;
    }

    posts = posts.map(prevPost => prevPost.id === +id ? post : prevPost);

    return post;
  }

  @Delete(':id')
  deletePost(
    @Param('id') id: string,
  ){
    const post = posts.find((post) => post.id === +id)

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter(post => post.id !== +id);

    return id;
  }
}
