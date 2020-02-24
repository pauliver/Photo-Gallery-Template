---
permalink: /index.html
title: index
page_variable: index
Gallery_Page: true
Gallery_Name: ALL
---

{% include header.md %}

# Index

{% for gallery in site.data.galleryjson.PhotoGalleries %}
{% if gallery.GalleryName != "Example-Hidden-Gallery" %}

## [{{gallery.GalleryName}}]({{gallery.FullDirectoryPath}})

<div class="image-container-{{gallery.GalleryName}} ImgContainer">
{% for images in gallery.Images %}

<!-- [![{{images.ThumbnailName}}]({{images.ThumbnailFilePath}})]({{gallery.FullDirectoryPath}}) -->
<a href="{{images.ResizedFilePath}}" data-fancybox="{{gallery.GalleryName}}" data-caption="{{gallery.GalleryName}} : {{images.Name}}">
	<img class="image-thumb" src="{{images.ThumbnailFilePath}}" alt="{{images.Name}}}" />
</a>

{% endfor %}
</div>

{% for subGalleries in gallery.PhotoGalleries %}
  
### [{{subGalleries.GalleryName}}]({{subGalleries.GalleryIndexHTMLFile}})

<div class="image-container-{{subGalleries.GalleryName}} ImgContainer">
{% for subimages in subGalleries.Images %}
  
<!--[![{{subimages.ThumbnailName}}]({{subimages.ThumbnailFilePath}})]({{subGalleries.GalleryIndexHTMLFile}}) -->
<a href="{{subimages.ResizedFilePath}}" data-fancybox="{{subGalleries.GalleryName}}" data-caption="{{subGalleries.GalleryName}} : {{subimages.Name}}">
	<img class="image-thumb" src="{{subimages.ThumbnailFilePath}}" alt="{{subimages.Name}}}" />
</a>

{% endfor %}
</div>

{% for ThreesubGalleries in subGalleries.PhotoGalleries %}
       
#### [{{ThreesubGalleries.GalleryName}}]({{ThreesubGalleries.GalleryIndexHTMLFile}})

<div class="image-container-{{ThreesubGalleries.GalleryName}} ImgContainer">       
{% for Threesubimages in ThreesubGalleries.Images %}

<!-- [![{{Threesubimages.ThumbnailName}}]({{Threesubimages.ThumbnailFilePath}})]({{ThreesubGalleries.GalleryIndexHTMLFile}}) -->
<a href="{{Threesubimages.ResizedFilePath}}" data-fancybox="{{ThreesubGalleries.GalleryName}}" data-caption="{{ThreesubGalleries.GalleryName}} : {{Threesubimages.Name}}">
	<img class="image-thumb" src="{{Threesubimages.ThumbnailFilePath}}" alt="{{Threesubimages.Name}}}" />
</a>

{% endfor %}
</div>

{% endfor %}

{% endfor %}

{% endif %}
{% endfor %}

<script>

{% include gallery.js %};

</script>

{% include footer.md %}

