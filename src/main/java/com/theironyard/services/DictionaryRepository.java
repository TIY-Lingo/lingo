package com.theironyard.services;

import com.theironyard.entities.Dictionary;
import org.springframework.data.repository.CrudRepository;


public interface DictionaryRepository extends CrudRepository<Dictionary, Integer> {
}
