package com.example.backpolyscam.repository;

import com.example.backpolyscam.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepo extends JpaRepository<Person,Long> {
    Person findById(long id);
}
