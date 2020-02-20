{% include jquery.justified.js %}

// var JsonString = ` include gallery.json `;
// var Gallery =  JSON.parse( JsonString );

var GalleryObject = {% include gallery.json %};
var Iterator = GalleryObject;
var target_string_gallery = "none";



function ForEachGalleryOnce(item, index)
{
	if(item.PhotoGalleries != null)//array of above
	{
		item.PhotoGalleries.forEach(ForEachGalleryOnce);
	}
	
	var galleryname = '.image-container-'.concat(item.GalleryName);
	
	if(galleryname == target_string_gallery)
	{
		$( galleryname ).empty().justifiedImages({
		    images : item.Images,
		    rowHeight: 150,
		    maxRowHeight: 300,
		    thumbnailPath: function(photo, width, height){
			if(width < 512 && height < 512)
			{
				return photo.ThumbnailFilePath;
			}else{ //(width >=512 && height >= 512)
				return photo.ResizedFilePath;
			}
			return photo.ThumbnailFilePath;
		    },
		    getSize: function(photo){
			return {width: photo.ImageWidth, height: photo.ImageHeight};
		    },
		    margin: 1
		});
	}
	
	//item.GalleryName //gallery
	//item.FullDirectoryPath // "/gallery/"
	//item.GalleryIndexHTMLFile ///gallery/Index.html
	//item.GalleryIndexMarkdownFile ///gallery/Index.md
		
	//image.ImageWidth
	//image.ImageHeight
	//image.ResizedFilePath  		//"gallery\\Amsterdam\\resized-IMG_0499.jpg",
        //image.ThumbnailFilePath  	// "gallery\\Thumbnails\\thumbnail-Amsterdam-IMG_0499.jpg"	
	//image.Name
        //image.Folder
	//image.OriginalFilePath 		// "gallery\\Amsterdam\\IMG_0499.jpg",
}

function SetupGallery(string_gallery)
{
	if(string_gallery.endsWith("ImgContainer"))
	{
		target_string_gallery = string_gallery.replace("ImgContainer","").trim();
	}else{
		target_string_gallery = string_gallery;
	}
	Iterator.PhotoGalleries.forEach(ForEachGalleryOnce);
}
