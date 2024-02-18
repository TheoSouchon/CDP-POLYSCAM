package com.example.backpolyscam.controller;

import com.example.backpolyscam.model.Announce;
import com.example.backpolyscam.model.Person;
import com.example.backpolyscam.model.Purchase;
import com.example.backpolyscam.model.User;
import com.example.backpolyscam.repository.AnnounceRepo;
import com.example.backpolyscam.repository.PersonRepo;
import com.example.backpolyscam.repository.PurchaseRepo;
import com.example.backpolyscam.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@Transactional
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/persons")
public class PersonController {

    private PersonRepo personRepo;
    private AnnounceRepo announceRepo;
    private PurchaseRepo purchaseRepo;
    private UserRepository userRepo;

    @Autowired
    public PersonController(PersonRepo personRepo, AnnounceRepo announceRepo, PurchaseRepo purchaseRepo, UserRepository userRepo) {
        this.personRepo = personRepo;
        this.announceRepo = announceRepo;
        this.purchaseRepo = purchaseRepo;
        this.userRepo = userRepo;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Person> findAllPersons() {
        return personRepo.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Person> getPerson(@PathVariable("id") long id) {
        Person person = personRepo.findById(id);
        if (person == null) {
            System.out.println("Person not found!");
            return new ResponseEntity<Person>(person, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Person>(person, HttpStatus.FOUND);
    }

    @RequestMapping(method = RequestMethod.POST)

    public ResponseEntity<Person> addPerson(@RequestBody Person person) {

        personRepo.save(person);
        return new ResponseEntity<Person>(person, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Person> deletePerson(@PathVariable("id") long id) {

        Person person = personRepo.findById(id);
        if (person == null) {
            System.out.println("Person not found!");
            return new ResponseEntity<Person>(HttpStatus.NOT_FOUND);
        }
        List<Announce> announces = person.getAnnounceList();
        if (announces != null) {
            for (Announce announce : announces) {
                List<Purchase> purchases = announce.getPurchaseList();
                if (purchases != null) {
                    purchaseRepo.deleteAll(purchases);
                }
            }
        }
        purchaseRepo.deleteAll(person.getPurchaseList());
        announceRepo.deleteAll(person.getAnnounceList());
        personRepo.deleteById(id);
        Optional<User> userOptional = userRepo.findByUsername(person.getEmail());
        userOptional.ifPresent(user -> userRepo.delete(user));
        return new ResponseEntity<Person>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Person> deletePersons() {
        personRepo.deleteAll();
        return new ResponseEntity<Person>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Person> updateAllPersons(@RequestBody List<Person> updates) {
        personRepo.deleteAll();
        for(Person s : updates){
            personRepo.save(s);
        }
        return new ResponseEntity<Person>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<Person> updatePartOfPerson(@RequestBody Map<String, Object> updates, @PathVariable("id") long id) {
        Person person = personRepo.findById(id);
        if (person == null) {
            System.out.println("Person not found!");
            return new ResponseEntity<Person>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(person,updates);
        return new ResponseEntity<Person>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(Person person, Map<String, Object> updates) {
        if (updates.containsKey("firstname")) {
            person.setFirstname((String) updates.get("firstname"));
        }
        if (updates.containsKey("lastname")) {
            person.setLastname((String) updates.get("lastname"));
        }
        if (updates.containsKey("email")) {
            Optional<User> optionalUser = userRepo.findByUsername(person.getEmail());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setUsername((String) updates.get("email"));
                userRepo.save(user);
            }
            person.setEmail((String) updates.get("email"));
        }
        personRepo.save(person);
    }
}