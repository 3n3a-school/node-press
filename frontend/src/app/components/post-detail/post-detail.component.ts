import { Component, OnInit, Inject } from '@angular/core';
import { Post } from 'src/app/models/post';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {sanitize} from 'dompurify'
import {marked} from 'marked'

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PostDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,) { }

  ngOnInit(): void {
    this.data.content = sanitize(
      marked.parse(this.data.content)
    )
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
