import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/categiry.model';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  @Output() onAddCategory = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) {
  }

  onSubmit(form: NgForm) {
    const {name, capacity} = form.value;
    const category = new Category(name, capacity);

    this.categoriesService.addCategory(category)
      .subscribe((category: Category) => {
        this.onAddCategory.emit(category);
        form.reset();
        form.form.patchValue({capacity: 1});
      });
  }
}
