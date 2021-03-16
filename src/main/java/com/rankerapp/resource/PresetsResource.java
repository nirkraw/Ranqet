package com.rankerapp.resource;

import com.rankerapp.core.PresetsManager;
import com.rankerapp.exceptions.BadRequestException;
import com.rankerapp.transport.model.FetchPresetsResponse;
import com.rankerapp.transport.model.Preset;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.UUID;

@RestController
public class PresetsResource {
    
    private final PresetsManager presetsManager;
    
    @Inject
    public PresetsResource(PresetsManager presetsManager) {
        this.presetsManager = presetsManager;
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users/{userId}/presets")
    public FetchPresetsResponse fetchPreset(@PathVariable(value = "userId") String userId,
                                            @RequestParam(value = "sessionToken") String sessionToken) {
        List<Preset> presets = presetsManager.getPresetsForUser(UUID.fromString(userId), sessionToken);
        return FetchPresetsResponse.builder()
                .withPresets(presets)
                .build();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/users/{userId}/preset/{presetId}")
    public void deletePreset(@PathVariable(value = "userId") String userId,
                             @PathVariable(value = "presetId") String presetId,
                             @RequestParam(value = "sessionToken") String sessionToken) {
        try {
            presetsManager.deletePreset(UUID.fromString(presetId), UUID.fromString(userId), sessionToken);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Malformatted presetId and/or userId");
        }
    }
    
}
