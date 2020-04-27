package org.example.util.impl;

import org.example.type.ImageType;
import org.example.util.api.ImageUtils;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.Normalizer;
import java.util.regex.Pattern;

@Stateless
@LocalBean
public class ImageUtilsImpl implements ImageUtils {
    private static final int LAPTOP_IMAGE_WIDTH = 600;
    private static final int LAPTOP_IMAGE_HEIGHT = 600;
    private static final int LAPTOP_THUMBNAIL_WIDTH = 400;
    private static final int LAPTOP_THUMBNAIL_HEIGHT = 400;
    private static final int PROMOTION_WIDTH = 200;
    private static final int PROMOTION_HEIGHT = 200;

    private byte[] buildBinaryImage(BufferedImage image, int width, int height) throws IOException {
        Image tmp = image.getScaledInstance(width, height, Image.SCALE_SMOOTH);
        BufferedImage desImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = desImage.createGraphics();
        g2d.drawImage(tmp, 0, 0, null);
        g2d.dispose();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(desImage, "JPG", baos);
        return baos.toByteArray();
    }

    @Override
    public byte[] buildBinaryImage(BufferedImage image, ImageType type) throws IOException {
        int width = 0;
        int height = 0;
        switch (type) {
            case LAPTOP_IMAGE:
                width = LAPTOP_IMAGE_WIDTH;
                height = LAPTOP_IMAGE_HEIGHT;
                break;
            case LAPTOP_THUMBNAIL:
                width = LAPTOP_THUMBNAIL_WIDTH;
                height = LAPTOP_THUMBNAIL_HEIGHT;
                break;
            case PROMOTION_IMAGE:
                width = PROMOTION_WIDTH;
                height = PROMOTION_HEIGHT;
                break;
            default:
                return null;
        }
        return buildBinaryImage(image, width, height);
    }

    @Override
    public String buildSEOImageName(String name) {
        String temp = Normalizer.normalize(name, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("")
                .toLowerCase().replaceAll(" ", "-")
                .replaceAll("đ", "d");
    }
}