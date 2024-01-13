import { Docusnore } from "docusnore";
import { Post } from "../types/Post";
import {v4 as uuidv4} from "uuid";

export class PostService {
  private db: Docusnore;

  constructor(db: Docusnore) {
    this.db = db;
  }

  private async add(post: Post) {
    await this.db.add<Post>("posts", post);
  }

  public async getAllPosts() {
    return await this.db.get<Post>("posts");
  }

  public async createPost(title: string, content: string, author: string) {
    const post: Post = {
      title,
      content,
      author,
      id: uuidv4()
    }

    await this.add(post);
  }
}