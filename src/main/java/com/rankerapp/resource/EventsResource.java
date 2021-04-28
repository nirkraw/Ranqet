package com.rankerapp.resource;

import com.rankerapp.db.EventsRepository;
import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.model.EventEntity;
import com.rankerapp.db.model.EventType;
import com.rankerapp.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.time.Instant;
import java.util.UUID;

@RestController
public class EventsResource {
    
    private final EventsRepository eventsRepository;
    
    private final ListsRepository listsRepository;
    
    @Inject
    public EventsResource(EventsRepository eventsRepository, ListsRepository listsRepository) {
        this.eventsRepository = eventsRepository;
        this.listsRepository = listsRepository;
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/events/list/{listId}/visited")
    public void markListAsVisited(@PathVariable(value = "listId") String listId) {
        if (!listsRepository.existsById(UUID.fromString(listId))) {
            throw new NotFoundException(String.format("List with id %s not found!", listId));
        }
    
        EventEntity event = new EventEntity();
        event.setId(UUID.randomUUID());
        event.setListId(UUID.fromString(listId));
        event.setType(EventType.LIST_VISITED);
        event.setOccurredOn(Instant.now());
        eventsRepository.save(event);
    }

}
