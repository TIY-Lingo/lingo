package services;

import entities.Article;
import org.springframework.data.repository.CrudRepository;

//comment
public interface ArticleRepository extends CrudRepository<Article, Integer>{
}
