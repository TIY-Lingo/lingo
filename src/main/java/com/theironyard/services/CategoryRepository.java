package com.theironyard.services;

import com.theironyard.entities.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
    Category findFirstByType(String categoryname);
    Category findByType(String type);
}
