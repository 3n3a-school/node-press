import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { AddPostDialogComponent } from 'src/app/components/add-post-dialog/add-post-dialog.component';
import { PostDetailComponent } from 'src/app/components/post-detail/post-detail.component';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/posts/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postsList = new BehaviorSubject<Post[]>([])

  constructor(private postService: PostService, public dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getNewPosts()
  }

  private getNewPosts() {
    this.postService.getPosts()
      .subscribe(
        (v) => {
          this.postsList.next(v)
        }
      )
  }

  async deletePost(id: any) {
    this.postService.deletePost(id)
      .subscribe(
        () => {
          this.snackbar.open("Deleted post", "Ok")
        }
      )
  }


  openAddPost() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '300px',
      data: {
        title: 'Add a new Post'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.getNewPosts()
    })
  }

  openPost(post: Post) {
    const dialogRef = this.dialog.open(PostDetailComponent, {
      width: '400px',
      data: post
    })
  }

}
