
{% include jquery.justified.js %}

// var JsonString = ` include gallery.json `;
// var Gallery =  JSON.parse( JsonString );

var GalleryObject = {% include gallery.json %};
var Iterator = GalleryObject;



function ForEachGallery(item, index)
{
	if(item.PhotoGalleries != null)//array of above
	{
		item.PhotoGalleries.forEach(ForEachGallery);
	}
	
	$( '.image-container-'.concat(item.GalleryName) ).empty().justifiedImages({
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

Iterator.PhotoGalleries.forEach(ForEachGallery);

