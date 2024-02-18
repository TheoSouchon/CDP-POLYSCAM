package com.example.backpolyscam.repository;

import com.example.backpolyscam.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PurchaseRepo extends JpaRepository<Purchase,Long> {
    Purchase findById(long id);
}
