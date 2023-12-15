package com.example.asciiArt;

import ascii_art.Shell;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import image.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;


@RestController
@CrossOrigin
public class Controller {
    //Change to your directory
    private static final String UPLOAD_DIRECTORY = "C:/Users/eyalh/Downloads/asciiArt/asciiArt";
    private Path path;

    /**
     * Handles file upload and returns the maximum resolution of the image.
     *
     * @param multipartFile The uploaded file
     * @return ResponseEntity<Integer> Returns the maximum resolution as ResponseEntity
     * @throws IOException If an I/O exception occurs during file processing
     */
    @PostMapping("/upload")
    public ResponseEntity<Integer> getMaxRes(@RequestParam("image") MultipartFile multipartFile) throws IOException {
        try {
            if (multipartFile.isEmpty()) {
                return ResponseEntity.badRequest().body(0);
            }
            String fileName = System.currentTimeMillis() + "-" + Objects.requireNonNull(multipartFile.getOriginalFilename());
            path = Paths.get(UPLOAD_DIRECTORY + File.separator + fileName);
            Files.copy(multipartFile.getInputStream(), path);
            Image img = Image.fromFile(path.toString());
            int maxRes = new Shell(img).getMaxCharsInRow();
            return ResponseEntity.status(HttpStatus.OK).body(maxRes);
        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }

    }

    /**
     * Retrieves ASCII image based on provided characters and resolution.
     *
     * @param chars The characters used for generating ASCII art
     * @param res The resolution for the ASCII image
     * @return ResponseEntity<Resource> Returns the ASCII image as ResponseEntity
     * @throws IOException If an I/O exception occurs during image processing
     */
    @GetMapping("/download/{chars}/{res}")
    public ResponseEntity<Resource> getAsciiImage(
            @PathVariable String chars,
            @PathVariable int res
    ) throws IOException {
        try {
            if (path == null) {
                return ResponseEntity.notFound().build();
            }
            Image img = Image.fromFile(path.toString());
            Shell shell = new Shell(img);
            String[] charsArr = chars.split(",");
            File htmlFile = shell.output(res, charsArr);
            byte[] htmlContent = Files.readAllBytes(htmlFile.toPath());
            ByteArrayResource resource = new ByteArrayResource(htmlContent);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_HTML);
            headers.setContentDispositionFormData("attachment", htmlFile.getName());
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


}
