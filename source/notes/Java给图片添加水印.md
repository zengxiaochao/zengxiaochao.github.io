
```java
import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Iterator;
 
public class Test {
    public static void main(String[] args) throws IOException {
        // 读取图片
        Image image = ImageIO.read(new File("D:\\Desktop\\input.png"));
        // 利用BufferedImage，将图片加载到内存中
        int height = image.getHeight(null);
        int width = image.getWidth(null);
        BufferedImage bufimg = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
        // 获取图像对象，来对图片进行处理
        Graphics2D g = bufimg.createGraphics();
        // 设置RenderingHints(渲染提示)，以达到文字抗锯齿的功效,(key,value)形式赋值
        RenderingHints rh = new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        rh.put(RenderingHints.KEY_COLOR_RENDERING,RenderingHints.VALUE_COLOR_RENDER_QUALITY);
        rh.put(RenderingHints.KEY_TEXT_ANTIALIASING,RenderingHints.VALUE_TEXT_ANTIALIAS_LCD_HRGB);
        g.setRenderingHints(rh);
        // 开始处理图片
        g.drawImage(image,0,0,width,height,null);
        // 设置字体颜色
        Font font = new Font("楷体",Font.PLAIN,60);
        g.setFont(font);
        Color color = new Color(66,66,66);
        g.setColor(color);
        // 添加水印文字
        g.drawString("zengxiaochao666@163.com",width/2-25*9/2,height/2-25/2);
 
        // 为了保证原质量输出，我们用ImageWriter输出图片
        // 获取ImageWriter对象
        Iterator writers = ImageIO.getImageWritersByFormatName("jpg");
        ImageWriter writer = (ImageWriter)writers.next();
        // 指定输出路径
        File f = new File("D:\\Desktop\\outPut.png");
        ImageOutputStream ios = ImageIO.createImageOutputStream(f);
        // 修改ImageWriteParam，原质量输出图片
        ImageWriteParam imageWriteParam = writer.getDefaultWriteParam();
        imageWriteParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        imageWriteParam.setCompressionQuality(1);
        // 将BufferedImage转换为IIOImage,进而输出图片
        IIOImage iio_image = new IIOImage(bufimg, null, null);
        // 输出
        writer.setOutput(ios);
        writer.write(null,iio_image,imageWriteParam);
    }
}
```