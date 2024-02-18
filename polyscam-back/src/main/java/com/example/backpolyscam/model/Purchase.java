package com.example.backpolyscam.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Purchase {
    @Id
    @SequenceGenerator(name = "purchase_id_sequence", sequenceName = "purchase_id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "purchase_id_sequence")
    @Column(name="id", nullable = false, updatable = false)
    private long id;
    private long cost;
    private Date dateOrder;
    private String state;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getCost() {
        return cost;
    }

    public void setCost(long cost) {
        this.cost = cost;
    }

    public Date getDateOrder() {
        return dateOrder;
    }

    public void setDateOrder(Date dateOrder) {
        this.dateOrder = dateOrder;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

    @ManyToOne
    @JoinColumn(name = "announce_id")
    private Announce announce;

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Announce getAnnounce() {
        return announce;
    }

    public void setAnnounce(Announce announce) {
        this.announce = announce;
    }
}
