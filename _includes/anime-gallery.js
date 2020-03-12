
{% include two.min.js %} //https://two.js.org/

{% include anime.min.js %} //https://github.com/juliangarnier/anime

var domain_name = "https://{{ site.url }}/";
 
//the dom element we attach things to
var container; 
 
//This will be the whole json structure
var GalleryObject = {% include gallery.json %};


const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


//https://stackoverflow.com/questions/15999760/load-image-asynchronous
function asyncImageLoader(url){
    return new Promise( (resolve, reject) => {
        var image = new Image();
        image.src = domain_name.concat(url);
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('could not load image'));
    });
}    

 // https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags/1732454#1732454
 // https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case
 // https://gist.github.com/mattwiebe/1005915
 String.prototype.unCamelCase = function(){
	return this
		// insert a space between lower & upper
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		// space before last upper in a sequence followed by lower
		.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
		// uppercase the first character
		.replace(/^./, function(str){ return str.toUpperCase(); })
}

function CreateDiv(parent,someclass)
{
	var div = document.createElement("div");
	div.className = someclass;
	//div.style.width = "100px";
	//div.style.height = "100px";
	//div.style.background = "red";
	//div.style.color = "white";
	//div.innerHTML = "Hello";
	parent.appendChild(div);
	return div;
}

function CreateLink(parent,Text,Reference, on_click_callback)
{
	var NewElement = document.createElement('a');
	parent.appendChild(NewElement);
	var div_textblock = CreateDiv(NewElement, "img-textblock");
	NewElement.appendChild(div_textblock);
	var linkText = document.createTextNode(Text);
	div_textblock.appendChild(linkText);
	NewElement.href =  Reference; //?or? on_click_callback() 
	
	//NewElement.title = Text; 		//does Href have a .<blank>?
	//NewElement.Color = "CC00CC";	//does Href have a .<blank>?
	//NewElement.className = "";	//does Href have a .<blank>?

	return NewElement;
}

function CreateImgDiv(parent,image,Text,Reference, on_click_callback)
{
	var div = CreateDiv(parent,"Container-Div");

		var div_container = CreateDiv(div, "img-container");

			var new_element = CreateLink(div_container, Text , Reference, on_click_callback);
				new_element.appendChild(image);
				new_element.onclick = on_click_callback();
				image.className = "thumbnail-image";

	return div;
}


function ForEachImageOnce(image,index)
{
	//image.ResizedFilePath = domain_name.concat(image.ResizedFilePath); 	
	//image.ThumbnailFilePath = domain_name.concat(image.ThumbnailFilePath);
  	//image.ImageWidth
	//image.ImageHeight
	//image.ResizedFilePath  	//"gallery\\Amsterdam\\resized-IMG_0499.jpg",
  	//image.ThumbnailFilePath  	// "gallery\\Thumbnails\\thumbnail-Amsterdam-IMG_0499.jpg"	
	//image.Name
 	//image.Folder
	//image.OriginalFilePath 		// "gallery\\Amsterdam\\IMG_0499.jpg",

	var resized = asyncImageLoader(image.ThumbnailFilePath);
	resized.then( res => {

	});

	var thumbnail = asyncImageLoader(image.ThumbnailFilePath);
	thumbnail.then( res => {
		 
	})

}

function ForEachGalleryOnce(gallery, index)
{
	if(gallery.GalleryThumbnail != null )
	{
		//setup the image to load async

		var resized = asyncImageLoader( gallery.GalleryThumbnail );

		//after it loads async, append it 
		resized.then( res => {

			var rootElement = CreateImgDiv(container, res, gallery.GalleryName.replace("//","").unCamelCase() , domain_name.concat(gallery.GalleryIndexHTMLFile), 
			function(){
				
				//container.innerHTML = '';

				//sleep(500).then(() => {
				//	GalleryObject.PhotoGalleries.forEach(ForEachGalleryOnce);
				//})

			} );
			//var rootElement = CreateDiv(container, "DynamicClass");
			//var LinkElement = CreateLink(rootElement, gallery.GalleryName.replace("//",""), domain_name.concat(gallery.GalleryIndexHTMLFile));
			//var element = LinkElement.appendChild(res);

			// https://animejs.com/documentation/#gridStaggering
			anime({
				targets: rootElement,
				duration: 4000,
				keyframes: [
					{translateY: -40},
					{translateX: 250},
					{translateY: 40},
					{translateX: 0},
					{translateY: 0}
				],
				easing: 'easeInOutExpo',
				loop: false,
			});
		});

	}

	if(gallery.PhotoGalleries != null)//array of above
	{
		gallery.PhotoGalleries.forEach(ForEachGalleryOnce);
	}
	if(gallery.Images != null)
	{
		//gallery.Images.forEach(ForEachImageOnce);		
	}
	
	//gallery.GalleryThumbnail
	//gallery.GalleryName //gallery
	//gallery.FullDirectoryPath // "/gallery/"
	//gallery.GalleryIndexHTMLFile ///gallery/Index.html
	//gallery.GalleryIndexMarkdownFile ///gallery/Index.md
}


function SetupAnimeGallery(string_gallery)
{
	container = document.getElementById(string_gallery);
	
	GalleryObject.PhotoGalleries.forEach(ForEachGalleryOnce);
}
