package com.rankerapp.core;

import com.rankerapp.db.PresetsRepository;
import com.rankerapp.db.model.PresetEntity;
import com.rankerapp.db.model.PresetOptionEntity;
import com.rankerapp.exceptions.ForbiddenException;
import com.rankerapp.exceptions.NotFoundException;
import com.rankerapp.transport.model.Preset;
import com.rankerapp.transport.model.PresetOption;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class PresetsManager {
    
    private final SessionTokenAuthenticator sessionTokenAuthenticator;
    
    private final PresetsRepository presetsRepo;
    
    @Inject
    public PresetsManager(SessionTokenAuthenticator sessionTokenAuthenticator, PresetsRepository presetsRepo) {
        this.sessionTokenAuthenticator = sessionTokenAuthenticator;
        this.presetsRepo = presetsRepo;
    }
    
    @Transactional
    public List<Preset> getPresetsForUser(UUID userId, String sessionToken) {
        sessionTokenAuthenticator.verifySessionToken(userId, sessionToken);
        
        return presetsRepo.findByCreatedBy(userId).stream()
                .map(PresetsManager::convertPreset)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public Preset createPreset(String title, UUID userId, List<PresetOption> presetOptions) {
        PresetEntity preset = new PresetEntity();
        preset.setId(UUID.randomUUID());
        preset.setCreatedBy(userId);
        preset.setCreatedOn(Instant.now());
        preset.setTitle(title);
        
        List<PresetOptionEntity> optionEntities = presetOptions.stream()
                .map((option) -> convertPresetOption(preset, option))
                .collect(Collectors.toList());
        
        preset.setPresetOptions(optionEntities);
    
        presetsRepo.save(preset);
        
        return convertPreset(preset);
    }
    
    @Transactional
    public void deletePreset(UUID presetId, UUID userId, String sessionToken) {
        sessionTokenAuthenticator.verifySessionToken(userId, sessionToken);
        
        PresetEntity preset =
                presetsRepo.findById(presetId).orElseThrow(() -> new NotFoundException("Preset with id " + presetId + " does not exist"));
        
        if (!preset.getCreatedBy().equals(userId)) {
            throw new ForbiddenException("Only the author of this preset can delete this preset");
        }
        
        presetsRepo.delete(preset);
    }
    
    private static Preset convertPreset(PresetEntity presetEntity) {
        List<PresetOption> options =
                presetEntity.getPresetOptions().stream().map(PresetsManager::convertPresetOption).collect(Collectors.toList());
        
        return Preset.builder()
                .withId(presetEntity.getId())
                .withCreatedBy(presetEntity.getCreatedBy())
                .withTitle(presetEntity.getTitle())
                .withPresetOptions(options)
                .build();
    }
    
    private static PresetOptionEntity convertPresetOption(PresetEntity parentPreset, PresetOption option) {
        PresetOptionEntity optionEntity = new PresetOptionEntity();
        optionEntity.setId(UUID.randomUUID());
        optionEntity.setName(option.getName());
        optionEntity.setPhotoUrl(option.getPhotoUrl());
        optionEntity.setPreset(parentPreset);
        return optionEntity;
    }
    
    private static PresetOption convertPresetOption(PresetOptionEntity option) {
        return PresetOption.builder()
                .withName(option.getName())
                .withPhotoUrl(option.getPhotoUrl())
                .build();
    }
}
