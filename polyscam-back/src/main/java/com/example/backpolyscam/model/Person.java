package com.example.backpolyscam.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Person {

    @Id
    @SequenceGenerator(name = "person_id_sequence", sequenceName = "person_id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_id_sequence")
    @Column(name="id", nullable = false, updatable = false)
    private long id;
    private String firstname;
    private String lastname;
    private String email;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonBackReference("announceBackReference")
    @OneToMany(mappedBy = "person", fetch = FetchType.EAGER)
    private List<Announce> announceList;

    @JsonBackReference("purchaseBackReference")
    @OneToMany(mappedBy = "person", fetch = FetchType.EAGER)
    private List<Purchase> purchaseList;

    public List<Announce> getAnnounceList() {
        return announceList;
    }

    public void setAnnounceList(List<Announce> announceList) {
        this.announceList = announceList;
    }

    public List<Purchase> getPurchaseList() {
        return purchaseList;
    }

    public void setPurchaseList(List<Purchase> purchaseList) {
        this.purchaseList = purchaseList;
    }
}



