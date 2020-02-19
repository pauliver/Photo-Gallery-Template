
# Gallery

{% for gallery in site.data.galleryjson.PhotoGalleries %}

## [{{gallery.GalleryName}}]({{gallery.FullDirectoryPath}})

{% for images in gallery.Images %}
  
![{{images.ThumbnailName}}]({{images.ThumbnailFilePath}})
  
{% endfor %}
  
{% for subGalleries in gallery.PhotoGalleries %}
  
### [{{subGalleries.GalleryName}}]({{subGalleries.FullDirectoryPath}})
  
{% for subimages in subGalleries.Images %}
  
![{{subimages.ThumbnailName}}]({{subimages.ThumbnailFilePath}})
 
{% endfor %}
       
{% for ThreesubGalleries in subGalleries.PhotoGalleries %}
       
#### [{{ThreesubGalleries.GalleryName}}]({{ThreesubGalleries.FullDirectoryPath}})
       
{% for Threesubimages in ThreesubGalleries.Images %}

![{{Threesubimages.ThumbnailName}}]({{Threesubimages.ThumbnailFilePath}})

{% endfor %}

{% endfor %}

{% endfor %}
   
{% endfor %}
