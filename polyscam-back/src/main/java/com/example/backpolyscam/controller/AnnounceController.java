package com.example.backpolyscam.controller;

import com.example.backpolyscam.model.Announce;
import com.example.backpolyscam.model.Person;
import com.example.backpolyscam.repository.AnnounceRepo;
import com.example.backpolyscam.repository.PersonRepo;
import com.example.backpolyscam.repository.PurchaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/announces")
public class AnnounceController {

    private AnnounceRepo announceRepo;
    private PersonRepo personRepo;
    private PurchaseRepo purchaseRepo;

    @Autowired
    public AnnounceController(AnnounceRepo announceRepo, PersonRepo personRepo, PurchaseRepo purchaseRepo) {

        this.announceRepo = announceRepo;
        this.personRepo = personRepo;
        this.purchaseRepo = purchaseRepo;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Announce> findAllAnnounces() {
        return announceRepo.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Announce> getAnnounce(@PathVariable("id") long id) {
        Announce announce = announceRepo.findById(id);
        if (announce == null) {
            System.out.println("Announce not found!");
            return new ResponseEntity<Announce>(announce, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Announce>(announce, HttpStatus.FOUND);
    }

    @RequestMapping(method = RequestMethod.POST)

    public ResponseEntity<Announce> addAnnounce(@RequestBody Announce announce) {

        announceRepo.save(announce);
        return new ResponseEntity<Announce>(announce, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Announce> deleteAnnounce(@PathVariable("id") long id) {
        Announce announce = announceRepo.findById(id);
        if (announce == null) {
            System.out.println("Announce not found!");
            return new ResponseEntity<Announce>(HttpStatus.NOT_FOUND);
        }
        purchaseRepo.deleteAll(announce.getPurchaseList());
        announceRepo.deleteById(id);
        return new ResponseEntity<Announce>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Announce> deleteAnnounces() {

        purchaseRepo.deleteAll();
        announceRepo.deleteAll();
        return new ResponseEntity<Announce>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Announce> updateAllAnnounces(@RequestBody List<Announce> updates) {
        announceRepo.deleteAll();
        for(Announce s : updates){
            announceRepo.save(s);
        }
        return new ResponseEntity<Announce>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<Announce> updatePartOfAnnounce(@RequestBody Map<String, Object> updates, @PathVariable("id") long id) {
        Announce announce = announceRepo.findById(id);
        if (announce == null) {
            System.out.println("Announce not found!");
            return new ResponseEntity<Announce>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(announce,updates);
        return new ResponseEntity<Announce>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(Announce announce, Map<String, Object> updates) {
        if (updates.containsKey("name")) {
            announce.setName((String) updates.get("name"));
        }
        if (updates.containsKey("price")) {
            announce.setPrice((int) updates.get("price"));
        }
        if (updates.containsKey("description")) {
            announce.setDescription((String) updates.get("description"));
        }
        if (updates.containsKey("person")) {
            Object personObj = updates.get("person");
            if (personObj instanceof Map) {
                Map<String, Object> personUpdates = (Map<String, Object>) personObj;
                if (personUpdates.containsKey("id")) {
                    Long personId = ((Integer) personUpdates.get("id")).longValue();
                    if (personId <= 0) {
                        System.out.println("Invalid person id!");
                        return;
                    }
                    Optional<Person> optionalPerson = personRepo.findById(personId);
                    if (optionalPerson.isPresent()) {
                        Person person = optionalPerson.get();
                        announce.setPerson(person);
                    } else {
                        System.out.println("Person not found!");
                        return;
                    }
                } else {
                    System.out.println("Person ID not found!");
                    return;
                }
            } else {
                System.out.println("Invalid person data!");
                return;
            }
        }

        announceRepo.save(announce);
    }
}