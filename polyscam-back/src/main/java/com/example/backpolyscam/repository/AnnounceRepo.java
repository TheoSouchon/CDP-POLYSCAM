package com.example.backpolyscam.repository;

import com.example.backpolyscam.model.Announce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface AnnounceRepo extends JpaRepository<Announce,Long> {
    Announce findById(long id);
}
