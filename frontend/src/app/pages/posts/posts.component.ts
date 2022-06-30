import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AddPostDialogComponent } from 'src/app/components/add-post-dialog/add-post-dialog.component';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/posts/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postsList = new BehaviorSubject<Post[]>([])

  constructor(private postService: PostService, public dialog: MatDialog) { }

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

  openPost(id: any) {
    alert(`${id}`)
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

}
