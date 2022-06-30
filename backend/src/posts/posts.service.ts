import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  )  {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = new Post()
    post.title = createPostDto.title
    post.description = createPostDto.description
    post.isPublished = createPostDto.isPublished
    post.content = createPostDto.content

    const postData = await post.save()
    return postData
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.findAll()
  }

  findOne(id: string) {
    return this.postModel.findOne({
      where: {
        id,
      }
    })
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await post.destroy();
  }
}
