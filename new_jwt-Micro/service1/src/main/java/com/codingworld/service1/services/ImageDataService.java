package com.codingworld.service1.services;

import com.codingworld.service1.model.ImageData;
import com.codingworld.service1.repo.ImageDataRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImageDataService {

    private final ImageDataRepository repo;

    public ImageDataService(ImageDataRepository repo) {
        this.repo = repo;
    }

    public ImageData saveImage(MultipartFile file, String description, boolean isBackground) throws IOException {
        if (isBackground) {
            // Reset existing background flag
            List<ImageData> all = repo.findAll();
            all.forEach(img -> img.setBackground(false));
            repo.saveAll(all);
        }

        ImageData imageData = new ImageData();
        imageData.setDescription(description);
        imageData.setImage(file.getBytes());
        imageData.setBackground(isBackground);
        return repo.save(imageData);
    }

    public Optional<ImageData> getImageById(Long id) {
        return repo.findById(id);
    }

    public List<ImageData> getAllImages() {
        return repo.findAll();
    }
    public Optional<ImageData> getBackgroundImage() {
        return repo.findAll().stream()
                .filter(ImageData::isBackground)
                .findFirst();
    }
    @Transactional
    public void setBackgroundImage(Long id) {
        List<ImageData> data=repo.findAll();

        for(ImageData da:data){
            if(da.getId().equals(id)){
                da.setBackground(true);
            }else{
                da.setBackground(false);
            }
        }
        repo.saveAll(data);
    }




}

