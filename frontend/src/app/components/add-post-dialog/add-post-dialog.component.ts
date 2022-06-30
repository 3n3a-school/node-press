import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/posts/post.service';

interface DialogData {
  title: string;
}

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.scss']
})
export class AddPostDialogComponent implements OnInit {

  addPostForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])

  })

  constructor(
    public dialogRef: MatDialogRef<AddPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private postService: PostService,
    private snackbar: MatSnackBar
    ) { }

    get title() { return this.addPostForm.get('title') }

    get description() { return this.addPostForm.get('description') }
  
    get content() { return this.addPostForm.get('content') }
  
  ngOnInit(): void {
  }

  createPost() {
    const post: Post = {
      title: this.addPostForm.value.title || "",
      description: this.addPostForm.value.description || "",
      content: this.addPostForm.value.content || ""
    }
    this.postService.createPost(post)
        .pipe(
        catchError(
          error => {
            console.error(error)
            window.alert(JSON.stringify(error))
            return of([])
          }
        )
        
      )
      .subscribe(
         (v) => {          
          this.snackbar.open(`Created post`, "Ok")
        }
      )
    this.dialogRef.close(true)
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
