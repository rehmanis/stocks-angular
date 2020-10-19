import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { News } from 'src/app/models/News';

// @Component({
//   selector: 'ngbd-modal-content',
//   template: `
//     <div class="modal-header">
//       <h4 class="modal-title">{{Hi there!}}</h4>
//       <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body">
//       <p>Hello, {{ modalContent[0].title }}!</p>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
//     </div>
//     `
  
// })


// export class NgbdModalContent {

//   modalContent: News;

//   constructor(public activeModal: NgbActiveModal) {}

// }






@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css']
})

export class NewsModalComponent implements OnInit {

  @Input() companyNews: News[];
  @Input() currNews: News;

  constructor(private modalService: NgbModal) {}

  // open() {
  //   const modalRef = this.modalService.open(NgbdModalContent);
  //   modalRef.componentInstance.modalContent = this.companyNews;
  // }

  ngOnInit(): void {
  }

  open(news, content) {
    this.currNews = news;
    this.modalService.open(content);
  }

}
