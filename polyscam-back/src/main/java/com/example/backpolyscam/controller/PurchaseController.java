package com.example.backpolyscam.controller;

import com.example.backpolyscam.model.Announce;
import com.example.backpolyscam.model.Person;
import com.example.backpolyscam.model.Purchase;
import com.example.backpolyscam.repository.AnnounceRepo;
import com.example.backpolyscam.repository.PersonRepo;
import com.example.backpolyscam.repository.PurchaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.Subject;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/purchases")
public class PurchaseController {

    private PurchaseRepo purchaseRepo;
    private AnnounceRepo announceRepo;
    private PersonRepo personRepo;

    @Autowired
    public PurchaseController(PurchaseRepo purchaseRepo, AnnounceRepo announceRepo, PersonRepo personRepo) {
        this.purchaseRepo = purchaseRepo;
        this.announceRepo = announceRepo;
        this.personRepo = personRepo;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Purchase> findAllPurchases() {
        return purchaseRepo.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Purchase> getPurchase(@PathVariable("id") long id) {
        Purchase purchase = purchaseRepo.findById(id);
        if (purchase == null) {
            System.out.println("Purchase not found!");
            return new ResponseEntity<Purchase>(purchase, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Purchase>(purchase, HttpStatus.FOUND);
    }

    @RequestMapping(method = RequestMethod.POST)

    public ResponseEntity<Purchase> addPurchase(@RequestBody Purchase purchase) {

        purchaseRepo.save(purchase);
        return new ResponseEntity<Purchase>(purchase, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Purchase> deletePurchase(@PathVariable("id") long id) {
        Purchase purchase = purchaseRepo.findById(id);
        if (purchase == null) {
            System.out.println("Purchase not found!");
            return new ResponseEntity<Purchase>(HttpStatus.NOT_FOUND);
        }
        purchaseRepo.deleteById(id);
        return new ResponseEntity<Purchase>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Purchase> deletePurchases() {
        purchaseRepo.deleteAll();
        return new ResponseEntity<Purchase>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Purchase> updateAllPurchases(@RequestBody List<Purchase> updates) {
        purchaseRepo.deleteAll();
        for(Purchase s : updates){
            purchaseRepo.save(s);
        }
        return new ResponseEntity<Purchase>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.PATCH)

    public ResponseEntity<Purchase> updatePartOfPurchase(@RequestBody Map<String, Object> updates, @PathVariable("id") long id) {
        Purchase purchase = purchaseRepo.findById(id);
        if (purchase == null) {
            System.out.println("Purchase not found!");
            return new ResponseEntity<Purchase>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(purchase,updates);
        return new ResponseEntity<Purchase>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(Purchase purchase, Map<String, Object> updates) {
        if (updates.containsKey("cost")) {
            purchase.setCost((int) updates.get("cost"));
        }
        if (updates.containsKey("date")) {
            purchase.setDateOrder((Date) updates.get("date"));
        }
        if (updates.containsKey("state")) {
            purchase.setState((String) updates.get("state"));
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
                        purchase.setPerson(person);
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
        if (updates.containsKey("announce")) {
            Object announceObj = updates.get("announce");
            if (announceObj instanceof Map) {
                Map<String, Object> announceUpdates = (Map<String, Object>) announceObj;
                if (announceUpdates.containsKey("id")) {
                    Long announceId = ((Integer) announceUpdates.get("id")).longValue();
                    if (announceId <= 0) {
                        System.out.println("Invalid announce id!");
                        return;
                    }
                    Optional<Announce> optionalAnnounce = announceRepo.findById(announceId);
                    if (optionalAnnounce.isPresent()) {
                        Announce announce = optionalAnnounce.get();
                        purchase.setAnnounce(announce);
                    } else {
                        System.out.println("Announce not found!");
                        return;
                    }
                } else {
                    System.out.println("Announce ID not found!");
                    return;
                }
            } else {
                System.out.println("Invalid announce data!");
                return;
            }
        }

        purchaseRepo.save(purchase);
    }
}