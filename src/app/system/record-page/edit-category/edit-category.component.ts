import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../shared/models/categiry.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { NgForm } from '@angular/forms';
import set = Reflect.set;

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() onEditCategory = new EventEmitter<Category>();

  message = '';
  currentCategoryId = 1;
  category: Category;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.setCurrentCategory();
  }

  setCurrentCategory() {
    this.category = this.categories.find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    const category = Object.assign({}, form.value, {
      id: this.currentCategoryId
    });
    this.categoriesService.editCategory(category)
      .subscribe((category: Category) => {
        this.onEditCategory.emit(category);
        this.message = 'Категория успешно отредактирована.';
        setTimeout(() => this.message = '', 3000);
      });
  }

}
